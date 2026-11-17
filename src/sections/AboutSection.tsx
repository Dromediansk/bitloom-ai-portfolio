"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import PageMasthead from "@/components/loom/PageMasthead";
import PageClose from "@/components/loom/PageClose";
import { chapter } from "@/lib/loom/chapters";

const VALUES = ["transparentCommunication", "remoteFirstCooperation", "openMindedness"] as const;
const REASONS = ["productMindset", "qualityFocus", "growthPartnership"] as const;
const TECH = [
  { name: "LangGraph", key: "langgraph" },
  { name: "Claude SDK", key: "claude" },
  { name: "MCP", key: "mcp" },
  { name: "React + React Native", key: "reactjs" },
  { name: "Next.js", key: "nextjs" },
  { name: "Expo", key: "expo" },
  { name: "TypeScript", key: "typescript" },
  { name: "Python", key: "python" },
] as const;

const AboutSection = () => {
  const t = useTranslations("about");
  const nav = useTranslations("navigation");

  const facts = [
    { value: "7+", label: t("stats.yearsExperience") },
    { value: "10+", label: t("stats.projectsCompleted") },
    { value: "1", label: t("stats.pointOfContact") },
  ];

  return (
    <>
      <PageMasthead title={t("title")} lede={t("subtitle")} chapterLabel={nav("about")} weave="basket" />

      {/* Story */}
      <section {...chapter("story", t("ourStory.title"), "plain", "cobalt")} className="loom-g-paper loom-section abt-story">
        <div className="loom-wrap loom-split">
          <div data-in="">
            <h2 className="loom-display loom-h2">{t("ourStory.title")}</h2>
            <dl className="loom-facts abt-facts">
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
          <div className="loom-body abt-lead" data-in="">
            <p>{t("ourStory.description1")}</p>
            <p>{t("ourStory.description2")}</p>
            <p>{t("ourStory.description3")}</p>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section {...chapter("founder", t("founder.title"), "satin", "pale")} className="loom-g-navy loom-section" data-act="flow">
        <div className="loom-wrap loom-split">
          <figure className="loom-portrait">
            <div data-reveal="0.06 0.36">
              <Image
                src="/images/about/avatar.png"
                width={900}
                height={1125}
                sizes="(max-width: 860px) 90vw, 36vw"
                alt={t("founder.name")}
              />
            </div>
            <figcaption className="loom-tag">{t("founder.location")}</figcaption>
          </figure>

          <div data-in="" className="abt-founder__text">
            <p className="loom-tag">{t("founder.title")}</p>
            <h2 className="loom-display loom-h2">{t("founder.name")}</h2>
            <div className="loom-body">
              <p>{t("founder.description1")}</p>
              <p>{t("founder.description2")}</p>
              <p>{t("founder.description3")}</p>
            </div>
            <dl className="loom-ledger loom-ledger--quiet">
              <div>
                <dt>{t("founder.highlights.experienceLabel")}</dt>
                <dd>{t("founder.highlights.experienceValue")}</dd>
              </div>
              <div>
                <dt>{t("founder.highlights.educationLabel")}</dt>
                <dd>
                  {t("founder.highlights.education1")}
                  <br />
                  {t("founder.highlights.education2")}
                </dd>
              </div>
              <div>
                <dt>{t("founder.highlights.cooperationsLabel")}</dt>
                <dd>{t("founder.highlights.cooperations")}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Values */}
      <section {...chapter("values", t("coreValues.title"), "twill", "cobalt")} className="loom-g-paper loom-section">
        <div className="loom-wrap loom-split">
          <h2 className="loom-display loom-h2" data-in="">
            <span>{t("coreValues.title")}</span>
          </h2>
          <ul className="abt-points" data-in="">
            {VALUES.map((k) => (
              <li key={k}>
                <h3 className="loom-h3">{t(`coreValues.${k}.title`)}</h3>
                <p className="loom-soft">{t(`coreValues.${k}.description`)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Tools */}
      <section {...chapter("stack", t("techStack.title"), "herring", "sky")} className="loom-g-navy loom-section">
        <div className="loom-wrap loom-split">
          <div data-in="">
            <h2 className="loom-display loom-h2">{t("techStack.title")}</h2>
            <p className="loom-lede loom-lede--spaced">
              {t("techStack.description")}
            </p>
          </div>
          <dl className="loom-ledger loom-ledger--terms abt-stack" data-in="">
            {TECH.map((x) => (
              <div key={x.key}>
                <dt>{x.name}</dt>
                <dd>{t(`techStack.technologies.${x.key}`)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Why Bitloom */}
      <section {...chapter("why", t("whyChoose.title"), "basket", "cobalt")} className="loom-g-paper loom-section">
        <div className="loom-wrap loom-split">
          <h2 className="loom-display loom-h2" data-in="">
            <span>{t("whyChoose.title")}</span>
          </h2>
          <ul className="abt-points" data-in="">
            {REASONS.map((k) => (
              <li key={k}>
                <h3 className="loom-h3">{t(`whyChoose.${k}.title`)}</h3>
                <p className="loom-soft">{t(`whyChoose.${k}.description`)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PageClose
        heading={t("ctaSection.title")}
        body={t("ctaSection.description")}
        location="about"
        secondary={
          <Link className="loom-arrow-link" href="/services">
            {t("ctaSection.viewServices")}
          </Link>
        }
      />
    </>
  );
};

export default AboutSection;
