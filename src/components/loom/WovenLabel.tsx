import type { ReactNode } from "react";

/**
 * The sewn label: the left (or top, on phones) panel is re-woven from the
 * cloth the visitor wove in the selvedge on this page. Drawn by the shell runtime.
 */
export default function WovenLabel({
  maker,
  heading,
  body,
  actions,
  footnote,
  className = "",
  ...rest
}: {
  maker: string;
  heading: string;
  body?: string;
  actions?: ReactNode;
  footnote?: ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`loom-sewn loom-label ${className}`} {...rest}>
      <canvas className="loom-label__cloth" aria-hidden="true" />
      <div className="loom-label__text">
        <p className="loom-label__maker">{maker}</p>
        <h2 className="loom-display loom-label__h">{heading}</h2>
        {body && <p className="loom-label__body">{body}</p>}
        {actions && <div className="loom-label__actions">{actions}</div>}
        {footnote && <p className="loom-label__mail">{footnote}</p>}
      </div>
    </div>
  );
}
