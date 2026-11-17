"use client";

import { useTranslations } from "next-intl";
import { ContactForm, ContactInfo } from "@/components/contact";
import PageMasthead from "@/components/loom/PageMasthead";
import { chapter, WEFT } from "@/lib/loom/chapters";

const ContactSection = () => {
  const t = useTranslations("contact");
  const nav = useTranslations("navigation");

  return (
    <>
      <PageMasthead title={t("title")} lede={t("subtitle")} chapterLabel={nav("contact")} weave="plain" compact />
      <section {...chapter("write", t("form.title"), "twill", WEFT.cobalt)} className="loom-g-paper loom-section ct-section">
        <div className="loom-wrap ct-layout">
          <ContactInfo />
          <ContactForm />
        </div>
      </section>
    </>
  );
};

export default ContactSection;
