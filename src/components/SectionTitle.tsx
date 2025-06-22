import { memo } from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  showGradientLine?: boolean;
  animated?: boolean;
  isVisible?: boolean;
}

export const SectionTitle = memo<SectionTitleProps>(
  ({
    title,
    subtitle,
    className = "",
    showGradientLine = true,
    animated = false,
    isVisible = true,
  }) => {
    const titleClasses = animated
      ? `text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 transition-all duration-1000 ${
          isVisible ? "animate-fade-in-down" : "opacity-0 translate-y-8"
        }`
      : "text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4";

    const subtitleClasses = animated
      ? `text-xl md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed transition-all duration-1000 delay-200 ${
          isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
        }`
      : "text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed";

    const containerClasses = animated
      ? `text-center max-w-4xl mx-auto mb-16 ${className}`
      : `text-center mb-16 ${className}`;

    return (
      <div className={containerClasses}>
        <h1 className={titleClasses}>{title}</h1>
        {showGradientLine && (
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mb-6 rounded-full"></div>
        )}
        {subtitle && <p className={subtitleClasses}>{subtitle}</p>}
      </div>
    );
  }
);

SectionTitle.displayName = "SectionTitle";
