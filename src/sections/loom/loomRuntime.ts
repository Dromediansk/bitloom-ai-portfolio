/*
 * Bitloom home: the loom.
 *
 * One rAF loop drives the whole page. React owns the DOM; this runtime only
 * writes inline styles (transform, opacity, clip-path, custom properties) and
 * draws into canvases, so a locale switch re-renders text without fighting it.
 *
 *   [data-act="pin|pan|flow"]   act; publishes --p (0..1). pin/pan get a sticky stage.
 *   [data-cue="from to [in out]"] opacity + rise keyed to the parent act's p.
 *   [data-pan]                  rail translated across its overflow by p.
 *   [data-reveal="a b"]         clip-path wipe upward between p=a and p=b.
 *   [data-in]                   fade + rise once on entry (children staggered).
 *
 * Bespoke pieces:
 *   selvedge  a weave simulation grown by the visitor's scroll; it is the nav
 *   title     warp threads in front of / behind the headline, parting on scroll
 *   turn      loose bits pulled into warp, then woven, with the mark in the cloth
 *   swatches  static weave drafts per project
 *   label     the visitor's recorded cloth re-woven at the close
 */

type Weave = (i: number, r: number) => boolean;

const WEAVES: Record<string, Weave> = {
  plain: (i, r) => ((i + r) & 1) === 0,
  twill: (i, r) => (((i + r) % 4) + 4) % 4 < 2,
  basket: (i, r) => (((i >> 1) + (r >> 1)) & 1) === 0,
  herring: (i, r) => {
    const k = r % 12 < 6 ? i + r : i - r;
    return ((k % 4) + 4) % 4 < 2;
  },
  satin: (i, r) => (((i * 2 + r) % 5) + 5) % 5 === 0,
};

const clamp = (v: number, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
const ease = (t: number) => 1 - Math.pow(1 - clamp(t), 3);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const hash = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

type Act = { el: HTMLElement; kind: string; p: number };
type Cue = { el: HTMLElement; act: Act; v: number[] };

export function startLoom(root: HTMLElement): () => void {
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const FINE = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const narrowMQ = matchMedia("(max-width: 860px)");
  const DPR = Math.min(2, window.devicePixelRatio || 1);
  let alive = true;

  const sizeCanvas = (cv: HTMLCanvasElement) => {
    const r = cv.getBoundingClientRect();
    const w = Math.max(1, Math.round(r.width));
    const h = Math.max(1, Math.round(r.height));
    if (cv.width !== w * DPR || cv.height !== h * DPR) {
      cv.width = w * DPR;
      cv.height = h * DPR;
    }
    const ctx = cv.getContext("2d")!;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    return { ctx, w, h };
  };

  /* ============================================================ ACTS == */
  const acts: Act[] = [...root.querySelectorAll<HTMLElement>("[data-act]")].map(
    (el) => ({ el, kind: el.dataset.act || "flow", p: 0 }),
  );
  const actOf = (el: HTMLElement) => {
    const host = el.closest<HTMLElement>("[data-act]");
    return acts.find((a) => a.el === host)!;
  };
  const cues: Cue[] = [...root.querySelectorAll<HTMLElement>("[data-cue]")].map(
    (el) => ({ el, act: actOf(el), v: el.dataset.cue!.split(/\s+/).map(Number) }),
  );
  const pans = [...root.querySelectorAll<HTMLElement>("[data-pan]")].map((el) => ({
    el,
    act: actOf(el),
  }));
  const reveals = [...root.querySelectorAll<HTMLElement>("[data-reveal]")].map(
    (el) => ({ el, act: actOf(el), v: el.dataset.reveal!.split(/\s+/).map(Number) }),
  );

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
        const stage = el.parentElement!;
        const travel = Math.max(0, el.scrollWidth - stage.clientWidth);
        el.style.transform = `translate3d(${(-act.p * travel).toFixed(1)}px, 0, 0)`;
      }
      for (const { el, act, v } of reveals) {
        const t = ease((act.p - v[0]) / (v[1] - v[0]));
        el.style.clipPath = `inset(${((1 - t) * 100).toFixed(2)}% 0 0 0)`;
      }
    }
  }

  // [data-in]: once, on entry. Children stagger.
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
  root.querySelectorAll<HTMLElement>("[data-in]").forEach((el) => {
    [...el.children].forEach((c, i) => (c as HTMLElement).style.setProperty("--i", String(i)));
    io.observe(el);
  });

  /* ======================================================== SELVEDGE == */
  const chapters = [...root.querySelectorAll<HTMLElement>("[data-chapter]")];
  const selvCv = root.querySelector<HTMLCanvasElement>(".loom-selvedge__cloth")!;
  const bandLis = [...root.querySelectorAll<HTMLElement>(".loom-selvedge__bands li")];
  const PICK = 3;
  const ENDS = 6;
  let rows = 0;
  let beat = new Float32Array(0);
  let rowChapter = new Int16Array(0);
  let reach = -1;
  let fell = -1;
  let lastY = scrollY;

  function layoutSelvedge() {
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
    const starts = chapters.map(
      (s) => s.getBoundingClientRect().top + scrollY - innerHeight * 0.5,
    );
    rowChapter = new Int16Array(rows);
    for (let r = 0; r < rows; r++) {
      const s = ((r + 0.5) / rows) * max;
      let c = 0;
      for (let k = 0; k < starts.length; k++) if (starts[k] <= s) c = k;
      rowChapter[r] = c;
    }
    chapters.forEach((_, k) => {
      const li = bandLis[k];
      if (!li) return;
      const a = clamp(starts[k] / max);
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
      const b = r >= 0 ? beat[r] : -1;
      const along = q * pk;
      if (q >= shown || b < 0) {
        ctx.fillStyle = "#2A3756";
        for (let i = 0; i < ends; i++) {
          const o = i * endW + endW * 0.3;
          if (horizontal) ctx.fillRect(along, o, pk, endW * 0.4);
          else ctx.fillRect(o, along, endW * 0.4, pk);
        }
        continue;
      }
      const ch = chapters[rowChapter[r]];
      const fn = WEAVES[ch.dataset.weave || "plain"] || WEAVES.plain;
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
    const { ctx, w, h } = sizeCanvas(selvCv);
    const horizontal = narrowMQ.matches;
    drawCloth(ctx, w, h, horizontal, ENDS, rows, rows, (q) => q);
    if (fell >= 0) {
      ctx.fillStyle = "#F5F7FA";
      if (horizontal) ctx.fillRect(fell * PICK, 0, 2, h);
      else ctx.fillRect(0, fell * PICK, w, 2);
    }
  }

  /* ========================================================== TITLE == */
  const titleSec = root.querySelector<HTMLElement>("#title")!;
  const tStage = titleSec.querySelector<HTMLElement>(".loom-stage")!;
  const tBack = titleSec.querySelector<HTMLElement>(".loom-title__back")!;
  const tWeft = titleSec.querySelector<HTMLElement>(".loom-title__weft")!;
  const tCopy = titleSec.querySelector<HTMLElement>(".loom-title__copy")!;
  const tH1 = titleSec.querySelector<HTMLElement>(".loom-title__h1")!;
  const tBar = titleSec.querySelector<HTMLElement>(".loom-title__bar")!;
  const tFrontWrap = titleSec.querySelector<HTMLElement>(".loom-title__front")!;
  const tFront = [...tFrontWrap.querySelectorAll<HTMLElement>("i")];
  let mx = 0;
  let my = 0;
  let pmx = 0;
  let pmy = 0;
  const onPointer = (e: PointerEvent) => {
    mx = e.clientX / innerWidth - 0.5;
    my = e.clientY / innerHeight - 0.5;
  };
  if (FINE && !RM) addEventListener("pointermove", onPointer, { passive: true });

  function drawTitle(p: number) {
    if (RM) p = 0.35;
    pmx = lerp(pmx, mx, 0.08);
    pmy = lerp(pmy, my, 0.08);
    const e = ease(p);
    const hb = tH1.getBoundingClientRect();
    const sb = tStage.getBoundingClientRect();
    tFrontWrap.style.setProperty("--cut", `${Math.round(hb.bottom - sb.top + 4)}px`);
    tFrontWrap.style.setProperty("--top", `${Math.round(tBar.getBoundingClientRect().bottom - sb.top + 8)}px`);
    tBack.style.transform = `translate3d(${pmx * -8}px, ${-e * 36 + pmy * -6}px, 0) scale(${1 + e * 0.04})`;
    tWeft.style.transform = `translate3d(${(e - 0.5) * 60 + pmx * -14}px, ${-e * 60}px, 0)`;
    tCopy.style.transform = `translate3d(0, ${-e * 24}px, 0) scale(${1 - e * 0.03})`;
    for (const el of tFront) {
      const x = parseFloat(el.dataset.x || "50");
      const side = (x - 50) / 50;
      const dx = side * e * innerWidth * 0.34 + pmx * 22 * (0.6 + Math.abs(side));
      el.style.transform = `translate3d(${dx}px, ${pmy * 10}px, 0)`;
      el.style.opacity = String(1 - clamp(Math.abs(side) * 0.9 + e * 0.7 - 1.1));
    }
  }

  /* =========================================================== TURN == */
  const turnSec = root.querySelector<HTMLElement>("#turn")!;
  const turnCv = turnSec.querySelector<HTMLCanvasElement>(".loom-turn__canvas")!;
  type TurnGeo = {
    w: number; h: number; cell: number; cols: number; rws: number; ox: number; oy: number; n: number;
    sx: Float32Array; sy: Float32Array; ph: Float32Array; dl: Float32Array; motif: Uint8Array; tone: Uint8Array;
  };
  let T: TurnGeo | null = null;

  function logoCell(u: number, v: number) {
    // Bitloom mark: two interlocking rounded squares, A (0..0.62) and B (0.38..1)
    const inside = (a0: number, b0: number, a1: number, b1: number, rr: number) => {
      if (u < a0 || u > a1 || v < b0 || v > b1) return false;
      const cx = clamp(u, a0 + rr, a1 - rr);
      const cy = clamp(v, b0 + rr, b1 - rr);
      return (u - cx) ** 2 + (v - cy) ** 2 <= rr * rr;
    };
    const ring = (x0: number, y0: number, x1: number, y1: number, th: number, rad: number) =>
      inside(x0, y0, x1, y1, rad) && !inside(x0 + th, y0 + th, x1 - th, y1 - th, Math.max(0, rad - th));
    const A = ring(0, 0, 0.62, 0.62, 0.075, 0.13);
    const B = ring(0.38, 0.38, 1, 1, 0.075, 0.13);
    if ((u - 0.5) ** 2 + (v - 0.5) ** 2 < 0.045 ** 2) return 3;
    if (A && B) return u > 0.5 ? 2 : 1; // over and under at the two crossings
    return A ? 1 : B ? 2 : 0;
  }

  function layoutTurn() {
    const { w, h } = sizeCanvas(turnCv);
    const narrow = narrowMQ.matches;
    const cell = narrow ? 10 : 12;
    const x0 = narrow ? 16 : Math.round(w * 0.44);
    const x1 = narrow ? w - 16 : w - 56;
    const y0 = narrow ? 34 : 64;
    const y1 = narrow ? Math.round(h * 0.5) : h - 64;
    const cols = Math.max(1, Math.floor((x1 - x0) / cell));
    const rws = Math.max(1, Math.floor((y1 - y0) / cell));
    const ox = x0 + (x1 - x0 - cols * cell) / 2;
    const oy = y0 + (y1 - y0 - rws * cell) / 2;
    const L = Math.floor(Math.min(cols, rws) * 0.74);
    const lx = Math.floor((cols - L) / 2);
    const ly = Math.floor((rws - L) / 2);
    const n = cols * rws;
    const g: TurnGeo = {
      w, h, cell, cols, rws, ox, oy, n,
      sx: new Float32Array(n), sy: new Float32Array(n), ph: new Float32Array(n),
      dl: new Float32Array(n), motif: new Uint8Array(n), tone: new Uint8Array(n),
    };
    for (let k = 0; k < n; k++) {
      const c = k % cols;
      const r = (k / cols) | 0;
      g.sx[k] = hash(k * 1.3) * w;
      g.sy[k] = hash(k * 2.7 + 9) * h;
      g.ph[k] = hash(k * 5.1) * Math.PI * 2;
      g.dl[k] = hash(k * 3.3 + 1) * 0.42;
      g.tone[k] = hash(k * 7.7) < 0.12 ? 1 : hash(k * 8.9) < 0.1 ? 2 : 0;
      const u = (c - lx + 0.5) / L;
      const v = (r - ly + 0.5) / L;
      g.motif[k] = u >= 0 && u <= 1 && v >= 0 && v <= 1 ? logoCell(u, v) : 0;
    }
    T = g;
  }

  const BIT = ["#2A3B62", "#6EA8FF", "#C9D3E3"];
  const MOTIF: (string[] | null)[] = [null, ["#3D84FF", "#2F6FE4"], ["#9CC2FF", "#86B2F5"], ["#F5F7FA", "#F5F7FA"]];

  function drawTurn(p: number, now: number) {
    if (!T) layoutTurn();
    const g = T!;
    if (RM) p = 1;
    const ctx = turnCv.getContext("2d")!;
    ctx.clearRect(0, 0, g.w, g.h);
    const gather = clamp((p - 0.1) / 0.42);
    const wv = clamp((p - 0.46) / 0.32) * (g.rws + 2);
    const time = RM ? 0 : now * 0.0006;
    for (let k = 0; k < g.n; k++) {
      const c = k % g.cols;
      const r = (k / g.cols) | 0;
      const tx = g.ox + c * g.cell;
      const ty = g.oy + r * g.cell;
      if (r < wv) {
        const over = WEAVES.twill(c, r);
        const m = g.motif[k];
        ctx.fillStyle = m ? MOTIF[m]![over ? 0 : 1] : over ? "#3A5088" : "#22315A";
        ctx.fillRect(tx, ty, g.cell - 1, g.cell - 1);
        continue;
      }
      const t = ease((gather - g.dl[k]) / 0.58);
      const drift = (1 - t) * 16;
      const x = lerp(g.sx[k] + Math.sin(time + g.ph[k]) * drift, tx + g.cell * 0.29, t);
      const y = lerp(g.sy[k] + Math.cos(time * 0.8 + g.ph[k]) * drift, ty, t);
      ctx.fillStyle = t > 0.55 ? "#2E4170" : BIT[g.tone[k]];
      ctx.globalAlpha = t > 0.55 ? 1 : 0.55 + 0.45 * (g.tone[k] ? 1 : 0.5);
      ctx.fillRect(x, y, lerp(3.2, g.cell * 0.42, t), lerp(3.2, g.cell - 1, t));
    }
    ctx.globalAlpha = 1;
    if (wv > 0 && wv < g.rws) {
      const ry = g.oy + Math.floor(wv) * g.cell;
      const width = g.cols * g.cell;
      ctx.fillStyle = "rgba(245,247,250,0.85)";
      ctx.fillRect(g.ox, ry - 1, width, 2);
      const fr = wv % 1;
      const dir = Math.floor(wv) % 2 === 0;
      ctx.fillRect(g.ox + (dir ? fr : 1 - fr) * (width - 28), ry - 3, 28, 6);
    }
  }

  /* ======================================================= SWATCHES == */
  function drawSwatches() {
    root.querySelectorAll<HTMLCanvasElement>(".loom-swatch__cloth").forEach((cv) => {
      const { ctx, w, h } = sizeCanvas(cv);
      const fn = WEAVES[cv.dataset.weave || "plain"] || WEAVES.plain;
      const warp = cv.dataset.warp || "#0E1A33";
      const weft = cv.dataset.weft || "#2F6FE4";
      const cell = 6;
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

  /* ========================================================== LABEL == */
  const closeSec = root.querySelector<HTMLElement>("#close")!;
  const labelCv = closeSec.querySelector<HTMLCanvasElement>(".loom-label__cloth")!;

  function drawLabel(p: number) {
    const { ctx, w, h } = sizeCanvas(labelCv);
    const horizontal = narrowMQ.matches;
    const len = horizontal ? w : h;
    const across = horizontal ? h : w;
    const ends = Math.max(10, Math.round(across / 14));
    const picks = Math.max(30, Math.floor(len / 4));
    const shown = RM ? picks : Math.ceil(picks * clamp(0.42 + p * 1.2));
    drawCloth(ctx, w, h, horizontal, ends, picks, shown, (q) =>
      Math.min(rows - 1, Math.floor((q / picks) * rows)),
    );
  }

  /* =========================================================== LOOP == */
  const actByEl = (el: HTMLElement) => acts.find((a) => a.el === el)!;
  const onScreen = (el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    return r.bottom > -50 && r.top < innerHeight + 50;
  };
  let lastFell = -2;
  let needsSelv = true;
  let raf = 0;

  function frame(now: number) {
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
    if (onScreen(titleSec)) drawTitle(actByEl(titleSec).p);
    if (onScreen(turnSec)) drawTurn(actByEl(turnSec).p, now);
    if (onScreen(closeSec)) drawLabel(actByEl(closeSec).p);
    raf = requestAnimationFrame(frame);
  }

  function relayout() {
    layoutSelvedge();
    layoutTurn();
    drawSwatches();
    needsSelv = true;
  }
  let rt = 0;
  const onResize = () => {
    clearTimeout(rt);
    rt = window.setTimeout(relayout, 120);
  };
  addEventListener("resize", onResize);
  // the document height changes once fonts and the photo settle
  const ro = new ResizeObserver(onResize);
  ro.observe(document.body);

  root.classList.add("is-live");
  relayout();
  raf = requestAnimationFrame(frame);

  return () => {
    alive = false;
    cancelAnimationFrame(raf);
    clearTimeout(rt);
    removeEventListener("resize", onResize);
    removeEventListener("pointermove", onPointer);
    ro.disconnect();
    io.disconnect();
    root.classList.remove("is-live");
  };
}
