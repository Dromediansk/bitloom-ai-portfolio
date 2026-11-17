"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, routing, usePathname, useRouter } from "@/i18n/routing";
import { siteConfig } from "@/lib/config";
import { trackCTAClick } from "@/lib/analytics";
import { startLoom } from "./loomRuntime";
import "./loom.css";

type Chapter = {
  id: "title" | "problem" | "turn" | "work" | "founder" | "close";
  weave: string;
  weft: string;
};

// Each chapter weaves its own band into the selvedge.
const CHAPTERS: Chapter[] = [
  { id: "title", weave: "plain", weft: "#2F6FE4" },
  { id: "problem", weave: "twill", weft: "#C9D3E3" },
  { id: "turn", weave: "herring", weft: "#6EA8FF" },
  { id: "work", weave: "basket", weft: "#E9EDF4" },
  { id: "founder", weave: "satin", weft: "#9CC2FF" },
  { id: "close", weave: "plain", weft: "#2F6FE4" },
];
const chapterProps = (id: Chapter["id"], label: string) => {
  const c = CHAPTERS.find((x) => x.id === id)!;
  return { id, "data-chapter": label, "data-weave": c.weave, "data-weft": c.weft };
};

const SWATCHES = [
  { weave: "herring", weft: "#2F6FE4", warp: "#0E1A33" },
  { weave: "twill", weft: "#E8EDF5", warp: "#2F6FE4" },
  { weave: "satin", weft: "#9CC2FF", warp: "#14203A" },
  { weave: "basket", weft: "#2F6FE4", warp: "#DCE3EE" },
];

const FRONT_THREADS = [7, 19, 31, 44, 57, 70, 83, 94];

function LocaleSwitch({ label }: { label: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="loom-locale" role="group" aria-label={label}>
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          lang={loc}
          aria-pressed={locale === loc}
          onClick={() => router.replace(pathname, { locale: loc, scroll: false })}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default function LoomHome() {
  const t = useTranslations("home");
  const nav = useTranslations("navigation");
  const legal = useTranslations("footer.legalLinks");
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    return startLoom(rootRef.current);
  }, []);

  const pages = [
    { href: "/services", label: nav("services") },
    { href: "/projects", label: nav("projects") },
    { href: "/about", label: nav("about") },
    { href: "/testimonials", label: nav("testimonials") },
    { href: "/contact", label: nav("contact") },
  ];
  const workLabels = ["for", "did", "fibre", "state"] as const;

  return (
    <div className="loom" ref={rootRef}>
      {/* THE SELVEDGE: the visitor's scroll weaves this strip. It is also the chapter nav. */}
      <nav className="loom-selvedge" aria-label={t("chaptersLabel")}>
        <canvas className="loom-selvedge__cloth" aria-hidden="true" />
        <ol className="loom-selvedge__bands">
          {CHAPTERS.map((c) => (
            <li key={c.id}>
              <a href={`#${c.id}`} aria-label={t(`chapters.${c.id}`)}>
                <span aria-hidden="true">{t(`chapters.${c.id}`)}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="loom-grain" aria-hidden="true" />

      {/* 1 · TITLE: pinned title page, warp threads in front of and behind the type */}
      <section
        {...chapterProps("title", t("chapters.title"))}
        className="loom-g-paper loom-act-title"
        data-act="pin"
        style={{ "--span": 1.6 } as React.CSSProperties}
      >
        <div className="loom-stage loom-title">
          <div className="loom-title__back" aria-hidden="true" />
          <div className="loom-title__weft" aria-hidden="true" />

          <header className="loom-title__bar">
            <p className="loom-mark">
              <Image src="/icon.svg" width={32} height={32} alt="" priority />
              <span>Bitloom</span>
            </p>
            <nav className="loom-pages" aria-label={t("pagesLabel")}>
              <ul>
                {pages.map((p) => (
                  <li key={p.href}>
                    <Link href={p.href}>{p.label}</Link>
                  </li>
                ))}
                <li>
                  <a href="https://blog.bitloom.sk" target="_blank" rel="noopener noreferrer">
                    {nav("blog")}
                  </a>
                </li>
              </ul>
              <LocaleSwitch label={t("language")} />
            </nav>
          </header>

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

          <div className="loom-title__front" aria-hidden="true">
            {FRONT_THREADS.map((x) => (
              <i key={x} data-x={x} style={{ left: `${x}%` }} />
            ))}
          </div>
        </div>
      </section>

      {/* 2 · TENSION: hard cut to navy, read at reading pace */}
      <section
        {...chapterProps("problem", t("chapters.problem"))}
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
        {...chapterProps("turn", t("chapters.turn"))}
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
        {...chapterProps("work", t("chapters.work"))}
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
        {...chapterProps("founder", t("chapters.founder"))}
        className="loom-g-navy loom-act-founder"
        data-act="flow"
      >
        <div className="loom-wrap loom-founder">
          <figure className="loom-founder__photo">
            <div data-reveal="0.08 0.4">
              <Image
                src="/images/about/avatar.png"
                width={900}
                height={1125}
                sizes="(max-width: 860px) 90vw, 38vw"
                alt={t("founder.photoAlt")}
              />
            </div>
            <figcaption>{t("founder.caption")}</figcaption>
          </figure>

          <div className="loom-founder__text" data-in="">
            <h2 className="loom-display loom-founder__h">{t("founder.heading")}</h2>
            <p>{t("founder.p1")}</p>
            <p>{t("founder.p2")}</p>
            <ol className="loom-ledger" aria-label={t("founder.processLabel")}>
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
        {...chapterProps("close", t("chapters.close"))}
        className="loom-g-paper loom-act-close"
        data-act="pin"
        style={{ "--span": 1.2 } as React.CSSProperties}
      >
        <div className="loom-stage loom-close">
          <div className="loom-close__body">
            <div className="loom-label" data-cue="0 1 0 0">
              <canvas className="loom-label__cloth" aria-hidden="true" />
              <div className="loom-label__text">
                <p className="loom-label__maker">{t("close.maker")}</p>
                <h2 className="loom-display loom-label__h">{t("close.heading")}</h2>
                <p className="loom-label__body">{t("close.body")}</p>
                <Link
                  className="loom-btn"
                  href="/contact"
                  onClick={() => trackCTAClick("start_project", "home_close")}
                >
                  {t("title.cta")}
                </Link>
                <p className="loom-label__mail">
                  <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
                </p>
              </div>
            </div>
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
                <a href="https://blog.bitloom.sk" target="_blank" rel="noopener noreferrer">{nav("blog")}</a>
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
