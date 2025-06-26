import { memo } from "react";
import type { Process } from "./data";
import { getStaggeredDelay } from "@/lib/utils";

interface ProcessCardProps {
  process: Process;
  index: number;
  isVisible: boolean;
}

export const ProcessCard = memo(
  ({ process, index, isVisible }: ProcessCardProps) => {
    const delayClass = getStaggeredDelay(index);

    return (
      <div
        className={`text-center group transition-all duration-1000 ${delayClass} ${
          isVisible ? `animate-fade-in-up ` : "opacity-0 translate-y-8"
        }`}
      >
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-full text-2xl font-bold mb-4 group-hover:scale-110 group-hover:bg-primary-600 group-hover:text-white dark:group-hover:bg-primary-500 transition-all duration-300">
          {process.step}
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {process.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          {process.description}
        </p>
      </div>
    );
  }
);

ProcessCard.displayName = "ProcessCard";
