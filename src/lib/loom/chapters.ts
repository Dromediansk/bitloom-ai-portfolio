// A chapter is a section that weaves its own band into the selvedge and becomes a nav link there.
export type WeaveName = "plain" | "twill" | "basket" | "herring" | "satin";

export const WEFT = {
  cobalt: "#2F6FE4",
  sky: "#6EA8FF",
  pale: "#9CC2FF",
  bone: "#E9EDF4",
  mist: "#C9D3E3",
} as const;

export const chapter = (
  id: string,
  label: string,
  weave: WeaveName = "plain",
  weft: string = WEFT.cobalt,
) => ({ id, "data-chapter": label, "data-weave": weave, "data-weft": weft });
