import type { Project, ProjectKey, ProjectSwatch } from "./types";

type ProjectData = {
  key: ProjectKey;
  categoryKey: "aiMl" | "mobileApp" | "webApp";
  technologies: string[];
  /** The woven cloth that stands for the project on the home rail, and on the projects page when there is no screenshot. */
  swatch: ProjectSwatch;
  image?: string;
  githubRepo?: string;
  demoUrl?: string;
};

/** Every project, in the order the projects page shows them (the first is the lead). */
const projectsData: ProjectData[] = [
  {
    key: "agenticPlatform",
    categoryKey: "aiMl",
    technologies: ["TypeScript", "LangGraph", "React", "PostgreSQL"],
    swatch: { weave: "herring", weft: "cobalt", warp: "navy" },
    image: "/images/projects/project_agentic.jpg",
  },
  {
    key: "wishlist",
    categoryKey: "webApp",
    technologies: ["Next.js", "TypeScript", "Supabase", "Google OAuth"],
    swatch: { weave: "twill", weft: "ivory", warp: "cobalt" },
    image: "/images/projects/project_wishlist.png",
    demoUrl: "https://wishlist.bitloom.sk",
  },
  {
    key: "readnest",
    categoryKey: "mobileApp",
    technologies: ["React Native", "Expo", "TypeScript"],
    swatch: { weave: "satin", weft: "pale", warp: "indigo" },
    image: "/images/projects/project_readnest.jpg",
  },
  {
    key: "holaEspanol",
    categoryKey: "webApp",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "next-intl", "React", "Mailtrap"],
    swatch: { weave: "basket", weft: "cobalt", warp: "frost" },
    image: "/images/projects/project_hola_espanol.jpg",
    demoUrl: "https://holaespanol.sk",
  },
  {
    key: "researchAgent",
    categoryKey: "aiMl",
    technologies: ["TypeScript", "LangGraph.js", "LangChain", "Pinecone", "OpenAI", "Anthropic"],
    swatch: { weave: "plain", weft: "cobalt", warp: "navy" },
    image: "/images/projects/project_4.png",
    githubRepo: "research-agent-ts",
  },
];

/** The projects the home page's "work" rail shows: always a subset of the projects page. */
export const HOME_PROJECTS: ProjectKey[] = ["agenticPlatform", "wishlist", "readnest", "holaEspanol"];

const byKey = (key: ProjectKey) => {
  const project = projectsData.find((p) => p.key === key);
  if (!project) throw new Error(`Unknown project: ${key}`);
  return project;
};

export const getProjectSwatch = (key: ProjectKey): ProjectSwatch => byKey(key).swatch;
export const getProjectDemoUrl = (key: ProjectKey): string | undefined => byKey(key).demoUrl;

export const getProjects = (t: (key: string) => string): Project[] =>
  projectsData.map(({ key, categoryKey, technologies, swatch, image, githubRepo, demoUrl }) => ({
    key,
    technologies,
    swatch,
    demoUrl,
    title: t(`items.${key}.title`),
    description: t(`items.${key}.description`),
    category: t(`categories.${categoryKey}`),
    imageUrl: image,
    codeUrl: githubRepo ? `https://github.com/Dromediansk/${githubRepo}` : undefined,
  }));
