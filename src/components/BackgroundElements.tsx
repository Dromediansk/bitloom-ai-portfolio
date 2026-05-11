import { memo } from "react";

export const BackgroundElements = memo(() => {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* Woven grid base layer — "Loom" motif */}
      <div className="absolute inset-0 woven-grid woven-grid-animated" />

      {/* Gradient blob — top left */}
      <div className="absolute -top-20 -left-20 w-[450px] h-[450px] bg-primary-300/40 dark:bg-primary-500/20 rounded-full blur-[60px] bg-blob blob-drift-1" />

      {/* Gradient blob — bottom right */}
      <div className="absolute -bottom-16 -right-16 w-[380px] h-[380px] bg-primary-400/30 dark:bg-primary-400/15 rounded-full blur-[50px] bg-blob blob-drift-2" />

      {/* Gradient blob — center accent */}
      <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-primary-200/30 dark:bg-primary-600/15 rounded-full blur-[45px] bg-blob blob-drift-3" />
    </div>
  );
});

BackgroundElements.displayName = "BackgroundElements";
