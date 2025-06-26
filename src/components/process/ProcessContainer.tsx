import { memo } from "react";
import { ProcessCard } from "./ProcessCard";
import { processes } from "./data";
import { useIntersectionObserver } from "@/lib/hooks";

export const ProcessContainer = memo(() => {
  const { elementRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "50px",
  });

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-700"
    >
      <div className="text-center mb-12">
        <h2
          className={`text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-1000 ${
            hasIntersected ? "animate-fade-in-down" : "opacity-0 translate-y-8"
          }`}
        >
          Our Process
        </h2>
        <p
          className={`text-lg text-gray-600 dark:text-gray-400 transition-all duration-1000 delay-200 ${
            hasIntersected ? "animate-fade-in-up" : "opacity-0 translate-y-8"
          }`}
        >
          A proven methodology that ensures successful project delivery
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {processes.map((process, index) => (
          <ProcessCard
            key={process.id}
            process={process}
            index={index}
            isVisible={hasIntersected}
          />
        ))}
      </div>
    </div>
  );
});

ProcessContainer.displayName = "ProcessContainer";
