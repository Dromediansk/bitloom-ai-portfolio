/*
 * Bitloom home: the two bespoke scenes that only live on the home page.
 *   title  loose warp ends across the headline, bound into cloth beneath it on scroll
 *   turn   loose bits pulled into warp, then woven, with the Bitloom mark in the cloth
 * Everything shared (acts, cues, the selvedge, the label, the rAF loop and
 * relayout) runs in the shell; these register as scenes on it.
 * Colors come from src/styles/tokens.css (--title-*, --turn-*, --thread-*).
 */
import { addScene } from "@/lib/loom/shellRuntime";
import { readTokens, withAlpha } from "@/lib/loom/tokens";
import { clamp, ease, hash, lerp, NARROW_MQ, prefersReducedMotion, sizeCanvas, WEAVES } from "@/lib/loom/weave";

export function startHome(root: HTMLElement): () => void {
  const RM = prefersReducedMotion();
  const FINE = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const narrowMQ = matchMedia(NARROW_MQ);
  const C = readTokens({
    comb: "title-comb",
    weft: "title-weft",
    weftUnder: "title-weft-under",
    end: "title-end",
    shuttle: "title-shuttle",
    bit: "turn-bit",
    gathered: "turn-gathered",
    over: "turn-over",
    under: "turn-under",
    markA: "turn-mark-a",
    markB: "turn-mark-b",
    knot: "turn-knot",
    turnShuttle: "turn-shuttle",
    cobalt: "thread-cobalt",
    sky: "thread-sky",
    pale: "thread-pale",
    mist: "thread-mist",
  });

/* ========================================================== TITLE == */
  // Loose warp ends hang across the headline. Scrolling throws picks through them,
  // bottom up, until they are bound into a strip of cloth under the type and the
  // headline stands clear. Loose threads, then cloth that holds.
  const titleSec = root.querySelector<HTMLElement>("#title")!;
  const tStage = titleSec.querySelector<HTMLElement>(".loom-stage")!;
  const tBack = titleSec.querySelector<HTMLElement>(".loom-title__back")!;
  const tH1 = titleSec.querySelector<HTMLElement>(".loom-title__h1")!;
  const tSub = titleSec.querySelector<HTMLElement>(".loom-title__sub")!;
  const tBar = titleSec.querySelector<HTMLElement>(".loom-title__bar")!;
  const tCv = titleSec.querySelector<HTMLCanvasElement>(".loom-title__loom")!;
  const THREADS = [7, 19, 31, 44, 57, 70, 83, 94];
  const THREADS_NARROW = [10, 30, 50, 70, 90];
  const END = 6; // fine warp spacing in the band
  const PICK = 4; // pick height
  let tW = 0;
  let tH = 0;
  let fs = 100;
  let lastKey = "";
  let mx = 0;
  let my = 0;
  let pmx = 0;
  let pmy = 0;
  const onPointer = (e: PointerEvent) => {
    mx = e.clientX / innerWidth - 0.5;
    my = e.clientY / innerHeight - 0.5;
  };
  if (FINE && !RM) addEventListener("pointermove", onPointer, { passive: true });

  function layoutTitle() {
    const { w, h } = sizeCanvas(tCv);
    tW = w;
    tH = h;
    fs = parseFloat(getComputedStyle(tH1).fontSize) || 100;
    lastKey = "";
  }

  function drawTitle(p: number) {
    if (!tW) layoutTitle();
    if (RM) p = 1;
    pmx = lerp(pmx, mx, 0.08);
    pmy = lerp(pmy, my, 0.08);
    tBack.style.transform = `translate3d(${pmx * -8}px, ${-ease(p) * 24 + pmy * -6}px, 0)`;

    const sb = tStage.getBoundingClientRect();
    const hb = tH1.getBoundingClientRect();
    const ub = tSub.getBoundingClientRect();
    const bb = tBar.getBoundingClientRect();
    // the band sits in the gap between headline (clear of descenders) and subline
    const gapTop = hb.bottom - sb.top + Math.max(12, fs * 0.12);
    const gapBot = ub.top - sb.top - 20;
    const picks = clamp(Math.floor((gapBot - gapTop) / PICK), 3, 8);
    // centre the band in the gap so it reads as an underline, not a ledge
    const bandBot = Math.round((gapTop + gapBot + picks * PICK) / 2);
    const bandTop = bandBot - picks * PICK;
    const hangTop = bb.bottom - sb.top + 8;

    const key = `${p.toFixed(4)}|${pmx.toFixed(3)}|${bandTop}|${bandBot}|${hangTop}|${tW}`;
    if (key === lastKey) return;
    lastKey = key;

    const ctx = tCv.getContext("2d")!;
    ctx.clearRect(0, 0, tW, tH);
    const narrow = narrowMQ.matches;
    const threads = narrow ? THREADS_NARROW : THREADS;

    // picks woven so far, from the bottom of the band up
    const wv = clamp((p - 0.04) / 0.82) * picks;
    const done = Math.floor(wv);
    const ends = Math.ceil(tW / END);

    // unwoven warp in the band: a comb of fine ends waiting for weft
    ctx.fillStyle = C.comb;
    for (let i = 0; i < ends; i++) ctx.fillRect(i * END + 2, bandTop, 1, (picks - done) * PICK);

    // woven cloth: light slate twill, so the headline stays the darkest thing on the page
    for (let k = 0; k < done; k++) {
      const y = bandBot - (k + 1) * PICK;
      for (let i = 0; i < ends; i++) {
        ctx.fillStyle = WEAVES.twill(i, k) ? C.weft : C.weftUnder;
        ctx.fillRect(i * END, y, END, PICK);
      }
    }

    // the pick being thrown: partial row plus the shuttle
    const fr = wv - done;
    if (done < picks && fr > 0) {
      const y = bandBot - (done + 1) * PICK;
      const ltr = done % 2 === 0;
      const reach = fr * tW;
      const x0 = ltr ? 0 : tW - reach;
      ctx.fillStyle = C.weft;
      ctx.fillRect(x0, y + 1, reach, PICK - 2);
      ctx.fillStyle = C.shuttle;
      ctx.fillRect(ltr ? reach - 22 : tW - reach, y - 1, 22, PICK + 2);
    }

    // the cobalt ends: hanging loose above, bound over/under through the cloth
    const e = ease(clamp(p / 0.86));
    const top = lerp(hangTop, bandTop, e);
    const sway = (1 - e) * pmx * 18;
    for (let t = 0; t < threads.length; t++) {
      const x = Math.round((threads[t] / 100) * tW);
      const wdt = t % 2 ? 2 : 3;
      const alpha = t % 2 ? 0.85 : 1;
      const span = bandTop - top;
      if (span > 1) {
        // loose part: fades in under the page links, sways toward the pointer, pinned at the band
        const gr = ctx.createLinearGradient(0, top, 0, bandTop);
        const fade = Math.min(0.9, 40 / span);
        gr.addColorStop(0, withAlpha(C.end, 0));
        gr.addColorStop(fade, withAlpha(C.end, alpha));
        gr.addColorStop(1, withAlpha(C.end, alpha));
        ctx.strokeStyle = gr;
        ctx.lineWidth = wdt;
        ctx.beginPath();
        ctx.moveTo(x + sway, top);
        ctx.lineTo(x, bandTop);
        ctx.stroke();
      }
      // through the band: over every other pick where woven, plain where still open
      ctx.globalAlpha = alpha;
      ctx.fillStyle = C.end;
      for (let k = 0; k < picks; k++) {
        const y = bandBot - (k + 1) * PICK;
        if (k < done && (t + k) % 2 === 1) continue; // under this pick
        ctx.fillRect(x - wdt / 2, y, wdt, PICK);
      }
      // a short fringe below the cloth
      ctx.fillRect(x - wdt / 2, bandBot, wdt, 4);
      ctx.globalAlpha = 1;
    }

    // soft selvedges: fade the band out at both page edges
    ctx.globalCompositeOperation = "destination-out";
    const edge = Math.min(72, tW * 0.08);
    const l = ctx.createLinearGradient(0, 0, edge, 0);
    l.addColorStop(0, "black");
    l.addColorStop(1, "transparent");
    ctx.fillStyle = l;
    ctx.fillRect(0, bandTop - 2, edge, picks * PICK + 8);
    const r = ctx.createLinearGradient(tW - edge, 0, tW, 0);
    r.addColorStop(0, "transparent");
    r.addColorStop(1, "black");
    ctx.fillStyle = r;
    ctx.fillRect(tW - edge, bandTop - 2, edge, picks * PICK + 8);
    ctx.globalCompositeOperation = "source-over";
  }

  /* =========================================================== TURN == */
  const turnSec = root.querySelector<HTMLElement>("#turn")!;
  const turnCv = turnSec.querySelector<HTMLCanvasElement>(".loom-turn__canvas")!;
  type TurnGeo = {
    w: number; h: number; cell: number; cols: number; rws: number; ox: number; oy: number; n: number;
    sx: Float32Array; sy: Float32Array; ph: Float32Array; dl: Float32Array; motif: Uint8Array; tone: Uint8Array;
  };
  let T: TurnGeo | null = null;
  // once fully woven the picture is static: skip repaints until it unweaves or relayouts
  let turnDone = false;

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
    turnDone = false;
  }

  const BIT = [C.bit, C.sky, C.mist];
  // per motif cell: [over, under]
  const MOTIF: (string[] | null)[] = [null, [C.markA, C.cobalt], [C.pale, C.markB], [C.knot, C.knot]];

  function drawTurn(p: number, now: number) {
    if (!T) layoutTurn();
    const g = T!;
    if (RM) p = 1;
    const wv = clamp((p - 0.46) / 0.32) * (g.rws + 2);
    const woven = wv >= g.rws;
    if (woven && turnDone) return;
    turnDone = woven;
    const ctx = turnCv.getContext("2d")!;
    ctx.clearRect(0, 0, g.w, g.h);
    const gather = clamp((p - 0.1) / 0.42);
    const time = RM ? 0 : now * 0.0006;
    for (let k = 0; k < g.n; k++) {
      const c = k % g.cols;
      const r = (k / g.cols) | 0;
      const tx = g.ox + c * g.cell;
      const ty = g.oy + r * g.cell;
      if (r < wv) {
        const over = WEAVES.twill(c, r);
        const m = g.motif[k];
        ctx.fillStyle = m ? MOTIF[m]![over ? 0 : 1] : over ? C.over : C.under;
        ctx.fillRect(tx, ty, g.cell - 1, g.cell - 1);
        continue;
      }
      const t = ease((gather - g.dl[k]) / 0.58);
      const drift = (1 - t) * 16;
      const x = lerp(g.sx[k] + Math.sin(time + g.ph[k]) * drift, tx + g.cell * 0.29, t);
      const y = lerp(g.sy[k] + Math.cos(time * 0.8 + g.ph[k]) * drift, ty, t);
      ctx.fillStyle = t > 0.55 ? C.gathered : BIT[g.tone[k]];
      ctx.globalAlpha = t > 0.55 ? 1 : 0.55 + 0.45 * (g.tone[k] ? 1 : 0.5);
      ctx.fillRect(x, y, lerp(3.2, g.cell * 0.42, t), lerp(3.2, g.cell - 1, t));
    }
    ctx.globalAlpha = 1;
    if (wv > 0 && wv < g.rws) {
      const ry = g.oy + Math.floor(wv) * g.cell;
      const width = g.cols * g.cell;
      ctx.fillStyle = withAlpha(C.turnShuttle, 0.85);
      ctx.fillRect(g.ox, ry - 1, width, 2);
      const fr = wv % 1;
      const dir = Math.floor(wv) % 2 === 0;
      ctx.fillRect(g.ox + (dir ? fr : 1 - fr) * (width - 28), ry - 3, 28, 6);
    }
  }

  /* ========================================================= SCENES == */
  layoutTurn();
  const removeTitle = addScene({ el: titleSec, draw: (p) => drawTitle(p), layout: layoutTitle });
  const removeTurn = addScene({ el: turnSec, draw: drawTurn, layout: layoutTurn });

  return () => {
    removeTitle();
    removeTurn();
    removeEventListener("pointermove", onPointer);
  };
}
