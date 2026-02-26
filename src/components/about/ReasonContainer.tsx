import { useIntersectionObserver } from "@/lib/hooks";
import { getStaggeredDelay } from "@/lib/utils";
import { useTranslations } from "next-intl";
import React from "react";

const ProductIcon = () => (
  <svg
    className="w-6 h-6 text-primary-600 dark:text-primary-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
    />
  </svg>
);

const ShieldIcon = () => (
  <svg
    className="w-6 h-6 text-primary-600 dark:text-primary-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
);

const GrowthIcon = () => (
  <svg
    className="w-6 h-6 text-primary-600 dark:text-primary-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
    />
  </svg>
);

const reasonIcons = [
  <ProductIcon key="product" />,
  <ShieldIcon key="shield" />,
  <GrowthIcon key="growth" />,
];

export const ReasonContainer = () => {
  const { elementRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "50px",
  });
  const t = useTranslations("about.whyChoose");

  const reasons = [
    {
      id: 1,
      title: t("productMindset.title"),
      description: t("productMindset.description"),
    },
    {
      id: 2,
      title: t("qualityFocus.title"),
      description: t("qualityFocus.description"),
    },
    {
      id: 3,
      title: t("growthPartnership.title"),
      description: t("growthPartnership.description"),
    },
  ];

  return (
    <div
      className="text-center mt-20"
      ref={elementRef as React.RefObject<HTMLDivElement>}
    >
      <h2
        className={`text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 transition-all duration-500 delay-200 ${
          hasIntersected ? "animate-fade-in-down" : "opacity-0 translate-y-8"
        }`}
      >
        {t("title")}
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {reasons.map((reason, index) => {
          const delayClass = getStaggeredDelay(index);
          return (
            <div
              key={reason.id}
              className={`bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg transition-all duration-1000 hover:shadow-xl hover:-translate-y-2 border border-gray-100 dark:border-gray-700 group ${delayClass} ${
                hasIntersected
                  ? "animate-fade-in-up"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-all duration-300 ease-out">
                {reasonIcons[index]}
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {reason.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                {reason.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
ReasonContainer.displayName = "ReasonContainer";
