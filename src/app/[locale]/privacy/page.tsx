"use client";

import { useTranslations } from "next-intl";

export default function PrivacyPolicyPage() {
  const t = useTranslations("privacy");

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            {t("title")}
          </h1>

          <div className="text-gray-600 dark:text-gray-300 space-y-6 leading-relaxed">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
              <strong>{t("effectiveDate")}</strong> {t("date")}
              <br />
              <strong>{t("lastUpdated")}</strong> {t("date")}
            </p>

            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                1. {t("sections.introduction.title")}
              </h2>
              <p>{t("sections.introduction.content.paragraph1")}</p>
              <p className="mt-4">
                {t("sections.introduction.content.paragraph2")}
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                2. {t("sections.informationCollection.title")}
              </h2>

              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                2.1 {t("sections.informationCollection.directInfo.title")}
              </h3>
              <p>{t("sections.informationCollection.directInfo.intro")}</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
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

              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3 mt-6">
                2.2 {t("sections.informationCollection.consentInfo.title")}
              </h3>
              <p>
                <strong>
                  {t("sections.informationCollection.consentInfo.intro")}
                </strong>
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
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
              <p className="mt-3 text-sm bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                <strong>
                  {t(
                    "sections.informationCollection.consentInfo.importantLabel"
                  )}
                </strong>{" "}
                {t("sections.informationCollection.consentInfo.important")}
              </p>

              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3 mt-6">
                2.3 {t("sections.informationCollection.cookies.title")}
              </h3>
              <p>{t("sections.informationCollection.cookies.intro")}</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>{t("sections.informationCollection.cookies.items.0")}</li>
                <li>{t("sections.informationCollection.cookies.items.1")}</li>
                <li>{t("sections.informationCollection.cookies.items.2")}</li>
              </ul>
              <p className="mt-3 text-sm bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                <strong>
                  {t("sections.informationCollection.cookies.choiceLabel")}
                </strong>{" "}
                {t("sections.informationCollection.cookies.choice")}
              </p>
            </section>

            {/* How We Use Information */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                3. {t("sections.howWeUse.title")}
              </h2>
              <p>{t("sections.howWeUse.intro")}</p>
              <ul className="list-disc list-inside mt-2 space-y-2">
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
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                4. {t("sections.googleAnalytics.title")}
              </h2>
              <p>
                <strong>{t("sections.googleAnalytics.intro")}</strong>
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>{t("sections.googleAnalytics.items.0")}</li>
                <li>{t("sections.googleAnalytics.items.1")}</li>
                <li>{t("sections.googleAnalytics.items.2")}</li>
                <li>{t("sections.googleAnalytics.items.3")}</li>
                <li>{t("sections.googleAnalytics.items.4")}</li>
              </ul>
              <p className="mt-4">
                <strong>{t("sections.googleAnalytics.controlLabel")}</strong>{" "}
                {t("sections.googleAnalytics.control")}
              </p>
              <p className="mt-3 text-sm bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
                <strong>{t("sections.googleAnalytics.noConsentLabel")}</strong>{" "}
                {t("sections.googleAnalytics.noConsent")}
              </p>
            </section>

            {/* Information Sharing */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                5. {t("sections.informationSharing.title")}
              </h2>
              <p>{t("sections.informationSharing.intro")}</p>
              <ul className="list-disc list-inside mt-2 space-y-2">
                {t
                  .raw("sections.informationSharing.items")
                  .map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
              </ul>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                6. {t("sections.dataSecurity.title")}
              </h2>
              <p>{t("sections.dataSecurity.intro")}</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                {t
                  .raw("sections.dataSecurity.items")
                  .map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
              </ul>
              <p className="mt-4">{t("sections.dataSecurity.disclaimer")}</p>
            </section>

            {/* Your Rights (GDPR) */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                7. {t("sections.yourRights.title")}
              </h2>
              <p>{t("sections.yourRights.intro")}</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                {t
                  .raw("sections.yourRights.items")
                  .map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
              </ul>
              <p className="mt-4">{t("sections.yourRights.contact")}</p>
            </section>

            {/* Cookie Management */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                8. {t("sections.cookieManagement.title")}
              </h2>
              <p>{t("sections.cookieManagement.intro")}</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                {t
                  .raw("sections.cookieManagement.items")
                  .map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
              </ul>
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {t("sections.cookieManagement.choices.title")}
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <strong className="text-green-600 dark:text-green-400">
                      ✓ {t("sections.cookieManagement.choices.accept")}
                    </strong>
                  </li>
                  <li>
                    <strong className="text-red-600 dark:text-red-400">
                      ✗ {t("sections.cookieManagement.choices.decline")}
                    </strong>
                  </li>
                </ul>
              </div>
              <p className="mt-4">
                <strong>{t("sections.cookieManagement.noteLabel")}</strong>{" "}
                {t("sections.cookieManagement.note")}
              </p>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                9. {t("sections.dataRetention.title")}
              </h2>
              <p>{t("sections.dataRetention.intro")}</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                {t
                  .raw("sections.dataRetention.items")
                  .map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
              </ul>
              <p className="mt-4">{t("sections.dataRetention.deletion")}</p>
            </section>

            {/* International Transfers */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                10. {t("sections.internationalTransfers.title")}
              </h2>
              <p>{t("sections.internationalTransfers.intro")}</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                {t
                  .raw("sections.internationalTransfers.items")
                  .map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
              </ul>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                11. {t("sections.childrensPrivacy.title")}
              </h2>
              <p>{t("sections.childrensPrivacy.content")}</p>
            </section>

            {/* Changes to Privacy Policy */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                12. {t("sections.changes.title")}
              </h2>
              <p>{t("sections.changes.intro")}</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>{t("sections.changes.items.0")}</li>
                <li>{t("sections.changes.items.1")}</li>
                <li>{t("sections.changes.items.2")}</li>
              </ul>
              <p className="mt-4">{t("sections.changes.acceptance")}</p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                13. {t("sections.contact.title")}
              </h2>
              <p>{t("sections.contact.intro")}</p>
              <div className="mt-4 grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {t("sections.contact.legal.title")}
                  </h4>
                  <p>
                    <strong>{t("sections.contact.legal.company")}</strong>
                  </p>
                  <p>{t("sections.contact.legal.businessId")}</p>
                  <p>{t("sections.contact.legal.taxId")}</p>
                  <p>{t("sections.contact.legal.vatId")}</p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {t("sections.contact.details.title")}
                  </h4>
                  <p>
                    {t("sections.contact.details.email")}:{" "}
                    <a
                      href="mailto:info@bitloom.sk"
                      className="text-primary-600 dark:text-primary-400 hover:underline"
                    >
                      info@bitloom.sk
                    </a>
                  </p>
                  <p>{t("sections.contact.details.location")}</p>
                  <p>
                    {t("sections.contact.details.website")}:{" "}
                    <a
                      href="https://bitloom.sk"
                      className="text-primary-600 dark:text-primary-400 hover:underline"
                    >
                      bitloom.sk
                    </a>
                  </p>
                </div>
              </div>
              <p className="mt-4">{t("sections.contact.gdprNote")}</p>
            </section>

            {/* Compliance Statement */}
            <section className="border-t border-gray-200 dark:border-gray-600 pt-6 mt-8">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t("sections.compliance.statement")}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                {t("sections.compliance.registration")}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
