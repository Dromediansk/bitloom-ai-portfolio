"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { CONSENT_CHANGE_EVENT, hasAnalyticsConsent } from "@/lib/consent";
import { captureLandingPage } from "@/lib/analytics";

interface AnalyticsLoaderProps {
  gaId: string;
}

export const AnalyticsLoader = ({ gaId }: AnalyticsLoaderProps) => {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    // Record the session's first landing page for lead attribution. Stored in
    // sessionStorage only — no tracking happens until/unless consent loads gtag.
    captureLandingPage();
    const sync = () => setConsented(hasAnalyticsConsent());
    sync();
    window.addEventListener(CONSENT_CHANGE_EVENT, sync);
    return () => {
      window.removeEventListener(CONSENT_CHANGE_EVENT, sync);
    };
  }, []);

  if (!consented) return null;
  return <GoogleAnalytics gaId={gaId} />;
};
