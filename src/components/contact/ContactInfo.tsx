"use client";

import { useTranslations } from "next-intl";
import { siteConfig } from "@/lib/config";
import { trackCTAClick, trackSocialClick } from "@/lib/analytics";

const ContactInfo = () => {
  const t = useTranslations("contact");

  return (
    <div className="ct-info" data-in="">
      <h2 className="loom-display ct-info__h">{t("info.title")}</h2>
      <p className="loom-soft ct-info__p">{t("info.description")}</p>

      <dl className="loom-ledger loom-ledger--quiet">
        <div>
          <dt>{t("methods.email.title")}</dt>
          <dd>
            <a href={`mailto:${siteConfig.contact.email}`} onClick={() => trackCTAClick("email_link", "contact_info")}>
              {siteConfig.contact.email}
            </a>
          </dd>
        </div>
        <div>
          <dt>{t("methods.phone.title")}</dt>
          <dd>
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
              onClick={() => trackCTAClick("phone_link", "contact_info")}
            >
              {siteConfig.contact.phone}
            </a>
          </dd>
        </div>
        <div>
          <dt>{t("methods.location.title")}</dt>
          <dd>{t("methods.location.value")}</dd>
        </div>
        <div>
          <dt>{t("methods.responseTime.title")}</dt>
          <dd>{t("methods.responseTime.value")}</dd>
        </div>
        <div>
          <dt>{t("social.title")}</dt>
          <dd className="ct-info__social">
            <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" onClick={() => trackSocialClick("linkedin")}>
              LinkedIn
            </a>
            <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" onClick={() => trackSocialClick("github")}>
              GitHub
            </a>
            <a href={siteConfig.social.whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => trackSocialClick("whatsapp")}>
              WhatsApp
            </a>
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default ContactInfo;
