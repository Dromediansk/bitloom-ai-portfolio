"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { routing } from "@/i18n/routing";

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const switchLanguage = (newLocale: string) => {
    // Remove current locale from pathname
    const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
    // Construct new path with new locale
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath);
  };

  return (
    <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLanguage(loc)}
          className={`px-3 py-1 text-sm font-medium rounded-md transition-all duration-200 ${
            locale === loc
              ? "bg-primary-600 text-white shadow-sm"
              : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
          aria-label={`Switch to ${loc.toUpperCase()}`}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
