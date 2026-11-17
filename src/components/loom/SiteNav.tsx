"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { siteConfig } from "@/lib/config";
import LocaleSwitch from "./LocaleSwitch";

export const PAGES = ["services", "projects", "about", "testimonials", "contact"] as const;

/** Wordmark, page links and the language switch. Used in the header of every page. */
export default function SiteNav({ className = "" }: { className?: string }) {
  const nav = useTranslations("navigation");
  const t = useTranslations("home");
  const pathname = usePathname();

  return (
    <div className={`loom-bar ${className}`}>
      <Link href="/" className="loom-mark" aria-label={nav("home")}>
        <Image src="/icon.svg" width={32} height={32} alt="" priority />
        <span>Bitloom</span>
      </Link>
      <nav className="loom-pages" aria-label={t("pagesLabel")}>
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
