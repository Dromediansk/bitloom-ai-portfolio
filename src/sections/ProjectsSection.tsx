"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { getProjects, type Project } from "@/components/projects";
import PageMasthead from "@/components/loom/PageMasthead";
import PageClose from "@/components/loom/PageClose";
import { chapter, WEFT } from "@/lib/loom/chapters";
import { trackProjectView } from "@/lib/analytics";

function ProjectObject({ project, lead = false }: { project: Project; lead?: boolean }) {
  const t = useTranslations("projects");
  const home = useTranslations("home.work.labels");
  return (
    <article className={`prj-object${lead ? " prj-object--lead" : ""}`}>
      <div className="prj-object__media">
        {project.imageUrl && (
          <Image
            src={project.imageUrl}
            alt=""
            fill
            sizes={lead ? "(max-width: 860px) 100vw, 60vw" : "(max-width: 860px) 100vw, 45vw"}
          />
        )}
      </div>
      <div className="prj-object__label">
        {project.category && <p className="loom-tag">{project.category}</p>}
        <h2 className="loom-h3 prj-object__h">{project.title}</h2>
        <p className="prj-object__p">{project.description}</p>
        <dl className="prj-object__dl">
          <dt className="loom-tag">{home("fibre")}</dt>
          <dd>{project.technologies.join(", ")}</dd>
        </dl>
        <p className="prj-object__links">
          {project.demoUrl && (
            <a
              className="loom-arrow-link"
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackProjectView(project.title)}
            >
              {t("actions.viewProject")}
            </a>
          )}
          {project.codeUrl && (
            <a className="loom-arrow-link" href={project.codeUrl} target="_blank" rel="noopener noreferrer">
              {t("actions.sourceCode")}
            </a>
          )}
        </p>
      </div>
    </article>
  );
}

const ProjectsSection = () => {
  const t = useTranslations("projects");
  const nav = useTranslations("navigation");
  const [lead, ...rest] = getProjects(t);

  return (
    <>
      <PageMasthead title={t("title")} lede={t("subtitle")} chapterLabel={nav("projects")} weave="herring" />

      <section {...chapter("work", t("title"), "basket", WEFT.cobalt)} className="loom-g-paper loom-section prj-section">
        <div className="loom-wrap">
          {lead && (
            <div data-in="">
              <ProjectObject project={lead} lead />
            </div>
          )}
          <div className="prj-grid">
            {rest.map((p) => (
              <div key={p.id} data-in="">
                <ProjectObject project={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageClose heading={t("cta.title")} body={t("cta.description")} location="projects" />
    </>
  );
};

export default ProjectsSection;
