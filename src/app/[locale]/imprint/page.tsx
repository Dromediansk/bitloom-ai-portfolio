import { useTranslations } from "next-intl";
import PageMasthead from "@/components/loom/PageMasthead";
import { Link } from "@/i18n/routing";
import { siteConfig } from "@/lib/config";

export default function ImprintPage() {
  const t = useTranslations("imprint");

  return (
    <>
      <PageMasthead title={t("title")} chapterLabel={t("title")} weave="plain"
        compact>
        <p className="loom-soft">{t("intro")}</p>
      </PageMasthead>
      <section className="loom-g-paper loom-section loom-doc-section"
      >
        <div className="loom-wrap">
          <div className="loom-doc">
            <div>
              {/* Company Details */}
              <section>
                <h2>1. {t("sections.provider.title")}</h2>
                <p className="loom-doc__strong">
                  {t("sections.provider.company")}
                </p>
                <dl>
                  <dt>{t("sections.provider.registeredOfficeLabel")}</dt>
                  <dd>{t("sections.provider.registeredOffice")}</dd>

                  <dt>{t("sections.provider.businessIdLabel")}</dt>
                  <dd>{t("sections.provider.businessId")}</dd>

                  <dt>{t("sections.provider.taxIdLabel")}</dt>
                  <dd>{t("sections.provider.taxId")}</dd>

                  <dt>{t("sections.provider.vatIdLabel")}</dt>
                  <dd>{t("sections.provider.vatId")}</dd>
                </dl>
                <p className="loom-soft">{t("sections.provider.register")}</p>
              </section>

              {/* Contact */}
              <section>
                <h2>2. {t("sections.contact.title")}</h2>
                <dl>
                  <dt>{t("sections.contact.emailLabel")}</dt>
                  <dd>
                    <a href={`mailto:${siteConfig.contact.email}`}>
                      {siteConfig.contact.email}
                    </a>
                  </dd>

                  <dt>{t("sections.contact.phoneLabel")}</dt>
                  <dd>
                    <a
                      href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                    >
                      {siteConfig.contact.phone}
                    </a>
                  </dd>

                  <dt>{t("sections.contact.locationLabel")}</dt>
                  <dd>{t("sections.contact.location")}</dd>
                </dl>
              </section>

              {/* Represented By */}
              <section>
                <h2>3. {t("sections.representation.title")}</h2>
                <p>{t("sections.representation.content")}</p>
              </section>

              {/* Online Dispute Resolution */}
              <section>
                <h2>4. {t("sections.disputeResolution.title")}</h2>
                <p>
                  {t("sections.disputeResolution.intro")}{" "}
                  <a
                    href="https://ec.europa.eu/consumers/odr"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("sections.disputeResolution.linkText")}
                  </a>
                  {t("sections.disputeResolution.outro")}
                </p>
              </section>

              {/* Data Protection */}
              <section>
                <h2>5. {t("sections.dataProtection.title")}</h2>
                <p>
                  {t("sections.dataProtection.intro")}{" "}
                  <Link href="/privacy">
                    {t("sections.dataProtection.linkText")}
                  </Link>
                  {t("sections.dataProtection.outro")}
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
