// A chapter is a section that weaves its own band into the selvedge and becomes a nav link there.
import type { Thread } from "./tokens";

export type WeaveName = "plain" | "twill" | "basket" | "herring" | "satin";

export const chapter = (
  id: string,
  label: string,
  weave: WeaveName = "plain",
  weft: Thread = "cobalt",
) => ({ id, "data-chapter": label, "data-weave": weave, "data-weft": weft });
