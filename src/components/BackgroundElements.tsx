import { memo } from "react";

export const BackgroundElements = memo(() => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 border border-primary-200 dark:border-primary-800 rounded-full floating-particle opacity-20"></div>
      <div
        className="absolute top-40 right-20 w-16 h-16 bg-purple-200 dark:bg-purple-800 rounded-lg floating-particle opacity-20"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute bottom-40 left-20 w-12 h-12 border-2 border-pink-200 dark:border-pink-800 rotate-45 floating-particle opacity-20"
        style={{ animationDelay: "4s" }}
      ></div>
      <div
        className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-full floating-particle opacity-20"
        style={{ animationDelay: "1s" }}
      ></div>
    </div>
  );
});

BackgroundElements.displayName = "BackgroundElements";
