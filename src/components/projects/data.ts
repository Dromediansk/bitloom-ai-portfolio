import type { Project } from "./types";

export const getProjects = (t: (key: string) => string): Project[] => [
  {
    id: 1,
    title: t("items.0.title"),
    description: t("items.0.description"),
    technologies: [
      "Prompt Engineering",
      "Python",
      "Artificial Intelligence (AI)",
      "CrewAI",
      "GPT-4",
    ],
    codeUrl: "https://github.com/Dromediansk/ai-crew-image-content-analysis",
    imageUrl: "/images/projects/project_1.jpg",
  },
  {
    id: 2,
    title: t("items.1.title"),
    description: t("items.1.description"),
    technologies: [
      "React Native",
      "Expo",
      "Typescript",
      "Nativewind",
      "Supabase",
      "Fast API",
    ],
    codeUrl: "https://github.com/Dromediansk/mindtaker-rn",
    imageUrl: "/images/projects/project_2.png",
  },
  {
    id: 3,
    title: t("items.2.title"),
    description: t("items.2.description"),
    technologies: [
      "Next.js",
      "Typescript",
      "OAuth 2.0",
      "Prisma ORM",
      "Tailwind",
      "PostgreSQL",
    ],
    demoUrl: "https://next-notes-henna.vercel.app/",
    codeUrl: "https://github.com/Dromediansk/next-notes",
    imageUrl: "/images/projects/project_3.png",
  },
  {
    id: 4,
    title: t("items.3.title"),
    description: t("items.3.description"),
    technologies: [
      "Three.js",
      "React Three Fiber",
      "React.js",
      "Typescript",
      "Tailwind CSS",
    ],
    demoUrl: "https://r3f01-portfolio.netlify.app",
    codeUrl: "https://github.com/Dromediansk/r3f-portfolio",
    imageUrl: "/images/projects/project_4.png",
  },
];
