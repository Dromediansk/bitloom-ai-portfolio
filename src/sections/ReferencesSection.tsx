"use client";

import { ButtonLink, SectionTitle } from "@/components";
import { useIntersectionObserver } from "@/lib/hooks";
import { getStaggeredDelay } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface Reference {
  id: number;
  name: string;
  role: string;
  company: string;
  testimonial: string;
  avatar?: string;
}

const ReferenceCard = ({
  reference,
  isVisible,
  delayClass,
}: {
  reference: Reference;
  isVisible: boolean;
  delayClass: string;
}) => {
  const t = useTranslations("references");

  return (
    <div
      className={`bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-500 ${
        isVisible
          ? `animate-fade-in-up ${delayClass}`
          : "opacity-0 translate-y-8"
      }`}
    >
      {/* Quote Icon */}
      <div className="text-primary-500 mb-4">
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {/* Testimonial */}
      <blockquote className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
        &ldquo;{reference.testimonial}&rdquo;
      </blockquote>

      {/* Author Info */}
      <div className="flex items-center">
        {/* Avatar Placeholder */}
        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg mr-4">
          {reference.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>

        <div>
          <div className="font-semibold text-gray-900 dark:text-white">
            {reference.name}
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            {reference.role} {t("at")} {reference.company}
          </div>
        </div>
      </div>
    </div>
  );
};

const ReferencesSection = () => {
  const { elementRef, hasIntersected } = useIntersectionObserver();
  const t = useTranslations("references");

  // Sample references data - replace with actual testimonials
  const references: Reference[] = [
    {
      id: 1,
      name: t("testimonials.0.name"),
      role: t("testimonials.0.role"),
      company: t("testimonials.0.company"),
      testimonial: t("testimonials.0.testimonial"),
    },
    {
      id: 2,
      name: t("testimonials.1.name"),
      role: t("testimonials.1.role"),
      company: t("testimonials.1.company"),
      testimonial: t("testimonials.1.testimonial"),
    },
  ];

  const stats = [
    { value: "10+", label: t("stats.projectsCompleted") },
    { value: "6+", label: t("stats.yearsExperience") },
    { value: "100%", label: t("stats.clientSatisfaction") },
  ];

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

        {/* References Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {references.map((reference, index) => (
            <ReferenceCard
              key={reference.id}
              reference={reference}
              isVisible={hasIntersected}
              delayClass={getStaggeredDelay(index)}
            />
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 mb-16 justify-items-center max-w-3xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t("cta.title")}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            {t("cta.description")}
          </p>
          <ButtonLink href="/contact" variant="primary">
            {t("cta.startConversation")}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
};

export default ReferencesSection;
