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
    <div className="loom-cookie" role="region" aria-label={t("title")}>
      {!showDetails ? (
        <>
          <p>
            <strong>{t("title")}</strong> {t("description")}
          </p>
          <p className="loom-soft">
            {t("preferences")} <Link href="/privacy">{t("privacyPolicy")}</Link>.
          </p>
          <div className="loom-cookie__actions">
            <Button onClick={acceptAll} size="sm" aria-label={t("acceptAriaLabel")}>
              {t("accept")}
            </Button>
            <Button onClick={rejectAll} variant="ghost" size="sm" aria-label={t("declineAriaLabel")}>
              {t("decline")}
            </Button>
            <Button onClick={() => setShowDetails(true)} variant="ghost" size="sm" aria-label={t("customiseAriaLabel")}>
              {t("customise")}
            </Button>
          </div>
        </>
      ) : (
        <>
          <p>
            <strong>{t("preferencesTitle")}</strong>
          </p>
          <p className="loom-soft">{t("preferencesIntro")}</p>
          <ul className="loom-cookie__cats">
            <li>
              <div>
                <p>{t("categories.essential.label")}</p>
                <p className="loom-soft">{t("categories.essential.description")}</p>
              </div>
              <span className="loom-tag">{t("alwaysOn")}</span>
            </li>
            <li>
              <label htmlFor="consent-analytics">
                <p>{t("categories.analytics.label")}</p>
                <p className="loom-soft">{t("categories.analytics.description")}</p>
              </label>
              <input
                id="consent-analytics"
                type="checkbox"
                checked={analyticsChecked}
                onChange={(e) => setAnalyticsChecked(e.target.checked)}
              />
            </li>
          </ul>
          <div className="loom-cookie__actions">
            <Button onClick={savePreferences} size="sm">
              {t("savePreferences")}
            </Button>
            <Button onClick={acceptAll} variant="ghost" size="sm">
              {t("accept")}
            </Button>
            <Button onClick={rejectAll} variant="ghost" size="sm">
              {t("decline")}
            </Button>
            <Button onClick={() => setShowDetails(false)} variant="ghost" size="sm">
              {t("back")}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CookieConsent;
