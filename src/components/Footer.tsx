import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useTranslations } from "next-intl";
import SocialLinks from "./SocialLinks";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const t = useTranslations("footer");
  const tNav = useTranslations("navigation");

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="container-max px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center hover:opacity-80 transition-all duration-300 transform hover:scale-105 mb-4"
            >
              <Image
                src="/logo_pure.svg"
                alt="Bitloom Logo"
                width={160}
                height={48}
                className="h-20 w-auto"
              />
            </Link>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {t("description")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              {t("quickLinks.title")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  {tNav("services")}
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  {tNav("projects")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  {tNav("about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  {tNav("contact")}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  {t("quickLinks.privacyPolicy")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              {t("contactInfo.title")}
            </h3>
            <ul className="space-y-2">
              <li className="text-gray-600 dark:text-gray-400">
                <span className="font-medium">{t("contactInfo.email")}</span>
                <br />
                <a
                  href="mailto:info@bitloom.sk"
                  className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  info@bitloom.sk
                </a>
              </li>
              <li className="text-gray-600 dark:text-gray-400">
                <span className="font-medium">{t("contactInfo.location")}</span>
                <br />
                {t("contactInfo.locationValue")}
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700">
          <SocialLinks className="mb-4 sm:mb-0" />

          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {t("copyright", { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
