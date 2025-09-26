"use client";

import { SectionTitle } from "@/components";
import { ContactForm, ContactInfo } from "@/components/contact";
import { useIntersectionObserver } from "@/lib/hooks";
import { useTranslations } from "next-intl";

const ContactSection = () => {
  const { elementRef, hasIntersected } = useIntersectionObserver();
  const t = useTranslations("contact");

  return (
    <section ref={elementRef} className="min-h-screen section-padding">
      <div className="container-max">
        {/* Header */}
        <SectionTitle
          title={t("title")}
          subtitle={t("subtitle")}
          animated={true}
          isVisible={hasIntersected}
        />

        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <ContactInfo />

          {/* Contact Form */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
