"use client";

import { useTranslations } from "next-intl";
import { Testimonial } from "./types";

const AuthorHeader = ({ testimonial }: { testimonial: Testimonial }) => {
  const t = useTranslations("testimonials");
  return (
    <div className="min-w-0">
      <div className="font-semibold text-gray-900 dark:text-white truncate">
        {testimonial.name}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {testimonial.role}
        {testimonial.company ? ` ${t("at")} ${testimonial.company}` : ""}
      </div>
    </div>
  );
};

export default AuthorHeader;
