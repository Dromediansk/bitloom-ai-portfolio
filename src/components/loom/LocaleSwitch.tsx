"use client";

import { useLocale } from "next-intl";
import { routing, usePathname, useRouter } from "@/i18n/routing";

export default function LocaleSwitch({ label }: { label: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="loom-locale" role="group" aria-label={label}>
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          lang={loc}
          aria-pressed={locale === loc}
          onClick={() => router.replace(pathname, { locale: loc, scroll: false })}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
