// Canvas access to the design tokens. Colors live only in src/styles/tokens.css;
// the runtimes read them from the computed style of <html> instead of keeping a copy.

/** Thread colors a chapter, swatch or masthead can weave with (`--thread-<name>` in tokens.css). */
export const THREADS = ["cobalt", "sky", "pale", "bone", "mist", "ivory", "frost", "navy", "indigo"] as const;
export type Thread = (typeof THREADS)[number];

/**
 * Read tokens once (not per frame): maps each key to the value of `--<token>`.
 *   readTokens({ ground: "cloth-ground", fell: "cloth-fell" }) → { ground: "#0d1526", fell: "#f5f7fa" }
 */
export function readTokens<K extends string>(map: Record<K, string>): Record<K, string> {
  const cs = getComputedStyle(document.documentElement);
  const out = {} as Record<K, string>;
  for (const k in map) out[k] = cs.getPropertyValue(`--${map[k]}`).trim();
  return out;
}

/** Resolve a data-weft / data-warp thread name to its color, falling back to `fallback`. */
export function threadColor(name: string | undefined, fallback: Thread): string {
  const cs = getComputedStyle(document.documentElement);
  const pick = (n: string) => cs.getPropertyValue(`--thread-${n}`).trim();
  return (name && pick(name)) || pick(fallback);
}

let probe: CanvasRenderingContext2D | null = null;

/**
 * A token color at the given opacity, for canvas gradients. Any CSS color works
 * (the CSS minifier may rewrite a token as #rgb, #rrggbbaa or a name): the canvas
 * normalizes it to #rrggbb first. A color that already has alpha is returned as-is.
 */
export function withAlpha(color: string, alpha: number): string {
  probe ??= document.createElement("canvas").getContext("2d");
  if (!probe) return color;
  probe.fillStyle = "#000";
  probe.fillStyle = color;
  const hex = String(probe.fillStyle);
  if (!/^#[0-9a-f]{6}$/i.test(hex)) return hex;
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}
