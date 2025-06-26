import { useIntersectionObserver } from "@/lib/hooks";
import { getStaggeredDelay } from "@/lib/utils";
import React from "react";

const reasons = [
  {
    id: 1,
    title: "Product Mindset",
    description:
      "We think like product owners, ensuring every feature adds real value to your business.",
  },
  {
    id: 2,
    title: "Quality Focus",
    description:
      "Rigorous testing and code review processes ensure reliable, maintainable solutions.",
  },
  {
    id: 3,
    title: "Growth Partnership",
    description:
      "We&apos;re invested in your success and provide ongoing support as you scale.",
  },
];

export const ReasonContainer = () => {
  const { elementRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "50px",
  });

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
        Why Choose Bitloom?
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {reasons.map((reason, index) => {
          const delayClass = getStaggeredDelay(index);
          return (
            <div
              key={reason.id}
              className={`bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg transition-all duration-1000 hover:shadow-xl hover:-translate-y-2 ${delayClass} ${
                hasIntersected
                  ? "animate-fade-in-up"
                  : "opacity-0 translate-y-8"
              }`}
            >
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
