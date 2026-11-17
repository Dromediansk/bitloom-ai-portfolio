"use client";

import { useTranslations } from "next-intl";

const LINKEDIN_RECOMMENDATIONS_URL =
  "https://www.linkedin.com/in/miroslavpillar/details/recommendations/";

interface Props {
  recommendationDate: string;
  authorName: string;
}

const VerifiedBadge = ({ recommendationDate, authorName }: Props) => {
  const t = useTranslations("testimonials.ui");

  return (
    <a
      href={LINKEDIN_RECOMMENDATIONS_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${t("verifiedBadge")}: ${authorName}`}
      className="loom-tag tst-verified"
    >
      {t("verifiedBadge")}
      {recommendationDate ? ` · ${recommendationDate}` : ""}
    </a>
  );
};

export default VerifiedBadge;
