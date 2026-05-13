"use client";

import { ButtonLink, SectionTitle } from "@/components";
import {
  AuthorHeader,
  DecorativeQuote,
  Testimonial,
  TestimonialModal,
  VerifiedBadge,
} from "@/components/testimonial";
import { useIntersectionObserver } from "@/lib/hooks";
import { getStaggeredDelay } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useState } from "react";

const TestimonialCard = ({
  testimonial,
  isVisible,
  delayClass,
  onClick,
}: {
  testimonial: Testimonial;
  isVisible: boolean;
  delayClass: string;
  onClick: () => void;
}) => {
  const t = useTranslations("testimonials");

  return (
    <div
      className={`flex flex-col gap-3 ${
        isVisible
          ? `animate-fade-in-up ${delayClass}`
          : "opacity-0 translate-y-8"
      } transition-all duration-500`}
    >
      <button
        type="button"
        onClick={onClick}
        aria-label={`${t("readMore")}: ${testimonial.name}`}
        className="relative text-left w-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
      >
        <DecorativeQuote />
        <AuthorHeader testimonial={testimonial} />
        <blockquote className="mt-5 text-gray-700 dark:text-gray-300 text-base leading-relaxed line-clamp-3">
          &ldquo;{testimonial.testimonial}&rdquo;
        </blockquote>
        <span className="mt-4 inline-flex items-center text-sm font-medium text-primary-600 dark:text-primary-400">
          {t("readMore")}
          <span aria-hidden="true" className="ml-1">
            →
          </span>
        </span>
      </button>
      <div className="px-1">
        <VerifiedBadge
          recommendationDate={testimonial.recommendationDate}
          authorName={testimonial.name}
        />
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const { elementRef, hasIntersected } = useIntersectionObserver();
  const t = useTranslations("testimonials");
  const [selected, setSelected] = useState<Testimonial | null>(null);

  const testimonials = t.raw("items") as Testimonial[];

  const stats = [
    { value: "10+", label: t("stats.projectsCompleted") },
    { value: "6+", label: t("stats.yearsExperience") },
    { value: "0", label: t("stats.missedDeadlines") },
  ];

  return (
    <section ref={elementRef} className="min-h-screen section-padding">
      <div className="container-max">
        <SectionTitle
          title={t("title")}
          subtitle={t("subtitle")}
          animated={true}
          isVisible={hasIntersected}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              isVisible={hasIntersected}
              delayClass={getStaggeredDelay(index)}
              onClick={() => setSelected(testimonial)}
            />
          ))}
        </div>

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

      <TestimonialModal
        testimonial={selected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
};

export default TestimonialsSection;
