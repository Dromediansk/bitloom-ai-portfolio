"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { siteConfig } from "@/lib/config";
import { trackCTAClick } from "@/lib/analytics";
import SiteNav from "@/components/loom/SiteNav";
import WovenLabel from "@/components/loom/WovenLabel";
import { chapter, WEFT } from "@/lib/loom/chapters";
import { startHome } from "./homeRuntime";
import "./loom.css";

const SWATCHES = [
  { weave: "herring", weft: WEFT.cobalt, warp: "#0E1A33" },
  { weave: "twill", weft: "#E8EDF5", warp: WEFT.cobalt },
  { weave: "satin", weft: WEFT.pale, warp: "#14203A" },
  { weave: "basket", weft: WEFT.cobalt, warp: "#DCE3EE" },
];

export default function LoomHome() {
  const t = useTranslations("home");
  const nav = useTranslations("navigation");
  const legal = useTranslations("footer.legalLinks");
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    return startHome(rootRef.current);
  }, []);
  const workLabels = ["for", "did", "fibre", "state"] as const;

  return (
    <div className="loom-home" ref={rootRef}>
      {/* 1 · TITLE: pinned title page, loose warp across the type bound into cloth beneath it */}
      <section
        {...chapter("title", t("chapters.title"))}
        className="loom-g-paper loom-act-title"
        data-act="pin"
        style={{ "--span": 1.6 } as React.CSSProperties}
      >
        <div className="loom-stage loom-title">
          <div className="loom-title__back" aria-hidden="true" />

          <SiteNav className="loom-title__bar" />

          <div className="loom-title__copy" data-cue="0 1 0 0">
            <h1 className="loom-title__h1">
              {t("title.line1")}
              <br />
              {t("title.line2")}
            </h1>
            <p className="loom-title__sub">{t("title.sub")}</p>
            <Link
              className="loom-btn"
              href="/contact"
              onClick={() => trackCTAClick("start_project", "home_title")}
            >
              {t("title.cta")}
            </Link>
          </div>

          <canvas className="loom-title__loom" aria-hidden="true" />
        </div>
      </section>

      {/* 2 · TENSION: hard cut to navy, read at reading pace */}
      <section
        {...chapter("problem", t("chapters.problem"), "twill", WEFT.mist)}
        className="loom-g-navy loom-act-tension"
        data-act="flow"
      >
        <div className="loom-wrap">
          <h2 className="loom-display loom-tension__h" data-cue="0.06">
            {t("problem.heading")}
          </h2>
          <div className="loom-tension__pair" data-in="">
            <div>
              <h3 className="loom-tag">{t("problem.assistantLabel")}</h3>
              <p>{t("problem.assistant")}</p>
            </div>
            <div>
              <h3 className="loom-tag">{t("problem.agentLabel")}</h3>
              <p>{t("problem.agent")}</p>
            </div>
          </div>
          <div data-in="">
            <p className="loom-tension__close">{t("problem.close")}</p>
          </div>
        </div>
      </section>

      {/* 3 · TURN (the peak): a silence of loose bits, then the cloth forms */}
      <section
        {...chapter("turn", t("chapters.turn"), "herring", WEFT.sky)}
        className="loom-g-navy loom-act-turn"
        data-act="pin"
        style={{ "--span": 4 } as React.CSSProperties}
      >
        <div className="loom-stage loom-turn">
          <canvas className="loom-turn__canvas" aria-hidden="true" />
          <div className="loom-turn__scrim" aria-hidden="true" />
          <div className="loom-turn__copy">
            <p className="loom-turn__line" data-cue="0.13 0.36">{t("turn.line1")}</p>
            <p className="loom-turn__line" data-cue="0.32 0.56">{t("turn.line2")}</p>
            <p className="loom-turn__line" data-cue="0.52 0.74">{t("turn.line3")}</p>
            <div className="loom-turn__final" data-cue="0.72 1 0.1 0">
              <h2 className="loom-display loom-turn__h">{t("turn.heading")}</h2>
              <p>{t("turn.body")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 · WORK: lateral rail of woven swatches with label facts */}
      <section
        {...chapter("work", t("chapters.work"), "basket", WEFT.bone)}
        className="loom-g-paper loom-act-work"
        data-act="pan"
        style={{ "--span": 3.4 } as React.CSSProperties}
      >
        <div className="loom-stage loom-work">
          <div className="loom-rail" data-pan="">
            <div className="loom-rail__lead">
              <h2 className="loom-display loom-work__h">{t("work.heading")}</h2>
              <p>{t("work.intro")}</p>
            </div>
            {SWATCHES.map((s, i) => (
              <article
                key={i}
                className="loom-swatch"
                style={{ "--k": i + 1 } as React.CSSProperties}
              >
                <canvas
                  className="loom-swatch__cloth"
                  data-weave={s.weave}
                  data-weft={s.weft}
                  data-warp={s.warp}
                  aria-hidden="true"
                />
                <h3>{t(`work.items.${i}.name`)}</h3>
                <dl>
                  {workLabels.map((k) => (
                    <div key={k}>
                      <dt>{t(`work.labels.${k}`)}</dt>
                      <dd>
                        {k === "state"
                          ? t.rich(`work.items.${i}.state`, {
                              link: (chunks) => (
                                <a href="https://holaespanol.sk" target="_blank" rel="noopener noreferrer">
                                  {chunks}
                                </a>
                              ),
                            })
                          : t(`work.items.${i}.${k}`)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
            <div className="loom-rail__end">
              <p>{t("work.end")}</p>
              <Link className="loom-arrow-link" href="/projects">
                {t("work.more")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5 · FOUNDER: a real person, wiped in */}
      <section
        {...chapter("founder", t("chapters.founder"), "satin", WEFT.pale)}
        className="loom-g-navy loom-act-founder"
        data-act="flow"
      >
        <div className="loom-wrap loom-split">
          <figure className="loom-portrait">
            <div data-reveal="0.08 0.4">
              <Image
                src="/images/about/avatar.png"
                width={900}
                height={1125}
                sizes="(max-width: 860px) 90vw, 38vw"
                alt={t("founder.photoAlt")}
              />
            </div>
            <figcaption className="loom-tag">{t("founder.caption")}</figcaption>
          </figure>

          <div className="loom-founder__text" data-in="">
            <h2 className="loom-display loom-founder__h">{t("founder.heading")}</h2>
            <p>{t("founder.p1")}</p>
            <p>{t("founder.p2")}</p>
            <ol className="loom-ledger loom-ledger--steps" aria-label={t("founder.processLabel")}>
              {[0, 1, 2, 3].map((i) => (
                <li key={i}>
                  <span>{t(`founder.steps.${i}.name`)}</span>
                  {t(`founder.steps.${i}.text`)}
                </li>
              ))}
            </ol>
            <p className="loom-founder__values">{t("founder.values")}</p>
            <Link className="loom-arrow-link" href="/about">
              {t("founder.more")}
            </Link>
          </div>
        </div>
      </section>

      {/* 6 · CLOSE: the visitor's cloth becomes the label. Last element on the page. */}
      <section
        {...chapter("close", t("chapters.close"))}
        className="loom-g-paper loom-act-close"
        data-act="pin"
        style={{ "--span": 1.2 } as React.CSSProperties}
      >
        <div className="loom-stage loom-close">
          <div className="loom-close__body">
            <WovenLabel
              data-cue="0 1 0 0"
              maker={t("close.maker")}
              heading={t("close.heading")}
              body={t("close.body")}
              actions={
                <Link
                  className="loom-btn"
                  href="/contact"
                  onClick={() => trackCTAClick("start_project", "home_close")}
                >
                  {t("title.cta")}
                </Link>
              }
              footnote={<a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>}
            />
            <p className="loom-close__note" data-cue="0 1 0 0">
              {t("close.note")}
            </p>
          </div>

          <footer className="loom-foot">
            <ul>
              <li>
                <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </li>
              <li>
                <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              </li>
              <li>
                <a href={siteConfig.blogUrl} target="_blank" rel="noopener noreferrer">{nav("blog")}</a>
              </li>
              <li>
                <Link href="/imprint">{legal("imprint")}</Link>
              </li>
              <li>
                <Link href="/privacy">{legal("privacy")}</Link>
              </li>
            </ul>
            <p>
              © {new Date().getFullYear()} Bitloom s.r.o. · {t("close.registration")}
            </p>
          </footer>
        </div>
      </section>
    </div>
  );
}
