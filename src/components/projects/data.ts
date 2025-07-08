import type { Project } from "./types";

const projectsData = [
  {
    id: 1,
    technologies: [
      "Prompt Engineering",
      "Python",
      "Artificial Intelligence (AI)",
      "CrewAI",
      "GPT-4",
    ],
    githubRepo: "ai-crew-image-content-analysis",
  },
  {
    id: 2,
    technologies: [
      "React Native",
      "Expo",
      "Typescript",
      "Nativewind",
      "Supabase",
      "Fast API",
    ],
    githubRepo: "mindtaker-rn",
  },
  {
    id: 3,
    technologies: [
      "Next.js",
      "Typescript",
      "OAuth 2.0",
      "Prisma ORM",
      "Tailwind",
      "PostgreSQL",
    ],
    githubRepo: "next-notes",
    demoUrl: "https://next-notes-henna.vercel.app/",
  },
  {
    id: 4,
    technologies: [
      "Three.js",
      "React Three Fiber",
      "React.js",
      "Typescript",
      "Tailwind CSS",
    ],
    githubRepo: "r3f-portfolio",
    demoUrl: "https://r3f01-portfolio.netlify.app",
  },
];

export const getProjects = (t: (key: string) => string): Project[] =>
  projectsData.map((project, index) => ({
    ...project,
    title: t(`items.${index}.title`),
    description: t(`items.${index}.description`),
    imageUrl: `/images/projects/project_${index + 1}.png`,
    codeUrl: `https://github.com/Dromediansk/${project.githubRepo}`,
  }));
