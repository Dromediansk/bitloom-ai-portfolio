export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  category?: string;
  demoUrl?: string;
  codeUrl?: string;
  imageUrl?: string;
}
