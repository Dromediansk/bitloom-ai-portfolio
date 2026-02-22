import { memo } from "react";
import { useIntersectionObserver } from "@/lib/hooks";
import { useTranslations } from "next-intl";
import { getStaggeredDelay } from "@/lib/utils";

const DiscoveryIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const AnalysisIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>
);

const DevelopmentIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
    />
  </svg>
);

const DeliveryIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
    />
  </svg>
);

const processIcons = [
  <DiscoveryIcon key="discovery" />,
  <AnalysisIcon key="analysis" />,
  <DevelopmentIcon key="development" />,
  <DeliveryIcon key="delivery" />,
];

export const ProcessContainer = memo(() => {
  const { elementRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "50px",
  });
  const t = useTranslations("process");

  const processes = [
    {
      id: "1",
      step: t("discovery.step"),
      title: t("discovery.title"),
      description: t("discovery.description"),
    },
    {
      id: "2",
      step: t("analysis.step"),
      title: t("analysis.title"),
      description: t("analysis.description"),
    },
    {
      id: "3",
      step: t("development.step"),
      title: t("development.title"),
      description: t("development.description"),
    },
    {
      id: "4",
      step: t("delivery.step"),
      title: t("delivery.title"),
      description: t("delivery.description"),
    },
  ];

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className="bg-gradient-to-br from-white/70 via-white/50 to-primary-50/40 dark:from-gray-800/70 dark:via-gray-800/50 dark:to-primary-950/40 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-700"
    >
      <div className="text-center mb-12">
        <h3
          className={`text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-1000 ${
            hasIntersected ? "animate-fade-in-down" : "opacity-0 translate-y-8"
          }`}
        >
          {t("title")}
        </h3>
        <p
          className={`text-lg text-gray-600 dark:text-gray-400 transition-all duration-1000 delay-200 ${
            hasIntersected ? "animate-fade-in-up" : "opacity-0 translate-y-8"
          }`}
        >
          {t("subtitle")}
        </p>
      </div>

      {/* Desktop layout with horizontal connector */}
      <div className="hidden lg:block">
        <div className="relative">
          {/* Horizontal connector line behind circles */}
          <div
            className={`absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary-200 via-primary-300 to-primary-200 dark:from-primary-800 dark:via-primary-600 dark:to-primary-800 transition-all duration-1000 delay-300 ${
              hasIntersected ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
          />

          <div className="grid grid-cols-4 gap-6">
            {processes.map((process, index) => {
              const delayClass = getStaggeredDelay(index);
              return (
                <div
                  key={process.id}
                  className={`text-center group transition-all duration-1000 ${delayClass} ${
                    hasIntersected
                      ? "animate-fade-in-up"
                      : "opacity-0 translate-y-8"
                  }`}
                >
                  {/* Step circle with icon */}
                  <div className="relative z-10 inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-full mb-4 group-hover:scale-110 group-hover:bg-primary-600 group-hover:text-white dark:group-hover:bg-primary-500 transition-all duration-300 shadow-sm">
                    {processIcons[index]}
                  </div>
                  <div className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-1">
                    {process.step}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {process.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                    {process.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile/Tablet vertical timeline */}
      <div className="lg:hidden">
        <div className="relative">
          {processes.map((process, index) => {
            const delayClass = getStaggeredDelay(index);
            const isLast = index === processes.length - 1;
            return (
              <div
                key={process.id}
                className={`relative flex items-start gap-5 sm:gap-6 ${!isLast ? "pb-10" : ""} transition-all duration-1000 ${delayClass} ${
                  hasIntersected
                    ? "animate-fade-in-up"
                    : "opacity-0 translate-y-8"
                }`}
              >
                {/* Vertical connector line */}
                {!isLast && (
                  <div className="absolute left-[1.625rem] sm:left-[1.75rem] top-14 bottom-0 w-0.5 bg-gradient-to-b from-primary-300 to-primary-100 dark:from-primary-700 dark:to-primary-900" />
                )}

                {/* Step circle with icon */}
                <div className="relative z-10 flex-shrink-0 w-[3.25rem] h-[3.25rem] sm:w-14 sm:h-14 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center shadow-sm">
                  {processIcons[index]}
                </div>

                {/* Content */}
                <div className="pt-0.5 flex-1 min-w-0">
                  <div className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-1">
                    {process.step}
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {process.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {process.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

ProcessContainer.displayName = "ProcessContainer";
