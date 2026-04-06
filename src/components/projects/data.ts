import type { Project } from "./types";

const projectsData = [
  {
    id: 5,
    categoryKey: "aiMl",
    technologies: [
      "Next.js",
      "TypeScript",
      "Claude AI",
      "Supabase",
      "Drizzle ORM",
      "Stripe",
    ],
    demoUrl: "https://careerstrideai.vercel.app",
  },
  {
    id: 4,
    categoryKey: "aiMl",
    technologies: [
      "TypeScript",
      "LangGraph.js",
      "LangChain",
      "Pinecone",
      "OpenAI",
      "Anthropic",
    ],
    githubRepo: "research-agent-ts",
  },
  {
    id: 1,
    categoryKey: "aiMl",
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
    categoryKey: "mobileApp",
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
    categoryKey: "webApp",
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
];

export const getProjects = (t: (key: string) => string): Project[] =>
  projectsData.map((project, index) => ({
    ...project,
    title: t(`items.${index}.title`),
    description: t(`items.${index}.description`),
    category: t(`categories.${project.categoryKey}`),
    imageUrl: `/images/projects/project_${project.id}.png`,
    codeUrl: project.githubRepo
      ? `https://github.com/Dromediansk/${project.githubRepo}`
      : undefined,
  }));
