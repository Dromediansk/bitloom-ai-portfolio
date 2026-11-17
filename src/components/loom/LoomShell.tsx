"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { startShell } from "@/lib/loom/shellRuntime";
import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";
import "@/styles/loom-shell.css";
import "@/styles/loom-pages.css";

export const isHomePath = (pathname: string | null) => /^\/(en|sk)?\/?$/.test(pathname ?? "");

/**
 * The frame every page sits in: the selvedge (woven by scroll, it is also the
 * chapter nav), grain, header and footer. The home page draws its own header
 * inside its title scene and ends on its own pinned label.
 */
export default function LoomShell({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHome = isHomePath(pathname);
  const t = useTranslations("home");

  // Restart per page: chapters, acts and the cloth record belong to the page.
  useEffect(() => {
    if (!rootRef.current) return;
    return startShell(rootRef.current);
  }, [pathname]);

  return (
    <div className="loom" ref={rootRef}>
      <nav className="loom-selvedge" aria-label={t("chaptersLabel")}>
        <canvas className="loom-selvedge__cloth" aria-hidden="true" />
        <ol className="loom-selvedge__bands" />
      </nav>
      <div className="loom-grain" aria-hidden="true" />

      {!isHome && (
        <header className="loom-site-header loom-g-paper">
          <SiteNav />
        </header>
      )}
      <main id="main-content">{children}</main>
      {!isHome && <SiteFooter />}
    </div>
  );
}
