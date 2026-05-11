"use client";

import { ButtonLink, Modal, SectionTitle } from "@/components";
import { useIntersectionObserver } from "@/lib/hooks";
import { getStaggeredDelay } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface Reference {
  id: number;
  name: string;
  role: string;
  company?: string;
  testimonial: string;
}

const DecorativeQuote = () => (
  <svg
    className="absolute top-4 right-4 w-16 h-16 text-primary-500/15 dark:text-primary-400/15 pointer-events-none"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L9.758 4.03c0 0-.218.052-.597.144C8.97 4.222 8.737 4.278 8.472 4.345c-.271.05-.56.187-.882.312C7.272 4.799 6.904 4.895 6.562 5.123c-.344.218-.741.4-1.091.692C5.132 6.116 4.723 6.377 4.421 6.76c-.33.358-.656.734-.909 1.162C3.219 8.33 3.02 8.778 2.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C2.535 17.474 4.338 19 6.5 19c2.485 0 4.5-2.015 4.5-4.5S8.985 10 6.5 10zM17.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L20.758 4.03c0 0-.218.052-.597.144-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.317.143-.686.238-1.028.467-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.944-.33.358-.656.734-.909 1.162C14.219 8.33 14.02 8.778 13.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C13.535 17.474 15.338 19 17.5 19c2.485 0 4.5-2.015 4.5-4.5S19.985 10 17.5 10z" />
  </svg>
);

const StarRating = () => (
  <div className="mt-1.5 flex gap-1" aria-hidden="true">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className="w-4 h-4 text-yellow-400"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.366-2.446a1 1 0 00-1.176 0l-3.366 2.446c-.785.57-1.84-.197-1.54-1.118l1.286-3.957a1 1 0 00-.363-1.118L2.07 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.951-.69l1.286-3.957z" />
      </svg>
    ))}
  </div>
);

const AuthorHeader = ({ reference }: { reference: Reference }) => {
  const t = useTranslations("references");
  return (
    <div className="min-w-0">
      <div className="font-semibold text-gray-900 dark:text-white truncate">
        {reference.name}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {reference.role}
        {reference.company ? ` ${t("at")} ${reference.company}` : ""}
      </div>
      <StarRating />
    </div>
  );
};

const ReferenceCard = ({
  reference,
  isVisible,
  delayClass,
  onClick,
}: {
  reference: Reference;
  isVisible: boolean;
  delayClass: string;
  onClick: () => void;
}) => {
  const t = useTranslations("references");

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${t("readMore")}: ${reference.name}`}
      className={`relative text-left w-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
        isVisible
          ? `animate-fade-in-up ${delayClass}`
          : "opacity-0 translate-y-8"
      }`}
    >
      <DecorativeQuote />
      <AuthorHeader reference={reference} />
      <blockquote className="mt-5 text-gray-700 dark:text-gray-300 text-base leading-relaxed line-clamp-3">
        &ldquo;{reference.testimonial}&rdquo;
      </blockquote>
      <span className="mt-4 inline-flex items-center text-sm font-medium text-primary-600 dark:text-primary-400">
        {t("readMore")}
        <span aria-hidden="true" className="ml-1">
          →
        </span>
      </span>
    </button>
  );
};

const ReferencesSection = () => {
  const { elementRef, hasIntersected } = useIntersectionObserver();
  const t = useTranslations("references");
  const [selected, setSelected] = useState<Reference | null>(null);

  const references: Reference[] = [
    {
      id: 1,
      name: t("testimonials.0.name"),
      role: t("testimonials.0.role"),
      testimonial: t("testimonials.0.testimonial"),
    },
    {
      id: 2,
      name: t("testimonials.1.name"),
      role: t("testimonials.1.role"),
      company: t("testimonials.1.company"),
      testimonial: t("testimonials.1.testimonial"),
    },
    {
      id: 3,
      name: t("testimonials.2.name"),
      role: t("testimonials.2.role"),
      company: t("testimonials.2.company"),
      testimonial: t("testimonials.2.testimonial"),
    },
  ];

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
          {references.map((reference, index) => (
            <ReferenceCard
              key={reference.id}
              reference={reference}
              isVisible={hasIntersected}
              delayClass={getStaggeredDelay(index)}
              onClick={() => setSelected(reference)}
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

      <Modal isOpen={selected !== null} onClose={() => setSelected(null)}>
        {selected && (
          <div className="relative">
            <DecorativeQuote />
            <AuthorHeader reference={selected} />
            <blockquote className="mt-6 text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed whitespace-pre-line">
              &ldquo;{selected.testimonial}&rdquo;
            </blockquote>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default ReferencesSection;
