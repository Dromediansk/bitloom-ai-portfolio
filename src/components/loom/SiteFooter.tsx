"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { siteConfig } from "@/lib/config";
import { trackSocialClick } from "@/lib/analytics";
import LocaleSwitch from "./LocaleSwitch";
import { PAGES } from "./SiteNav";

export default function SiteFooter() {
  const t = useTranslations("footer");
  const nav = useTranslations("navigation");
  const home = useTranslations("home");
  const contact = useTranslations("contact.methods");

  return (
    <footer className="loom-g-navy loom-site-foot">
      <div className="loom-wrap">
        <div className="loom-site-foot__grid">
          <div className="loom-site-foot__brand">
            <Link href="/" className="loom-mark" aria-label={nav("home")}>
              <Image src="/icon.svg" width={28} height={28} alt="" />
              <span>Bitloom</span>
            </Link>
            <p>{t("description")}</p>
          </div>

          <div>
            <h2 className="loom-tag">{t("quickLinks.title")}</h2>
            <ul>
              {PAGES.map((p) => (
                <li key={p}>
                  <Link href={`/${p}`}>{nav(p)}</Link>
                </li>
              ))}
              <li>
                <a href="https://blog.bitloom.sk" target="_blank" rel="noopener noreferrer">
                  {nav("blog")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="loom-tag">{t("contactInfo.title")}</h2>
            <ul>
              <li>
                <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
              </li>
              <li>
                <a href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}>{siteConfig.contact.phone}</a>
              </li>
              <li className="loom-soft">{contact("location.value")}</li>
            </ul>
          </div>

          <div>
            <h2 className="loom-tag">Bitloom</h2>
            <ul>
              <li>
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackSocialClick("linkedin")}
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackSocialClick("github")}
                >
                  GitHub
                </a>
              </li>
              <li>
                <Link href="/imprint">{t("legalLinks.imprint")}</Link>
              </li>
              <li>
                <Link href="/privacy">{t("legalLinks.privacy")}</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="loom-site-foot__bottom">
          <p>
            {t("copyright", { year: new Date().getFullYear() })} · {home("close.registration")}
          </p>
          <LocaleSwitch label={home("language")} />
        </div>
      </div>
    </footer>
  );
}
