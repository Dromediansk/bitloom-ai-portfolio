"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Button } from "./Button";
import {
  CONSENT_CHANGE_EVENT,
  CONSENT_COOKIE_NAME,
  clearAnalyticsCookies,
  hasRecordedConsent,
  setConsent,
} from "@/lib/consent";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analyticsChecked, setAnalyticsChecked] = useState(false);
  const t = useTranslations("cookieConsent");

  useEffect(() => {
    try {
      localStorage.removeItem(CONSENT_COOKIE_NAME);
    } catch {
      // ignore
    }

    const sync = () => {
      if (hasRecordedConsent()) {
        setShowBanner(false);
      } else {
        setShowDetails(false);
        setAnalyticsChecked(false);
        setShowBanner(true);
      }
    };

    const timeoutId = window.setTimeout(sync, 0);
    window.addEventListener(CONSENT_CHANGE_EVENT, sync);

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener(CONSENT_CHANGE_EVENT, sync);
    };
  }, []);

  const acceptAll = () => {
    setConsent({ analytics: true });
    setShowBanner(false);
  };

  const rejectAll = () => {
    setConsent({ analytics: false });
    clearAnalyticsCookies();
    setShowBanner(false);
  };

  const savePreferences = () => {
    setConsent({ analytics: analyticsChecked });
    if (!analyticsChecked) clearAnalyticsCookies();
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 dark:bg-gray-950 text-white p-4 z-50 shadow-2xl border-t border-gray-700">
      <div className="max-w-6xl mx-auto">
        {!showDetails ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm leading-relaxed">
                <span className="font-semibold">{t("title")}</span>{" "}
                {t("description")}
              </p>
              <p className="text-xs text-gray-300 mt-1">
                {t("preferences")}{" "}
                <Link
                  href="/privacy"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  {t("privacyPolicy")}
                </Link>
                .
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Button
                onClick={() => setShowDetails(true)}
                variant="secondary"
                size="sm"
                aria-label={t("customiseAriaLabel")}
              >
                {t("customise")}
              </Button>
              <Button
                onClick={rejectAll}
                variant="secondary"
                size="sm"
                aria-label={t("declineAriaLabel")}
              >
                {t("decline")}
              </Button>
              <Button
                onClick={acceptAll}
                variant="secondary"
                size="sm"
                aria-label={t("acceptAriaLabel")}
              >
                {t("accept")}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div>
              <p className="font-semibold text-sm">{t("preferencesTitle")}</p>
              <p className="text-xs text-gray-300 mt-1">
                {t("preferencesIntro")}
              </p>
            </div>

            <ul className="space-y-3">
              <li className="flex items-start justify-between gap-4 border border-gray-700 rounded-lg p-3">
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {t("categories.essential.label")}
                  </p>
                  <p className="text-xs text-gray-300 mt-1">
                    {t("categories.essential.description")}
                  </p>
                </div>
                <span className="text-xs text-gray-300 shrink-0 pt-1">
                  {t("alwaysOn")}
                </span>
              </li>
              <li className="flex items-start justify-between gap-4 border border-gray-700 rounded-lg p-3">
                <label
                  htmlFor="consent-analytics"
                  className="flex-1 cursor-pointer"
                >
                  <span className="text-sm font-medium">
                    {t("categories.analytics.label")}
                  </span>
                  <span className="block text-xs text-gray-300 mt-1">
                    {t("categories.analytics.description")}
                  </span>
                </label>
                <input
                  id="consent-analytics"
                  type="checkbox"
                  checked={analyticsChecked}
                  onChange={(e) => setAnalyticsChecked(e.target.checked)}
                  className="mt-1 size-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 accent-primary-600 shrink-0"
                />
              </li>
            </ul>

            <div className="flex flex-wrap gap-3 justify-end">
              <Button
                onClick={() => setShowDetails(false)}
                variant="secondary"
                size="sm"
              >
                {t("back")}
              </Button>
              <Button onClick={rejectAll} variant="secondary" size="sm">
                {t("decline")}
              </Button>
              <Button onClick={savePreferences} variant="secondary" size="sm">
                {t("savePreferences")}
              </Button>
              <Button onClick={acceptAll} variant="secondary" size="sm">
                {t("accept")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieConsent;
