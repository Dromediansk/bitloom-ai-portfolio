"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { AuthorHeader, Testimonial, TestimonialModal, VerifiedBadge } from "@/components/testimonial";
import PageMasthead from "@/components/loom/PageMasthead";
import PageClose from "@/components/loom/PageClose";
import { chapter } from "@/lib/loom/chapters";

const TestimonialsSection = () => {
  const t = useTranslations("testimonials");
  const nav = useTranslations("navigation");
  const [selected, setSelected] = useState<Testimonial | null>(null);

  const testimonials = t.raw("items") as Testimonial[];
  const [lead, ...rest] = testimonials;

  const facts = [
    { value: "10+", label: t("stats.projectsCompleted") },
    { value: "7+", label: t("stats.yearsExperience") },
    { value: "24 h", label: t("stats.replyTime") },
  ];

  const card = (item: Testimonial, big = false) => (
    <figure className={`loom-quote tst-card${big ? " tst-card--lead" : ""}`}>
      <blockquote className={big ? "tst-clamp tst-clamp--long" : "tst-clamp"}>
        &ldquo;{item.testimonial}&rdquo;
      </blockquote>
      <AuthorHeader testimonial={item} />
      <div className="tst-card__actions">
        <button
          type="button"
          className="loom-arrow-link"
          onClick={() => setSelected(item)}
          aria-label={`${t("readMore")}: ${item.name}`}
        >
          {t("readMore")}
        </button>
        <VerifiedBadge recommendationDate={item.recommendationDate} authorName={item.name} />
      </div>
    </figure>
  );

  return (
    <>
      <PageMasthead title={t("title")} lede={t("subtitle")} chapterLabel={nav("testimonials")} weave="satin" />

      <section className="loom-g-paper loom-section tst-section">
        <div className="loom-wrap">
          {lead && <div data-in="">{card(lead, true)}</div>}
          <div className="tst-grid" data-in="">
            {rest.map((item) => (
              <div key={item.name}>{card(item)}</div>
            ))}
          </div>
        </div>
      </section>

      <section
        {...chapter("figures", t("stats.projectsCompleted"), "basket", "pale")}
        className="loom-g-navy loom-section"
      >
        <div className="loom-wrap">
          <dl className="loom-facts" data-in="">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="loom-tag">{f.label}</dt>
                <dd>
                  <strong>{f.value}</strong>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <PageClose heading={t("cta.title")} body={t("cta.description")} location="testimonials" />

      <TestimonialModal testimonial={selected} onClose={() => setSelected(null)} />
    </>
  );
};

export default TestimonialsSection;
