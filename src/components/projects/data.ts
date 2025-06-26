import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: 1,
    title: "AI Crew Image Content Analysis",
    description:
      "AI-powered analysis system for restaurant management interfaces using CrewAI. Leverages multiple AI agents to analyze images, suggest UI/UX improvements, and generate user stories.",
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
    title: "Next Notes - Daily Tasks",
    description:
      "Embrace the power of daily affirmations and self-reflection with the intuitive note taking app. Capture moments of inspiration, motivation, and personal development to help you become the best version of yourself.",
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
    imageUrl: "/images/projects/project_2.png",
  },
  {
    id: 3,
    title: "Portfolio with 3D graphics",
    description:
      "Showcase your work with a stunning portfolio featuring 3D graphics and animations. Built with modern web technologies to provide an immersive user experience.",
    technologies: [
      "Three.js",
      "React Three Fiber",
      "React.js",
      "Typescript",
      "Tailwind CSS",
    ],
    demoUrl: "https://r3f01-portfolio.netlify.app",
    codeUrl: "https://github.com/Dromediansk/r3f-portfolio",
    imageUrl: "/images/projects/project_3.png",
  },
];
