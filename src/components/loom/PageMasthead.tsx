import type { ReactNode } from "react";
import { chapter, type WeaveName } from "@/lib/loom/chapters";

/** The title page of every inner page: big type on paper, a woven band underneath. */
export default function PageMasthead({
  title,
  lede,
  chapterLabel,
  weave = "plain",
  compact = false,
  children,
}: {
  title: string;
  lede?: string;
  chapterLabel: string;
  weave?: WeaveName;
  compact?: boolean;
  children?: ReactNode;
}) {
  return (
    <section {...chapter("top", chapterLabel, weave)} className={`loom-g-paper loom-masthead${compact ? " loom-masthead--compact" : ""}`}>
      <div className="loom-wrap" data-in="">
        <h1 className="loom-page-h1">{title}</h1>
        {lede && <p className="loom-lede">{lede}</p>}
        {children && <div className="loom-masthead__extra">{children}</div>}
      </div>
      <div className="loom-wrap">
        <canvas
          className="loom-swatch__cloth loom-masthead__band"
          data-weave={weave}
          data-weft="cobalt"
          data-warp="navy"
          data-cell="4"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
