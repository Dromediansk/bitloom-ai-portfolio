"use client";

import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { Link } from "@/i18n/routing";
import { siteConfig } from "@/lib/config";
import { trackCTAClick } from "@/lib/analytics";
import { chapter } from "@/lib/loom/chapters";
import WovenLabel from "./WovenLabel";

/** The closing label at the end of an inner page: the visitor's cloth plus one action. */
export default function PageClose({
  heading,
  body,
  location,
  secondary,
}: {
  heading?: string;
  body?: string;
  location: string;
  secondary?: ReactNode;
}) {
  const t = useTranslations("home");
  return (
    <section
      {...chapter("start", t("chapters.close"), "plain", "cobalt")}
      className="loom-g-paper loom-site-close"
      data-act="flow"
    >
      <div className="loom-wrap" data-in="">
        <WovenLabel
          maker={t("close.maker")}
          heading={heading ?? t("close.heading")}
          body={body ?? t("close.body")}
          actions={
            <>
              <Link
                className="loom-btn"
                href="/contact"
                onClick={() => trackCTAClick("start_project", location)}
              >
                {t("title.cta")}
              </Link>
              {secondary}
            </>
          }
          footnote={<a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>}
        />
        <p className="loom-close__note">{t("close.note")}</p>
      </div>
    </section>
  );
}
