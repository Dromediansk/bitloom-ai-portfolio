import type { Project } from "./types";

// Sample project data - replace with actual client projects
export const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform Modernization",
    description:
      "Complete redesign and modernization of a legacy e-commerce platform for a growing retail company. Implemented modern architecture, improved performance by 60%, and enhanced user experience resulting in 40% higher conversion rates.",
    technologies: ["Next.js", "TypeScript", "Stripe", "Prisma", "PostgreSQL"],
    demoUrl: "https://example.com",
    codeUrl: "https://github.com/example",
    imageUrl: "/images/project-1.jpg",
  },
  {
    id: 2,
    title: "SaaS Management Dashboard",
    description:
      "Enterprise-grade management dashboard for a B2B SaaS company. Features real-time analytics, team collaboration tools, and advanced reporting. Reduced operational overhead by 50% and improved team productivity.",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Express"],
    demoUrl: "https://example.com",
    codeUrl: "https://github.com/example",
    imageUrl: "/images/project-2.jpg",
  },
  {
    id: 3,
    title: "Healthcare Analytics Platform",
    description:
      "Comprehensive healthcare analytics platform with beautiful data visualizations and real-time monitoring capabilities. Streamlined clinical workflows and improved patient outcome tracking for healthcare providers.",
    technologies: ["Vue.js", "Chart.js", "FastAPI", "PostgreSQL", "Docker"],
    demoUrl: "https://example.com",
    codeUrl: "https://github.com/example",
    imageUrl: "/images/project-3.jpg",
  },
];
