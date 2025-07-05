"use client";

import { useIntersectionObserver } from "@/lib/hooks";
import { useTranslations } from "next-intl";
import SocialLinks from "../SocialLinks";

const ContactInfo = () => {
  const { hasIntersected, elementRef } = useIntersectionObserver();
  const t = useTranslations("contact");

  return (
    <div
      className={`space-y-8 py-8 transition-all duration-1000 ${
        hasIntersected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      ref={elementRef as React.RefObject<HTMLDivElement>}
    >
      <div
        className={`transition-all duration-700 delay-200 ${
          hasIntersected
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
        }`}
      >
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          {t("info.title")}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
          {t("info.description")}
        </p>
      </div>

      {/* Contact Methods */}
      <div
        className={`space-y-6 transition-all duration-700 delay-400 ${
          hasIntersected
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
        }`}
      >
        <div
          className={`flex items-start space-x-4 transition-all duration-500 delay-500 ${
            hasIntersected
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-4"
          }`}
        >
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
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
                d="M3 8l7.89 4.26c.3.16.67.16.97 0L20 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {t("methods.email.title")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t("methods.email.value")}
            </p>
          </div>
        </div>

        <div
          className={`flex items-start space-x-4 transition-all duration-500 delay-600 ${
            hasIntersected
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-4"
          }`}
        >
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
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
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {t("methods.location.title")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t("methods.location.value")}
            </p>
          </div>
        </div>

        <div
          className={`flex items-start space-x-4 transition-all duration-500 delay-700 ${
            hasIntersected
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-4"
          }`}
        >
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {t("methods.responseTime.title")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t("methods.responseTime.value")}
            </p>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div
        className={`transition-all duration-700 delay-800 ${
          hasIntersected
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
        }`}
      >
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
          {t("social.title")}
        </h3>
        <SocialLinks
          iconSize="lg"
          showLabels={false}
          className="justify-start"
        />
      </div>
    </div>
  );
};

export default ContactInfo;
