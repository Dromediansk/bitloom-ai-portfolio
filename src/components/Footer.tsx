import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useTranslations } from "next-intl";
import SocialLinks from "./SocialLinks";
import { siteConfig } from "@/lib/config";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const t = useTranslations("footer");

  const quickLinks = [
    { href: "/services", labelKey: "quickLinks.services" },
    { href: "/projects", labelKey: "quickLinks.projects" },
    { href: "/about", labelKey: "quickLinks.about" },
    { href: "/contact", labelKey: "quickLinks.contact" },
  ] as const;

  const legalLinks = [
    { href: "/privacy", labelKey: "legalLinks.privacy" },
    { href: "/imprint", labelKey: "legalLinks.imprint" },
  ] as const;

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-3">
          {/* Branding */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center hover:opacity-80 transition-all duration-300 transform hover:scale-105"
            >
              <Image
                src="/logo_mark.svg"
                alt="Bitloom Logo"
                width={480}
                height={160}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-xs">
              {t("description")}
            </p>
            <SocialLinks className="pt-2" />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {t("quickLinks.title")}
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {t("contactInfo.title")}
            </h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-gray-900 dark:text-white font-medium">
                  {t("contactInfo.email")}
                </dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {siteConfig.contact.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-gray-900 dark:text-white font-medium">
                  {t("contactInfo.phone")}
                </dt>
                <dd className="mt-1">
                  <a
                    href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Bottom strip — copyright + legal links */}
        <div className="border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col items-start justify-between gap-3 py-6 text-xs text-gray-500 dark:text-gray-400 md:flex-row md:items-center">
            <p>{t("copyright", { year: currentYear })}</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
