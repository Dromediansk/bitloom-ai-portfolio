"use client";

import { useTranslations } from "next-intl";
import PageMasthead from "@/components/loom/PageMasthead";
import {
  CONSENT_COOKIE_NAME,
  CONSENT_CHANGE_EVENT,
  clearAnalyticsCookies,
} from "@/lib/consent";
import { siteConfig } from "@/lib/config";

export default function PrivacyPolicyPage() {
  const t = useTranslations("privacy");

  const handleManageCookies = () => {
    if (typeof document === "undefined") return;
    document.cookie = `${CONSENT_COOKIE_NAME}=; Max-Age=0; Path=/; SameSite=Lax`;
    clearAnalyticsCookies();
    window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
  };

  return (
    <>
      <PageMasthead
        title={t("title")}
        chapterLabel={t("title")}
        weave="plain"
        compact
      ></PageMasthead>
      <section className="loom-g-paper loom-section loom-doc-section"
      >
        <div className="loom-wrap">
          <div className="loom-doc">
            <div>
              <p className="loom-soft">
                <strong>{t("effectiveDate")}</strong> {t("date")}
                <br />
                <strong>{t("lastUpdated")}</strong> {t("date")}
              </p>

              {/* Introduction */}
              <section>
                <h2>1. {t("sections.introduction.title")}</h2>
                <p>{t("sections.introduction.content.paragraph1")}</p>
                <p>{t("sections.introduction.content.paragraph2")}</p>
              </section>

              {/* Information We Collect */}
              <section>
                <h2>2. {t("sections.informationCollection.title")}</h2>

                <h3>
                  2.1 {t("sections.informationCollection.directInfo.title")}
                </h3>
                <p>{t("sections.informationCollection.directInfo.intro")}</p>
                <ul>
                  <li>
                    {t("sections.informationCollection.directInfo.items.0")}
                  </li>
                  <li>
                    {t("sections.informationCollection.directInfo.items.1")}
                  </li>
                  <li>
                    {t("sections.informationCollection.directInfo.items.2")}
                  </li>
                </ul>

                <h3>
                  2.2 {t("sections.informationCollection.consentInfo.title")}
                </h3>
                <p>
                  <strong>
                    {t("sections.informationCollection.consentInfo.intro")}
                  </strong>
                </p>
                <ul>
                  <li>
                    {t("sections.informationCollection.consentInfo.items.0")}
                  </li>
                  <li>
                    {t("sections.informationCollection.consentInfo.items.1")}
                  </li>
                  <li>
                    {t("sections.informationCollection.consentInfo.items.2")}
                  </li>
                  <li>
                    {t("sections.informationCollection.consentInfo.items.3")}
                  </li>
                </ul>
                <p className="loom-note">
                  <strong>
                    {t(
                      "sections.informationCollection.consentInfo.importantLabel",
                    )}
                  </strong>{" "}
                  {t("sections.informationCollection.consentInfo.important")}
                </p>

                <h3>2.3 {t("sections.informationCollection.cookies.title")}</h3>
                <p>{t("sections.informationCollection.cookies.intro")}</p>
                <ul>
                  <li>{t("sections.informationCollection.cookies.items.0")}</li>
                  <li>{t("sections.informationCollection.cookies.items.1")}</li>
                  <li>{t("sections.informationCollection.cookies.items.2")}</li>
                </ul>
                <p className="loom-note">
                  <strong>
                    {t("sections.informationCollection.cookies.choiceLabel")}
                  </strong>{" "}
                  {t("sections.informationCollection.cookies.choice")}
                </p>
              </section>

              {/* How We Use Information */}
              <section>
                <h2>3. {t("sections.howWeUse.title")}</h2>
                <p>{t("sections.howWeUse.intro")}</p>
                <ul>
                  <li>{t("sections.howWeUse.items.0")}</li>
                  <li>{t("sections.howWeUse.items.1")}</li>
                  <li>{t("sections.howWeUse.items.2")}</li>
                  <li>{t("sections.howWeUse.items.3")}</li>
                  <li>{t("sections.howWeUse.items.4")}</li>
                  <li>{t("sections.howWeUse.items.5")}</li>
                </ul>
              </section>

              {/* Google Analytics */}
              <section>
                <h2>4. {t("sections.googleAnalytics.title")}</h2>
                <p>
                  <strong>{t("sections.googleAnalytics.intro")}</strong>
                </p>
                <ul>
                  <li>{t("sections.googleAnalytics.items.0")}</li>
                  <li>{t("sections.googleAnalytics.items.1")}</li>
                  <li>{t("sections.googleAnalytics.items.2")}</li>
                  <li>{t("sections.googleAnalytics.items.3")}</li>
                  <li>{t("sections.googleAnalytics.items.4")}</li>
                </ul>
                <p>
                  <strong>{t("sections.googleAnalytics.controlLabel")}</strong>{" "}
                  {t("sections.googleAnalytics.control")}
                </p>
                <p className="loom-note">
                  <strong>
                    {t("sections.googleAnalytics.noConsentLabel")}
                  </strong>{" "}
                  {t("sections.googleAnalytics.noConsent")}
                </p>
              </section>

              {/* Information Sharing */}
              <section>
                <h2>5. {t("sections.informationSharing.title")}</h2>
                <p>{t("sections.informationSharing.intro")}</p>
                <ul>
                  {t
                    .raw("sections.informationSharing.items")
                    .map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                </ul>
              </section>

              {/* Data Security */}
              <section>
                <h2>6. {t("sections.dataSecurity.title")}</h2>
                <p>{t("sections.dataSecurity.intro")}</p>
                <ul>
                  {t
                    .raw("sections.dataSecurity.items")
                    .map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                </ul>
                <p>{t("sections.dataSecurity.disclaimer")}</p>
              </section>

              {/* Your Rights (GDPR) */}
              <section>
                <h2>7. {t("sections.yourRights.title")}</h2>
                <p>{t("sections.yourRights.intro")}</p>
                <ul>
                  {t
                    .raw("sections.yourRights.items")
                    .map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                </ul>
                <p>{t("sections.yourRights.contact")}</p>
              </section>

              {/* Cookie Management */}
              <section>
                <h2>8. {t("sections.cookieManagement.title")}</h2>
                <p>{t("sections.cookieManagement.intro")}</p>
                <ul>
                  {t
                    .raw("sections.cookieManagement.items")
                    .map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                </ul>
                <div className="loom-note">
                  <h4 className="loom-doc__strong">
                    {t("sections.cookieManagement.choices.title")}
                  </h4>
                  <ul className="loom-doc__compact">
                    <li>
                      <strong className="loom-doc__yes">
                        ✓ {t("sections.cookieManagement.choices.accept")}
                      </strong>
                    </li>
                    <li>
                      <strong className="loom-doc__no">
                        ✗ {t("sections.cookieManagement.choices.decline")}
                      </strong>
                    </li>
                  </ul>
                </div>
                <p>
                  <strong>{t("sections.cookieManagement.noteLabel")}</strong>{" "}
                  {t("sections.cookieManagement.note")}
                </p>
                <div className="loom-note">
                  <p>{t("sections.cookieManagement.manageHelp")}</p>
                  <button
                    type="button"
                    onClick={handleManageCookies}
                    className="loom-btn loom-btn--sm"
                  >
                    {t("sections.cookieManagement.manageButton")}
                  </button>
                </div>
              </section>

              {/* Data Retention */}
              <section>
                <h2>9. {t("sections.dataRetention.title")}</h2>
                <p>{t("sections.dataRetention.intro")}</p>
                <ul>
                  {t
                    .raw("sections.dataRetention.items")
                    .map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                </ul>
                <p>{t("sections.dataRetention.deletion")}</p>
              </section>

              {/* International Transfers */}
              <section>
                <h2>10. {t("sections.internationalTransfers.title")}</h2>
                <p>{t("sections.internationalTransfers.intro")}</p>
                <ul>
                  {t
                    .raw("sections.internationalTransfers.items")
                    .map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                </ul>
              </section>

              {/* Children's Privacy */}
              <section>
                <h2>11. {t("sections.childrensPrivacy.title")}</h2>
                <p>{t("sections.childrensPrivacy.content")}</p>
              </section>

              {/* Changes to Privacy Policy */}
              <section>
                <h2>12. {t("sections.changes.title")}</h2>
                <p>{t("sections.changes.intro")}</p>
                <ul>
                  <li>{t("sections.changes.items.0")}</li>
                  <li>{t("sections.changes.items.1")}</li>
                  <li>{t("sections.changes.items.2")}</li>
                </ul>
                <p>{t("sections.changes.acceptance")}</p>
              </section>

              {/* Legal Bases */}
              <section>
                <h2>13. {t("sections.legalBases.title")}</h2>
                <p>{t("sections.legalBases.intro")}</p>
                <ul>
                  {t
                    .raw("sections.legalBases.items")
                    .map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                </ul>
              </section>

              {/* Data Protection Officer */}
              <section>
                <h2>14. {t("sections.dpoOrContact.title")}</h2>
                <p>{t("sections.dpoOrContact.content")}</p>
              </section>

              {/* Supervisory Authority */}
              <section>
                <h2>15. {t("sections.supervisoryAuthority.title")}</h2>
                <p>{t("sections.supervisoryAuthority.intro")}</p>
                <div className="loom-note">
                  <p className="loom-doc__strong">
                    {t("sections.supervisoryAuthority.name")}
                  </p>
                  {t("sections.supervisoryAuthority.nameTranslation") && (
                    <p className="loom-soft">
                      {t("sections.supervisoryAuthority.nameTranslation")}
                    </p>
                  )}
                  <p>{t("sections.supervisoryAuthority.address")}</p>
                  <p>
                    <a
                      href={t("sections.supervisoryAuthority.website")}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("sections.supervisoryAuthority.website")}
                    </a>
                  </p>
                </div>
              </section>

              {/* Contact Information */}
              <section>
                <h2>16. {t("sections.contact.title")}</h2>
                <p>{t("sections.contact.intro")}</p>
                <div className="loom-doc__cols">
                  <div className="loom-note">
                    <h4 className="loom-doc__strong">
                      {t("sections.contact.legal.title")}
                    </h4>
                    <p>
                      <strong>{t("sections.contact.legal.company")}</strong>
                    </p>
                    <p>{t("sections.contact.legal.businessId")}</p>
                    <p>{t("sections.contact.legal.taxId")}</p>
                    <p>{t("sections.contact.legal.vatId")}</p>
                  </div>

                  <div className="loom-note">
                    <h4 className="loom-doc__strong">
                      {t("sections.contact.details.title")}
                    </h4>
                    <p>
                      {t("sections.contact.details.email")}:{" "}
                      <a href={`mailto:${siteConfig.contact.email}`}>
                        {siteConfig.contact.email}
                      </a>
                    </p>
                    <p>{t("sections.contact.details.location")}</p>
                    <p>
                      {t("sections.contact.details.website")}:{" "}
                      <a href="https://bitloom.sk">bitloom.sk</a>
                    </p>
                  </div>
                </div>
                <p>{t("sections.contact.gdprNote")}</p>
              </section>

              {/* Compliance Statement */}
              <section className="loom-doc__gap">
                <p className="loom-soft">
                  {t("sections.compliance.statement")}
                </p>
                <p className="loom-soft loom-doc__gap">
                  {t("sections.compliance.registration")}
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
