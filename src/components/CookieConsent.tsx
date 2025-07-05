"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "./Button";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const t = useTranslations("cookieConsent");

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);

    // Enable GA tracking with consent
    if (typeof window !== "undefined" && typeof window.gtag !== "undefined") {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
      });
    }
  };

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShowBanner(false);

    // Disable GA tracking
    if (typeof window !== "undefined" && typeof window.gtag !== "undefined") {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
      });
    }
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 dark:bg-gray-950 text-white p-4 z-50 shadow-2xl border-t border-gray-700">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
        <div className="flex gap-3 flex-shrink-0">
          <Button
            onClick={declineCookies}
            variant="secondary"
            size="sm"
            aria-label={t("declineAriaLabel")}
          >
            {t("decline")}
          </Button>
          <Button
            onClick={acceptCookies}
            variant="primary"
            size="sm"
            aria-label={t("acceptAriaLabel")}
          >
            {t("accept")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
