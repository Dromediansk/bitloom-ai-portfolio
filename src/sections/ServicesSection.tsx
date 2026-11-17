"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import FeaturedTestimonial from "@/components/FeaturedTestimonial";
import PageMasthead from "@/components/loom/PageMasthead";
import PageClose from "@/components/loom/PageClose";
import { chapter, type WeaveName } from "@/lib/loom/chapters";
import type { Thread } from "@/lib/loom/tokens";

const SERVICES = [
  { key: "modernWebCraft", weave: "twill", weft: "ivory", warp: "cobalt" },
  { key: "mobileMastery", weave: "basket", weft: "cobalt", warp: "frost" },
  { key: "aiDevelopment", weave: "herring", weft: "sky", warp: "navy" },
] as const satisfies readonly { key: string; weave: WeaveName; weft: Thread; warp: Thread }[];

const STEPS = ["discovery", "analysis", "development", "delivery"] as const;

const ServicesSection = () => {
  const t = useTranslations("services");
  const p = useTranslations("process");
  const nav = useTranslations("navigation");

  const facts = [
    { value: "10+", label: t("socialProof.projectsCompleted") },
    { value: "7+", label: t("socialProof.yearsExperience") },
    { value: "0", label: t("socialProof.missedDeadlines") },
  ];

  return (
    <>
      <PageMasthead title={t("title")} lede={t("subtitle")} chapterLabel={nav("services")} weave="twill">
        <p className="loom-accent svc-differentiator">
          {t("differentiator")}
        </p>
      </PageMasthead>

      {/* What Bitloom builds: a ledger of three rows, each with its own cloth */}
      <section
        {...chapter("offer", t("title"), "herring", "sky")}
        className="loom-g-navy loom-section"
      >
        <div className="loom-wrap">
          <div className="svc-rows">
            {SERVICES.map((s) => (
              <article key={s.key} className="svc-row" data-in="">
                <canvas
                  className="loom-swatch__cloth"
                  data-weave={s.weave}
                  data-weft={s.weft}
                  data-warp={s.warp}
                  aria-hidden="true"
                />
                <h2 className="loom-display svc-row__h">{t(`${s.key}.title`)}</h2>
                <div>
                  <p className="svc-row__p">{t(`${s.key}.description`)}</p>
                  <ul className="loom-list">
                    {[0, 1, 2].map((i) => (
                      <li key={i}>{t(`${s.key}.features.${i}`)}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <div className="svc-industries" data-in="">
            <p className="loom-tag">{t("industries.label")}</p>
            <ul>
              <li>{t("industries.healthcare")}</li>
              <li>{t("industries.fintech")}</li>
              <li>{t("industries.enterprise")}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Proof: plain figures and what people said */}
      <section
        {...chapter("proof", nav("testimonials"), "satin", "cobalt")}
        className="loom-g-paper loom-section"
      >
        <div className="loom-wrap loom-split">
          <div data-in="">
            <dl className="loom-facts svc-facts">
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
          <div data-in="">
            <FeaturedTestimonial />
          </div>
        </div>
      </section>

      {/* How a project runs */}
      <section
        {...chapter("process", p("title"), "basket", "pale")}
        className="loom-g-navy loom-section"
      >
        <div className="loom-wrap loom-split">
          <div data-in="">
            <h2 className="loom-display loom-h2">{p("title")}</h2>
            <p className="loom-lede loom-lede--spaced">
              {p("subtitle")}
            </p>
          </div>
          <ol className="loom-ledger svc-steps" data-in="">
            {STEPS.map((s) => (
              <li key={s}>
                <span>
                  {p(`${s}.step`)} · {p(`${s}.title`)}
                </span>
                <span>{p(`${s}.description`)}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <PageClose
        heading={t("cta.title")}
        body={t("cta.description")}
        location="services"
        secondary={
          <Link className="loom-arrow-link" href="/projects">
            {t("cta.viewOurWork")}
          </Link>
        }
      />
    </>
  );
};

export default ServicesSection;
