"use client";

import Image from "next/image";
import { ButtonLink, SectionTitle } from "@/components";
import { useIntersectionObserver } from "@/lib/hooks";
import { ReasonContainer, TechStack } from "@/components/about";
import { useTranslations } from "next-intl";

const CommunicationIcon = () => (
  <svg
    className="w-6 h-6 text-primary-600 dark:text-primary-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
);

const GlobeIcon = () => (
  <svg
    className="w-6 h-6 text-primary-600 dark:text-primary-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const LightbulbIcon = () => (
  <svg
    className="w-6 h-6 text-primary-600 dark:text-primary-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    />
  </svg>
);

const SectionDivider = () => (
  <div className="flex justify-center my-12">
    <div className="w-16 h-1 bg-gradient-to-r from-primary-200 to-primary-500 dark:from-primary-500 dark:to-primary-200 rounded-full"></div>
  </div>
);

const coreValueIcons = [
  <CommunicationIcon key="comm" />,
  <GlobeIcon key="globe" />,
  <LightbulbIcon key="bulb" />,
];

const coreValueKeys = [
  "transparentCommunication",
  "remoteFirstCooperation",
  "openMindedness",
] as const;

const AboutSection = () => {
  const { elementRef, hasIntersected } = useIntersectionObserver();
  const t = useTranslations("about");

  const stats = [
    { value: "6+", label: t("stats.yearsExperience") },
    { value: "10+", label: t("stats.projectsCompleted") },
    { value: "2", label: t("stats.industries") },
  ];

  return (
    <section
      ref={elementRef}
      id="about"
      className="min-h-screen section-padding"
    >
      <div className="container-max px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            title={t("title")}
            subtitle={t("subtitle")}
            animated={true}
            isVisible={hasIntersected}
          />

          {/* Company Story */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div
              className={`transition-all duration-1000 delay-300 ${
                hasIntersected
                  ? "animate-fade-in-left"
                  : "opacity-0 -translate-x-8"
              }`}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                {t("ourStory.title")}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {t("ourStory.description1")}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {t("ourStory.description2")}
              </p>
            </div>

            {/* Stats Block */}
            <div
              className={`relative transition-all duration-1000 delay-500 ${
                hasIntersected
                  ? "animate-fade-in-right"
                  : "opacity-0 translate-x-8"
              }`}
            >
              <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
                <div className="grid grid-cols-1 gap-8">
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
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="mb-20">
            <h2
              className={`text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center transition-all duration-1000 delay-300 ${
                hasIntersected
                  ? "animate-fade-in-down"
                  : "opacity-0 translate-y-8"
              }`}
            >
              {t("coreValues.title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {coreValueKeys.map((key, index) => (
                <div
                  key={key}
                  className={`bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-gray-700 group hover:-translate-y-2 ${
                    hasIntersected
                      ? "animate-fade-in-up"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    animationDelay: `${index * 150}ms`,
                  }}
                >
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 ease-out">
                    {coreValueIcons[index]}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {t(`coreValues.${key}.title`)}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t(`coreValues.${key}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <SectionDivider />

          {/* Founder Section */}
          <div className="bg-gradient-to-br from-white/70 via-white/50 to-primary-50/40 dark:from-gray-800/70 dark:via-gray-800/50 dark:to-primary-950/40 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-20 shadow-xl border border-gray-100 dark:border-gray-700">
            <div className="grid lg:grid-cols-5 gap-8 items-center">
              <div
                className={`lg:col-span-3 transition-all duration-1000 delay-600 ${
                  hasIntersected
                    ? "animate-fade-in-left"
                    : "opacity-0 -translate-x-8"
                }`}
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {t("founder.title")}
                </h2>
                <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-4">
                  {t("founder.name")}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {t("founder.location")}
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {t("founder.description1")}
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {t("founder.description2")}
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t("founder.description3")}
                </p>
              </div>
              <div
                className={`lg:col-span-2 flex justify-center transition-all duration-1000 delay-700 ${
                  hasIntersected
                    ? "animate-fade-in-right"
                    : "opacity-0 translate-x-8"
                }`}
              >
                <div className="w-64 h-64 rounded-full overflow-hidden shadow-2xl ring-4 ring-primary-200 dark:ring-primary-800">
                  <Image
                    src="/images/about/avatar.png"
                    alt="Miroslav - Founder of Bitloom"
                    width={256}
                    height={256}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          <SectionDivider />

          {/* Technical Expertise */}
          <TechStack />

          <SectionDivider />

          {/* Why Choose Bitloom */}
          <ReasonContainer />

          {/* CTA */}
          <div
            className={`text-center mt-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 transition-all duration-1000 delay-1400 ${
              hasIntersected ? "animate-fade-in-up" : "opacity-0 translate-y-8"
            }`}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t("ctaSection.title")}
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              {t("ctaSection.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonLink
                href="/contact"
                variant="primary"
                size="lg"
                className="transform hover:scale-105 hover:shadow-lg transition-all duration-300"
              >
                {t("ctaSection.startProject")}
              </ButtonLink>
              <ButtonLink
                href="/services"
                variant="secondary"
                size="lg"
                className="transform hover:scale-105 hover:shadow-lg transition-all duration-300"
              >
                {t("ctaSection.viewServices")}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
