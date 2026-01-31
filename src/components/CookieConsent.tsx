"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Button } from "./Button";

const CONSENT_COOKIE_NAME = "cookie-consent";
const CONSENT_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 180; // 180 days

function getCookieValue(name: string): string | null {
  if (typeof document === "undefined") return null;

  const parts = document.cookie.split("; ");
  for (const part of parts) {
    if (part.startsWith(`${name}=`)) {
      return decodeURIComponent(part.slice(name.length + 1));
    }
  }

  return null;
}

function setCookieValue(name: string, value: string) {
  if (typeof document === "undefined") return;

  const secure =
    typeof window !== "undefined" && window.location.protocol === "https:";

  document.cookie = [
    `${name}=${encodeURIComponent(value)}`,
    `Max-Age=${CONSENT_COOKIE_MAX_AGE_SECONDS}`,
    "Path=/",
    "SameSite=Lax",
    secure ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");
}

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const t = useTranslations("cookieConsent");

  useEffect(() => {
    const consent = getCookieValue(CONSENT_COOKIE_NAME);
    if (!consent) {
      const timeoutId = window.setTimeout(() => {
        setShowBanner(true);
      }, 0);

      return () => {
        window.clearTimeout(timeoutId);
      };
    }

    // Clean up legacy storage if present.
    try {
      localStorage.removeItem(CONSENT_COOKIE_NAME);
    } catch {
      // ignore
    }
  }, []);

  const acceptCookies = () => {
    setCookieValue(CONSENT_COOKIE_NAME, "accepted");
    setShowBanner(false);

    // Enable GA tracking with consent
    if (typeof window !== "undefined" && typeof window.gtag !== "undefined") {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
      });
    }
  };

  const declineCookies = () => {
    setCookieValue(CONSENT_COOKIE_NAME, "declined");
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
        <div className="flex gap-3 shrink-0">
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
