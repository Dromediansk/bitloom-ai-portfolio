declare global {
  interface Window {
    gtag: (
      command: "config" | "event" | "js" | "consent",
      targetId: string | Date,
      config?: Record<string, string | number | boolean>
    ) => void;
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== "undefined" && typeof window.gtag !== "undefined") {
    window.gtag("config", GA_MEASUREMENT_ID!, {
      page_path: url,
    });
  }
};

// Track custom events
export const event = (
  action: string,
  {
    event_category,
    event_label,
    value,
  }: {
    event_category?: string;
    event_label?: string;
    value?: number;
  } = {}
) => {
  if (typeof window !== "undefined" && typeof window.gtag !== "undefined") {
    const eventConfig: Record<string, string | number | boolean> = {};

    if (event_category) eventConfig.event_category = event_category;
    if (event_label) eventConfig.event_label = event_label;
    if (value !== undefined) eventConfig.value = value;

    window.gtag("event", action, eventConfig);
  }
};

// Business-specific event tracking for Bitloom

export const trackBusinessInquiry = (formData: {
  company?: string;
  service?: string;
  budget?: string;
}) => {
  event("business_inquiry_submitted", {
    event_category: "engagement",
    event_label: formData.service || "general",
    value: 1,
  });
};

export const trackServiceView = (serviceName: string) => {
  event("service_viewed", {
    event_category: "services",
    event_label: serviceName,
  });
};

export const trackProjectView = (projectName: string) => {
  event("project_viewed", {
    event_category: "portfolio",
    event_label: projectName,
  });
};

export const trackDownload = (fileName: string) => {
  event("file_download", {
    event_category: "downloads",
    event_label: fileName,
  });
};

export const trackExternalLink = (url: string, linkText?: string) => {
  event("external_link_click", {
    event_category: "outbound_links",
    event_label: linkText || url,
  });
};

export const trackBlogClick = () => {
  event("blog_click", {
    event_category: "navigation",
    event_label: "blog.bitloom.sk",
  });
};

export const trackSocialClick = (platform: string) => {
  event("social_click", {
    event_category: "social_media",
    event_label: platform,
  });
};

export const trackCTAClick = (ctaName: string, location: string) => {
  event("cta_click", {
    event_category: "call_to_action",
    event_label: `${ctaName} - ${location}`,
  });
};

export const trackServiceInquiry = (service: string) => {
  event("service_inquiry", {
    event_category: "lead_generation",
    event_label: service,
  });
};

export const trackNewsletterSignup = () => {
  event("newsletter_signup", {
    event_category: "engagement",
    event_label: "footer_newsletter",
  });
};

// Enhanced form tracking
export const trackFormStart = (formName: string) => {
  event("form_start", {
    event_category: "form_interaction",
    event_label: formName,
  });
};

export const trackFormError = (formName: string, errorField: string) => {
  event("form_error", {
    event_category: "form_interaction",
    event_label: `${formName} - ${errorField}`,
  });
};

export const trackFormSuccess = (formName: string) => {
  event("form_success", {
    event_category: "form_interaction",
    event_label: formName,
  });
};

// Page engagement tracking
export const trackScrollDepth = (percentage: number) => {
  event("scroll_depth", {
    event_category: "engagement",
    event_label: `${percentage}%`,
    value: percentage,
  });
};

export const trackTimeOnPage = (seconds: number, pageName: string) => {
  event("time_on_page", {
    event_category: "engagement",
    event_label: pageName,
    value: seconds,
  });
};
