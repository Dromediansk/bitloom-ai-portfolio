"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { siteConfig } from "@/lib/config";
import LocaleSwitch from "./LocaleSwitch";

export const PAGES = ["services", "projects", "about", "testimonials", "contact"] as const;

/**
 * Wordmark, page links and the language switch. Used in the header of every page.
 * On phones the links fold behind a menu button and open as a panel under the bar.
 */
export default function SiteNav({ className = "" }: { className?: string }) {
  const nav = useTranslations("navigation");
  const t = useTranslations("home");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  // While open: Escape or a tap outside the bar closes it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    const onPointer = (e: PointerEvent) => {
      if (!barRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  // Following a link closes the panel.
  const closeOnLink = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a")) setOpen(false);
  };

  return (
    <div className={`loom-bar ${className}`} ref={barRef}>
      <Link href="/" className="loom-mark" aria-label={nav("home")} onClick={() => setOpen(false)}>
        <Image src="/icon.svg" width={32} height={32} alt="" priority />
        <span>Bitloom</span>
      </Link>
      <button
        ref={toggleRef}
        type="button"
        className="loom-menu-toggle"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? nav("closeMenu") : undefined}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="loom-menu-toggle__text">{nav("menu")}</span>
        <span className="loom-menu-toggle__icon" aria-hidden="true" />
      </button>
      <nav
        id={panelId}
        className="loom-pages loom-g-paper"
        data-open={open || undefined}
        aria-label={t("pagesLabel")}
        onClick={closeOnLink}
      >
        <ul>
          {PAGES.map((p) => {
            const href = `/${p}`;
            const current = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <li key={p}>
                <Link href={href} aria-current={current ? "page" : undefined}>
                  {nav(p)}
                </Link>
              </li>
            );
          })}
          <li>
            <a href={siteConfig.blogUrl} target="_blank" rel="noopener noreferrer">
              {nav("blog")}
            </a>
          </li>
        </ul>
        <LocaleSwitch label={t("language")} />
      </nav>
    </div>
  );
}
