/*
 * Bitloom home: the two bespoke scenes that only live on the home page.
 *   title  warp threads in front of / behind the headline, parting on scroll
 *   turn   loose bits pulled into warp, then woven, with the Bitloom mark in the cloth
 * Everything shared (acts, cues, the selvedge, the label) runs in the shell.
 */
import { actProgress, clamp, ease, hash, lerp, sizeCanvas, WEAVES } from "@/lib/loom/weave";

export function startHome(root: HTMLElement): () => void {
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const FINE = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const narrowMQ = matchMedia("(max-width: 860px)");
  let alive = true;

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

  /* =========================================================== LOOP == */
  const onScreen = (el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    return r.bottom > -50 && r.top < innerHeight + 50;
  };
  let raf = 0;
  function frame(now: number) {
    if (!alive) return;
    if (onScreen(titleSec)) drawTitle(actProgress(titleSec));
    if (onScreen(turnSec)) drawTurn(actProgress(turnSec), now);
    raf = requestAnimationFrame(frame);
  }

  let rt = 0;
  const onResize = () => {
    clearTimeout(rt);
    rt = window.setTimeout(layoutTurn, 120);
  };
  addEventListener("resize", onResize);
  layoutTurn();
  raf = requestAnimationFrame(frame);

  return () => {
    alive = false;
    cancelAnimationFrame(raf);
    clearTimeout(rt);
    removeEventListener("resize", onResize);
    removeEventListener("pointermove", onPointer);
  };
}
