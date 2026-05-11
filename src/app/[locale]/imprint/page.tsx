import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { siteConfig } from "@/lib/config";

export default function ImprintPage() {
  const t = useTranslations("imprint");

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("title")}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            {t("intro")}
          </p>

          <div className="text-gray-600 dark:text-gray-300 space-y-8 leading-relaxed">
            {/* Company Details */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                1. {t("sections.provider.title")}
              </h2>
              <p className="font-semibold text-gray-900 dark:text-white">
                {t("sections.provider.company")}
              </p>
              <dl className="mt-3 grid gap-y-2 sm:grid-cols-[max-content_1fr] sm:gap-x-6">
                <dt className="font-medium text-gray-900 dark:text-white">
                  {t("sections.provider.registeredOfficeLabel")}
                </dt>
                <dd>{t("sections.provider.registeredOffice")}</dd>

                <dt className="font-medium text-gray-900 dark:text-white">
                  {t("sections.provider.businessIdLabel")}
                </dt>
                <dd>{t("sections.provider.businessId")}</dd>

                <dt className="font-medium text-gray-900 dark:text-white">
                  {t("sections.provider.taxIdLabel")}
                </dt>
                <dd>{t("sections.provider.taxId")}</dd>

                <dt className="font-medium text-gray-900 dark:text-white">
                  {t("sections.provider.vatIdLabel")}
                </dt>
                <dd>{t("sections.provider.vatId")}</dd>
              </dl>
              <p className="mt-4 text-sm">{t("sections.provider.register")}</p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                2. {t("sections.contact.title")}
              </h2>
              <dl className="grid gap-y-2 sm:grid-cols-[max-content_1fr] sm:gap-x-6">
                <dt className="font-medium text-gray-900 dark:text-white">
                  {t("sections.contact.emailLabel")}
                </dt>
                <dd>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    {siteConfig.contact.email}
                  </a>
                </dd>

                <dt className="font-medium text-gray-900 dark:text-white">
                  {t("sections.contact.phoneLabel")}
                </dt>
                <dd>
                  <a
                    href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                    className="text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </dd>

                <dt className="font-medium text-gray-900 dark:text-white">
                  {t("sections.contact.locationLabel")}
                </dt>
                <dd>{t("sections.contact.location")}</dd>
              </dl>
            </section>

            {/* Represented By */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                3. {t("sections.representation.title")}
              </h2>
              <p>{t("sections.representation.content")}</p>
            </section>

            {/* Online Dispute Resolution */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                4. {t("sections.disputeResolution.title")}
              </h2>
              <p>
                {t("sections.disputeResolution.intro")}{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  {t("sections.disputeResolution.linkText")}
                </a>
                {t("sections.disputeResolution.outro")}
              </p>
            </section>

            {/* Data Protection */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                5. {t("sections.dataProtection.title")}
              </h2>
              <p>
                {t("sections.dataProtection.intro")}{" "}
                <Link
                  href="/privacy"
                  className="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  {t("sections.dataProtection.linkText")}
                </Link>
                {t("sections.dataProtection.outro")}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
