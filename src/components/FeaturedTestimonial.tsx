"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Testimonial, TestimonialModal } from "./testimonial";

const ROTATION_MS = 7000;

const FeaturedTestimonial = () => {
  const t = useTranslations();
  const testimonials = t.raw("references.testimonials") as Testimonial[];

  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState<Testimonial | null>(null);

  const paused = hovered || selected !== null;
  const current = testimonials[index];

  useEffect(() => {
    if (paused || testimonials.length <= 1) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, ROTATION_MS);
    return () => clearInterval(id);
  }, [paused, testimonials.length]);

  return (
    <div
      className="max-w-2xl mx-auto text-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        type="button"
        onClick={() => setSelected(current)}
        aria-label={`${t("references.readMore")}: ${current.name}`}
        className="group block w-full text-center cursor-pointer rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 px-2 py-3"
      >
        <div key={index} className={paused ? undefined : "animate-fade-cycle"}>
          <blockquote className="text-gray-600 dark:text-gray-300 italic text-lg leading-relaxed mb-3 line-clamp-2 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors">
            &ldquo;{current.testimonial}&rdquo;
          </blockquote>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              {current.name}
            </span>
            {" — "}
            {current.role}
            {current.company ? `, ${current.company}` : ""}
          </p>
        </div>
      </button>

      <Link
        href="/references"
        className="mt-3 inline-flex items-center text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
      >
        {t("services.socialProof.seeAll")}
        <span aria-hidden="true" className="ml-1">
          →
        </span>
      </Link>

      <TestimonialModal
        testimonial={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
};

export default FeaturedTestimonial;
