"use client";

import { SectionTitle } from "@/components";
import { ContactForm, ContactInfo } from "@/components/contact";
import { useIntersectionObserver } from "@/lib/hooks";

const ContactSection = () => {
  const { elementRef, hasIntersected } = useIntersectionObserver();

  return (
    <section ref={elementRef} className="min-h-screen section-padding">
      <div className="container-max">
        {/* Header */}
        <SectionTitle
          title="Start Your Project"
          subtitle="Ready to transform your ideas into powerful digital solutions? Let's discuss your project."
          animated={true}
          isVisible={hasIntersected}
        />

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
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
