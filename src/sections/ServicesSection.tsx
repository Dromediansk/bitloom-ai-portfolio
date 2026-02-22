"use client";

import { ButtonLink, SectionTitle } from "@/components";
import { useIntersectionObserver } from "@/lib/hooks";
import { ProcessContainer } from "@/components/process";
import { getStaggeredDelay } from "@/lib/utils";
import { useTranslations } from "next-intl";

const WebIcon = () => (
  <svg
    className="w-8 h-8 text-primary-600 dark:text-primary-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
    />
  </svg>
);

const MobileIcon = () => (
  <svg
    className="w-8 h-8 text-primary-600 dark:text-primary-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
    />
  </svg>
);

const ConsultingIcon = () => (
  <svg
    className="w-8 h-8 text-primary-600 dark:text-primary-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    />
  </svg>
);

const HealthcareIcon = () => (
  <svg
    className="w-5 h-5 text-primary-600 dark:text-primary-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);

const FintechIcon = () => (
  <svg
    className="w-5 h-5 text-primary-600 dark:text-primary-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const EnterpriseIcon = () => (
  <svg
    className="w-5 h-5 text-primary-600 dark:text-primary-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    />
  </svg>
);

const serviceIcons = {
  "modern-web-craft": <WebIcon />,
  "mobile-mastery": <MobileIcon />,
  "technical-consulting": <ConsultingIcon />,
};

const ServicesSection = () => {
  const { elementRef, hasIntersected } = useIntersectionObserver();
  const t = useTranslations("services");

  const services = [
    {
      id: "modern-web-craft" as const,
      title: t("modernWebCraft.title"),
      description: t("modernWebCraft.description"),
      features: [
        t("modernWebCraft.features.0"),
        t("modernWebCraft.features.1"),
        t("modernWebCraft.features.2"),
      ],
      ctaLabel: t("modernWebCraft.cta"),
      exampleHref: "/projects",
    },
    {
      id: "mobile-mastery" as const,
      title: t("mobileMastery.title"),
      description: t("mobileMastery.description"),
      features: [
        t("mobileMastery.features.0"),
        t("mobileMastery.features.1"),
        t("mobileMastery.features.2"),
      ],
      ctaLabel: t("mobileMastery.cta"),
      exampleHref: "/projects",
    },
    {
      id: "technical-consulting" as const,
      title: t("technicalConsulting.title"),
      description: t("technicalConsulting.description"),
      features: [
        t("technicalConsulting.features.0"),
        t("technicalConsulting.features.1"),
        t("technicalConsulting.features.2"),
      ],
      ctaLabel: t("technicalConsulting.cta"),
      exampleHref: "/references",
    },
  ];

  const stats = [
    { value: "10+", label: t("socialProof.projectsCompleted") },
    { value: "6+", label: t("socialProof.yearsExperience") },
    { value: "0", label: t("socialProof.missedDeadlines") },
  ];

  const industries = [
    { icon: <HealthcareIcon />, label: t("industries.healthcare") },
    { icon: <FintechIcon />, label: t("industries.fintech") },
    { icon: <EnterpriseIcon />, label: t("industries.enterprise") },
  ];

  return (
    <section
      ref={elementRef}
      id="services"
      className="min-h-screen section-padding"
    >
      <div className="container-max sm:px-6 lg:px-8">
        {/* Header */}
        <SectionTitle
          title={t("title")}
          subtitle={t("subtitle")}
          animated={true}
          isVisible={hasIntersected}
        />

        {/* Differentiator */}
        <p
          className={`text-center text-sm font-medium text-primary-600 dark:text-primary-400 -mt-10 mb-8 transition-all duration-1000 delay-300 ${
            hasIntersected ? "animate-fade-in-up" : "opacity-0 translate-y-8"
          }`}
        >
          {t("differentiator")}
        </p>

        {/* Industry Badges */}
        <div
          className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-500 ${
            hasIntersected ? "animate-fade-in-up" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-sm text-gray-500 dark:text-gray-400 w-full text-center mb-1">
            {t("industries.label")}
          </span>
          {industries.map((industry, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-100 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300"
            >
              {industry.icon}
              {industry.label}
            </div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-20">
          {services.map((service, index) => {
            const delayClass = getStaggeredDelay(index);
            return (
              <div
                key={service.id}
                className={`bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-gray-700 group hover:-translate-y-2 flex flex-col ${delayClass} ${
                  hasIntersected
                    ? "animate-fade-in-up"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-all duration-300 ease-out">
                    {serviceIcons[service.id]}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-gray-700 dark:text-gray-300"
                    >
                      <span className="text-primary-500 mr-2">&#10003;</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                  <ButtonLink
                    href="/contact"
                    variant="secondary"
                    size="sm"
                    className="w-full justify-center"
                  >
                    {service.ctaLabel}
                  </ButtonLink>
                </div>
              </div>
            );
          })}
        </div>

        {/* Social Proof Strip */}
        <div
          className={`mb-20 transition-all duration-1000 delay-700 ${
            hasIntersected ? "animate-fade-in-up" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mb-8 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Featured Testimonial */}
          <div className="max-w-2xl mx-auto text-center">
            <blockquote className="text-gray-600 dark:text-gray-300 italic text-lg leading-relaxed mb-3">
              &ldquo;{t("socialProof.featuredQuote")}&rdquo;
            </blockquote>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold text-gray-700 dark:text-gray-200">
                {t("socialProof.featuredAuthor")}
              </span>
              {" — "}
              {t("socialProof.featuredRole")},{" "}
              {t("socialProof.featuredCompany")}
            </p>
          </div>
        </div>

        {/* Process Section */}
        <ProcessContainer />

        {/* CTA Section */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-1000 ${
            hasIntersected ? "animate-fade-in-up" : "opacity-0 translate-y-8"
          }`}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t("cta.title")}
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            {t("cta.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ButtonLink
              href="/contact"
              variant="primary"
              size="lg"
              className="transform hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              {t("cta.contactUs")}
            </ButtonLink>
            <ButtonLink
              href="/projects"
              variant="secondary"
              size="lg"
              className="transform hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              {t("cta.viewOurWork")}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
