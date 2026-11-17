"use client";

import { FormEvent, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import {
  getLandingPage,
  trackFormError,
  trackFormStart,
  trackLeadGenerated,
} from "@/lib/analytics";

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
  website: string;
}

const ContactForm = () => {
  const t = useTranslations("contact.form");

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    message: "",
    website: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const hasStartedRef = useRef(false);

  // Fire form_start once, on the first interaction with the form.
  const handleFormStart = () => {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      trackFormStart("contact_form");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      company: "",
      message: "",
      website: "",
    });
  };

  const isFormValid =
    formData.name.trim() && formData.email.trim() && formData.message.trim();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        resetForm();
        trackLeadGenerated({
          form_name: "contact_form",
          lead_source: getLandingPage(),
        });
      } else {
        throw new Error("Failed to send message. Please try again later.");
      }
    } catch {
      setSubmitStatus("error");
      trackFormError("contact_form", "submission_failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="ct-form" data-in="">
      <div className="loom-g-paper loom-sewn ct-form__panel">
        <h2 className="loom-display ct-form__h">{t("title")}</h2>
        <form onSubmit={handleSubmit} onFocus={handleFormStart} className="ct-form__grid" noValidate={false}>
          <div className="loom-field">
            <label htmlFor="name">
              {t("yourName")} {t("required")}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder={t("placeholders.name")}
            />
          </div>

          <div className="loom-field">
            <label htmlFor="email">
              {t("email")} {t("required")}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder={t("placeholders.email")}
            />
          </div>

          <div className="loom-field ct-form__wide">
            <label htmlFor="company">{t("company")}</label>
            <input
              type="text"
              id="company"
              name="company"
              autoComplete="organization"
              value={formData.company}
              onChange={handleChange}
              placeholder={t("placeholders.company")}
            />
          </div>

          <div className="loom-field ct-form__wide">
            <label htmlFor="message">
              {t("textMessage")} {t("required")}
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              required
              placeholder={t("placeholders.message")}
            />
          </div>

          {/* Honeypot: bots fill in visible-to-them fields; humans don't see this */}
          <div aria-hidden="true" hidden>
            <label htmlFor="website">Website</label>
            <input
              type="text"
              id="website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={formData.website}
              onChange={handleChange}
            />
          </div>

          {/* GDPR Art. 13: privacy notice at point of collection */}
          <p className="ct-form__wide ct-form__notice">
            {t("privacyNotice.text")} <Link href="/privacy">{t("privacyNotice.linkText")}</Link>.
          </p>

          <div className="ct-form__wide">
            <button type="submit" className="loom-btn" disabled={isSubmitting || !isFormValid}>
              {isSubmitting ? t("sending") : t("sendMessage")}
            </button>
          </div>

          <div className="ct-form__wide" aria-live="polite">
            {submitStatus === "success" && <p className="loom-status loom-status--ok">{t("success")}</p>}
            {submitStatus === "error" && <p className="loom-status loom-status--err">{t("error")}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
