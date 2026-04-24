export const CONSENT_COOKIE_NAME = "cookie-consent";
export const CONSENT_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 180;
export const CONSENT_CHANGE_EVENT = "bitloom-cookie-consent-changed";

// Bump whenever the privacy policy materially changes. Users who consented
// under an older version will see the banner again (fresh consent required).
export const PRIVACY_POLICY_VERSION = "2026-04";

export interface ConsentPreferences {
  analytics: boolean;
}

export interface ConsentRecord extends ConsentPreferences {
  version: string;
  timestamp: string;
}

export const DEFAULT_PREFERENCES: ConsentPreferences = {
  analytics: false,
};

function parseCookie(raw: string): ConsentRecord | null {
  try {
    const parsed = JSON.parse(decodeURIComponent(raw));
    if (
      parsed &&
      typeof parsed === "object" &&
      typeof parsed.analytics === "boolean" &&
      typeof parsed.version === "string" &&
      typeof parsed.timestamp === "string"
    ) {
      return parsed as ConsentRecord;
    }
  } catch {
    // invalid cookie — treat as no record
  }
  return null;
}

export function getConsentRecord(): ConsentRecord | null {
  if (typeof document === "undefined") return null;

  for (const part of document.cookie.split("; ")) {
    if (part.startsWith(`${CONSENT_COOKIE_NAME}=`)) {
      const record = parseCookie(part.slice(CONSENT_COOKIE_NAME.length + 1));
      if (record && record.version === PRIVACY_POLICY_VERSION) {
        return record;
      }
    }
  }
  return null;
}

export function hasRecordedConsent(): boolean {
  return getConsentRecord() !== null;
}

export function hasAnalyticsConsent(): boolean {
  return getConsentRecord()?.analytics === true;
}

export function setConsent(preferences: ConsentPreferences): ConsentRecord {
  const record: ConsentRecord = {
    ...preferences,
    version: PRIVACY_POLICY_VERSION,
    timestamp: new Date().toISOString(),
  };

  if (typeof document !== "undefined") {
    const secure =
      typeof window !== "undefined" && window.location.protocol === "https:";

    document.cookie = [
      `${CONSENT_COOKIE_NAME}=${encodeURIComponent(JSON.stringify(record))}`,
      `Max-Age=${CONSENT_COOKIE_MAX_AGE_SECONDS}`,
      "Path=/",
      "SameSite=Lax",
      secure ? "Secure" : "",
    ]
      .filter(Boolean)
      .join("; ");
  }

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
  }

  return record;
}

// GA can set cookies on the current host, a leading-dot host, or the
// registrable root — we don't know which, so clear every plausible variant.
export function clearAnalyticsCookies(): void {
  if (typeof document === "undefined") return;

  const hostname = window.location.hostname;
  const domains = new Set<string>(["", hostname, `.${hostname}`]);
  const parts = hostname.split(".");
  if (parts.length >= 2) {
    const root = parts.slice(-2).join(".");
    domains.add(root);
    domains.add(`.${root}`);
  }

  const gaPattern = /^(_ga|_gid|_gat)/;
  for (const cookie of document.cookie.split("; ")) {
    const name = cookie.split("=")[0];
    if (!gaPattern.test(name)) continue;
    for (const domain of domains) {
      const domainPart = domain ? `; Domain=${domain}` : "";
      document.cookie = `${name}=; Max-Age=0; Path=/${domainPart}`;
    }
  }
}
