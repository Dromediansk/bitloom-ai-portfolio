"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/loom/weave";
import { Testimonial, TestimonialModal } from "./testimonial";

const ROTATION_MS = 8000;

/** One quote at a time, rotating, with the full review a click away. */
const FeaturedTestimonial = () => {
  const t = useTranslations();
  const testimonials = t.raw("testimonials.items") as Testimonial[];

  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState<Testimonial | null>(null);

  const paused = hovered || selected !== null;
  const current = testimonials[index];

  useEffect(() => {
    if (paused || testimonials.length <= 1) return;
    if (prefersReducedMotion()) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), ROTATION_MS);
    return () => clearInterval(id);
  }, [paused, testimonials.length]);

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocus={() => setHovered(true)} onBlur={() => setHovered(false)}>
      <figure key={index} className="loom-quote tst-featured">
        <blockquote className="tst-clamp">&ldquo;{current.testimonial}&rdquo;</blockquote>
        <figcaption>
          <b>{current.name}</b>
          <span className="loom-soft">
            {current.role}
            {current.company ? `, ${current.company}` : ""}
          </span>
        </figcaption>
      </figure>
      <div className="tst-featured__actions">
        <button type="button" className="loom-arrow-link" onClick={() => setSelected(current)}>
          {t("testimonials.readMore")}
        </button>
        <Link href="/testimonials" className="loom-soft">
          {t("services.socialProof.seeAll")}
        </Link>
      </div>
      {testimonials.length > 1 && (
        <div className="tst-dots" role="group" aria-label={t("testimonials.title")}>
          {testimonials.map((x, i) => (
            <button
              key={x.name}
              type="button"
              aria-label={x.name}
              aria-pressed={i === index}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      )}
      <TestimonialModal testimonial={selected} onClose={() => setSelected(null)} />
    </div>
  );
};

export default FeaturedTestimonial;
