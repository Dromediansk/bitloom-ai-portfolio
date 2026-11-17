// Shared helpers for the loom: weave drafts and small math.

export type Weave = (i: number, r: number) => boolean;

// true = weft passes over the warp end at (end i, pick r)
export const WEAVES: Record<string, Weave> = {
  plain: (i, r) => ((i + r) & 1) === 0,
  twill: (i, r) => (((i + r) % 4) + 4) % 4 < 2,
  basket: (i, r) => (((i >> 1) + (r >> 1)) & 1) === 0,
  herring: (i, r) => {
    const k = r % 12 < 6 ? i + r : i - r;
    return ((k % 4) + 4) % 4 < 2;
  },
  satin: (i, r) => (((i * 2 + r) % 5) + 5) % 5 === 0,
};

export const weaveOf = (name?: string) => WEAVES[name || "plain"] || WEAVES.plain;

export const clamp = (v: number, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
export const ease = (t: number) => 1 - Math.pow(1 - clamp(t), 3);
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const hash = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

export const DPR = () => Math.min(2, (typeof window !== "undefined" && window.devicePixelRatio) || 1);

export function sizeCanvas(cv: HTMLCanvasElement) {
  const dpr = DPR();
  const r = cv.getBoundingClientRect();
  const w = Math.max(1, Math.round(r.width));
  const h = Math.max(1, Math.round(r.height));
  if (cv.width !== w * dpr || cv.height !== h * dpr) {
    cv.width = w * dpr;
    cv.height = h * dpr;
  }
  const ctx = cv.getContext("2d")!;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, w, h };
}

/** Progress (0..1) an act publishes as --p; 0 until the shell has run. */
export const actProgress = (el: HTMLElement) => {
  const v = parseFloat(el.style.getPropertyValue("--p"));
  return Number.isFinite(v) ? v : 0;
};
