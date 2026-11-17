/*
 * The loom shell runtime: runs on every page.
 *
 * One rAF loop. React owns the DOM; this only writes inline styles, draws into
 * canvases and fills the (React-empty) selvedge band list.
 *
 *   [data-act="pin|pan|flow"]     act; publishes --p (0..1). pin/pan get a sticky stage.
 *   [data-cue="from to [in out]"] opacity + rise keyed to the parent act's p.
 *   [data-pan]                    rail translated across its overflow by p.
 *   [data-reveal="a b"]           clip-path wipe upward between p=a and p=b.
 *   [data-in]                     fade + rise once on entry (children staggered).
 *   [data-chapter]                a band of cloth in the selvedge, and a nav link.
 *   .loom-label__cloth            re-woven from the visitor's record.
 *   .loom-swatch__cloth           static weave draft (data-weave/weft/warp).
 */
import { actProgress, clamp, ease, sizeCanvas, weaveOf } from "./weave";

type Act = { el: HTMLElement; kind: string; p: number };

export function startShell(root: HTMLElement): () => void {
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const narrowMQ = matchMedia("(max-width: 860px)");
  let alive = true;

  /* ============================================================ ACTS == */
  let acts: Act[] = [];
  let cues: { el: HTMLElement; act: Act; v: number[] }[] = [];
  let pans: { el: HTMLElement; act: Act }[] = [];
  let reveals: { el: HTMLElement; act: Act; v: number[] }[] = [];

  const actOf = (el: HTMLElement) => {
    const host = el.closest<HTMLElement>("[data-act]");
    return acts.find((a) => a.el === host);
  };
  const nums = (s?: string) => (s || "").trim().split(/\s+/).map(Number);

  function collect() {
    acts = [...root.querySelectorAll<HTMLElement>("[data-act]")].map((el) => ({
      el,
      kind: el.dataset.act || "flow",
      p: 0,
    }));
    cues = [];
    root.querySelectorAll<HTMLElement>("[data-cue]").forEach((el) => {
      const act = actOf(el);
      if (act) cues.push({ el, act, v: nums(el.dataset.cue) });
    });
    pans = [];
    root.querySelectorAll<HTMLElement>("[data-pan]").forEach((el) => {
      const act = actOf(el);
      if (act) pans.push({ el, act });
    });
    reveals = [];
    root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      const act = actOf(el);
      if (act) reveals.push({ el, act, v: nums(el.dataset.reveal) });
    });
  }

  const cueOpacity = (p: number, v: number[]) => {
    const [a, b, ri, ro] = v;
    if (v.length === 1) return clamp((p - a) / 0.12);
    const w = b - a;
    const rin = ri ?? w * 0.3;
    const rout = ro ?? w * 0.3;
    const up = rin <= 0 ? (p >= a ? 1 : 0) : clamp((p - a) / rin);
    const down = rout <= 0 ? (p <= b ? 1 : 0) : clamp((b - p) / rout);
    return Math.min(up, down);
  };

  function updateActs() {
    const vh = innerHeight;
    for (const a of acts) {
      const r = a.el.getBoundingClientRect();
      a.p =
        a.kind === "flow"
          ? clamp((vh - r.top) / (r.height + vh))
          : clamp(-r.top / Math.max(1, r.height - vh));
      a.el.style.setProperty("--p", a.p.toFixed(4));
    }
    for (const c of cues) {
      const o = cueOpacity(c.act.p, c.v);
      c.el.style.opacity = o.toFixed(3);
      c.el.style.visibility = o < 0.01 ? "hidden" : "";
      if (!RM) c.el.style.transform = `translate3d(0, ${((1 - o) * 16).toFixed(1)}px, 0)`;
    }
    if (!RM) {
      for (const { el, act } of pans) {
        const travel = Math.max(0, el.scrollWidth - el.parentElement!.clientWidth);
        el.style.transform = `translate3d(${(-act.p * travel).toFixed(1)}px, 0, 0)`;
      }
      for (const { el, act, v } of reveals) {
        const t = ease((act.p - v[0]) / (v[1] - v[0]));
        el.style.clipPath = `inset(${((1 - t) * 100).toFixed(2)}% 0 0 0)`;
      }
    }
  }

  // [data-in]: once, on entry. Children stagger. Late-mounted blocks are picked up too.
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: "0px 0px -12% 0px" },
  );
  const watchIn = (scope: ParentNode) =>
    scope.querySelectorAll<HTMLElement>("[data-in]:not(.is-in)").forEach((el) => {
      [...el.children].forEach((c, i) => (c as HTMLElement).style.setProperty("--i", String(i)));
      io.observe(el);
    });

  /* ======================================================== SELVEDGE == */
  let chapters: HTMLElement[] = [];
  const selvCv = root.querySelector<HTMLCanvasElement>(".loom-selvedge__cloth");
  const bandsOl = root.querySelector<HTMLOListElement>(".loom-selvedge__bands");
  const PICK = 3;
  const ENDS = 6;
  let rows = 0;
  let beat = new Float32Array(0);
  let rowChapter = new Int16Array(0);
  let reach = -1;
  let fell = -1;
  let lastY = scrollY;

  function buildBands() {
    if (!bandsOl) return;
    bandsOl.replaceChildren(
      ...chapters.map((sec) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = `#${sec.id}`;
        a.setAttribute("aria-label", sec.dataset.chapter || "");
        const span = document.createElement("span");
        span.setAttribute("aria-hidden", "true");
        span.textContent = sec.dataset.chapter || "";
        a.appendChild(span);
        li.appendChild(a);
        return li;
      }),
    );
  }

  function layoutSelvedge() {
    if (!selvCv) return;
    const horizontal = narrowMQ.matches;
    const len = horizontal ? innerWidth : innerHeight;
    const newRows = Math.max(40, Math.floor(len / PICK));
    if (newRows !== rows) {
      const nb = new Float32Array(newRows).fill(-1);
      for (let r = 0; r < newRows && rows; r++) nb[r] = beat[Math.floor((r / newRows) * rows)];
      beat = nb;
      rows = newRows;
      reach = -1;
      for (let r = 0; r < rows; r++) if (beat[r] >= 0) reach = r;
    }
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const starts = chapters.map((s) => s.getBoundingClientRect().top + scrollY - innerHeight * 0.5);
    rowChapter = new Int16Array(rows);
    for (let r = 0; r < rows; r++) {
      const s = ((r + 0.5) / rows) * max;
      let c = 0;
      for (let k = 0; k < starts.length; k++) if (starts[k] <= s) c = k;
      rowChapter[r] = c;
    }
    const lis = bandsOl ? [...bandsOl.children] as HTMLElement[] : [];
    chapters.forEach((_, k) => {
      const li = lis[k];
      if (!li) return;
      const a = k === 0 ? 0 : clamp(starts[k] / max);
      const b = k + 1 < chapters.length ? clamp(starts[k + 1] / max) : 1;
      li.style.top = `${a * 100}%`;
      li.style.height = `${Math.max(0.8, (b - a) * 100)}%`;
    });
    drawSelvedge();
  }

  function weaveRows(frac: number, v: number) {
    const target = Math.min(rows - 1, Math.floor(frac * rows));
    // a slow hand packs the cloth; a flick leaves it open
    const b = RM ? 0.9 : clamp(1 - (v - 5) / 90, 0.45, 1);
    let changed = false;
    for (let r = reach + 1; r <= target; r++) {
      if (beat[r] < 0) {
        beat[r] = b;
        changed = true;
      }
    }
    if (target > reach) reach = target;
    return changed;
  }

  function drawCloth(
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    horizontal: boolean,
    ends: number,
    picks: number,
    shown: number,
    pickRow: (q: number) => number,
  ) {
    const across = horizontal ? h : w;
    const len = horizontal ? w : h;
    const endW = across / ends;
    const pk = len / picks;
    ctx.fillStyle = "#0D1526";
    ctx.fillRect(0, 0, w, h);
    for (let q = 0; q < picks; q++) {
      const r = pickRow(q);
      const b = r >= 0 && r < rows ? beat[r] : -1;
      const along = q * pk;
      const ch = b >= 0 ? chapters[rowChapter[r]] : undefined;
      if (q >= shown || b < 0 || !ch) {
        ctx.fillStyle = "#2A3756";
        for (let i = 0; i < ends; i++) {
          const o = i * endW + endW * 0.3;
          if (horizontal) ctx.fillRect(along, o, pk, endW * 0.4);
          else ctx.fillRect(o, along, endW * 0.4, pk);
        }
        continue;
      }
      const fn = weaveOf(ch.dataset.weave);
      const weft = ch.dataset.weft || "#2F6FE4";
      for (let i = 0; i < ends; i++) {
        const o = i * endW;
        if (fn(i, q)) {
          ctx.fillStyle = weft;
          const th = pk * b;
          const off = (pk - th) / 2;
          if (horizontal) ctx.fillRect(along + off, o, th, endW);
          else ctx.fillRect(o, along + off, endW, th);
        } else {
          ctx.fillStyle = "#33456E";
          const t = endW * 0.78;
          const oo = o + (endW - t) / 2;
          if (horizontal) ctx.fillRect(along, oo, pk, t);
          else ctx.fillRect(oo, along, t, pk);
        }
      }
    }
  }

  function drawSelvedge() {
    if (!selvCv) return;
    const { ctx, w, h } = sizeCanvas(selvCv);
    const horizontal = narrowMQ.matches;
    drawCloth(ctx, w, h, horizontal, ENDS, rows, rows, (q) => q);
    if (fell >= 0) {
      ctx.fillStyle = "#F5F7FA";
      if (horizontal) ctx.fillRect(fell * PICK, 0, 2, h);
      else ctx.fillRect(0, fell * PICK, w, 2);
    }
  }

  /* ========================================================= LABELS == */
  function drawLabel(cv: HTMLCanvasElement) {
    const host = cv.closest<HTMLElement>("[data-act]");
    const p = host ? actProgress(host) : 1;
    const { ctx, w, h } = sizeCanvas(cv);
    const horizontal = w > h * 1.6;
    const len = horizontal ? w : h;
    const across = horizontal ? h : w;
    const ends = Math.max(10, Math.round(across / 14));
    const picks = Math.max(30, Math.floor(len / 4));
    const shown = RM ? picks : Math.ceil(picks * clamp(0.42 + p * 1.2));
    drawCloth(ctx, w, h, horizontal, ends, picks, shown, (q) =>
      Math.min(rows - 1, Math.floor((q / picks) * rows)),
    );
  }

  /* ======================================================= SWATCHES == */
  function drawSwatches() {
    root.querySelectorAll<HTMLCanvasElement>(".loom-swatch__cloth").forEach((cv) => {
      const { ctx, w, h } = sizeCanvas(cv);
      const fn = weaveOf(cv.dataset.weave);
      const warp = cv.dataset.warp || "#0E1A33";
      const weft = cv.dataset.weft || "#2F6FE4";
      const cell = Number(cv.dataset.cell) || 6;
      ctx.fillStyle = warp;
      ctx.fillRect(0, 0, w, h);
      for (let r = 0; r * cell < h; r++) {
        for (let i = 0; i * cell < w; i++) {
          if (fn(i, r)) {
            ctx.fillStyle = weft;
            ctx.fillRect(i * cell, r * cell + 0.5, cell, cell - 1);
          } else {
            ctx.fillStyle = warp;
            ctx.fillRect(i * cell + 0.5, r * cell, cell - 1, cell);
          }
        }
      }
      const gr = ctx.createLinearGradient(0, 0, w, h);
      gr.addColorStop(0, "rgba(255,255,255,0.10)");
      gr.addColorStop(1, "rgba(0,0,0,0.14)");
      ctx.fillStyle = gr;
      ctx.fillRect(0, 0, w, h);
    });
  }

  /* =========================================================== LOOP == */
  const onScreen = (el: Element) => {
    const r = el.getBoundingClientRect();
    return r.bottom > -50 && r.top < innerHeight + 50;
  };
  let lastFell = -2;
  let needsSelv = true;
  let raf = 0;

  function frame() {
    if (!alive) return;
    updateActs();
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const y = scrollY;
    const v = Math.abs(y - lastY);
    lastY = y;
    const frac = clamp(y / max);
    if (weaveRows(frac, v)) needsSelv = true;
    fell = Math.min(rows - 1, Math.floor(frac * rows));
    if (fell !== lastFell) {
      lastFell = fell;
      needsSelv = true;
    }
    if (needsSelv) {
      drawSelvedge();
      needsSelv = false;
    }
    root.querySelectorAll<HTMLCanvasElement>(".loom-label__cloth").forEach((cv) => {
      if (onScreen(cv)) drawLabel(cv);
    });
    raf = requestAnimationFrame(frame);
  }

  function relayout() {
    chapters = [...root.querySelectorAll<HTMLElement>("[data-chapter]")];
    collect();
    buildBands();
    layoutSelvedge();
    drawSwatches();
    watchIn(root);
    needsSelv = true;
  }

  let rt = 0;
  const schedule = () => {
    clearTimeout(rt);
    rt = window.setTimeout(relayout, 120);
  };
  addEventListener("resize", schedule);
  // height changes as fonts and images settle; DOM changes when a page swaps content
  const ro = new ResizeObserver(schedule);
  ro.observe(document.body);
  const mo = new MutationObserver((records) => {
    if (records.some((r) => [...r.addedNodes].some((n) => n instanceof HTMLElement && (n.matches("[data-act],[data-in],[data-chapter]") || n.querySelector("[data-act],[data-in],[data-chapter]")))))
      schedule();
  });
  mo.observe(root, { childList: true, subtree: true });

  root.classList.add("is-live");
  relayout();
  raf = requestAnimationFrame(frame);

  return () => {
    alive = false;
    cancelAnimationFrame(raf);
    clearTimeout(rt);
    removeEventListener("resize", schedule);
    ro.disconnect();
    mo.disconnect();
    io.disconnect();
    root.classList.remove("is-live");
  };
}
