import type { WeaveName } from "@/lib/loom/chapters";
import type { Thread } from "@/lib/loom/tokens";

export type ProjectKey = "agenticPlatform" | "wishlist" | "readnest" | "holaEspanol" | "researchAgent";

export interface ProjectSwatch {
  weave: WeaveName;
  weft: Thread;
  warp: Thread;
}

export interface Project {
  key: ProjectKey;
  title: string;
  description: string;
  technologies: string[];
  swatch: ProjectSwatch;
  category?: string;
  demoUrl?: string;
  codeUrl?: string;
  imageUrl?: string;
}
