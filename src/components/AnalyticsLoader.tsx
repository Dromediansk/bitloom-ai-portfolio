"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { CONSENT_CHANGE_EVENT, hasAnalyticsConsent } from "@/lib/consent";

interface AnalyticsLoaderProps {
  gaId: string;
}

export const AnalyticsLoader = ({ gaId }: AnalyticsLoaderProps) => {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
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
