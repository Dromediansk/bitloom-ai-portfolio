/**
 * Generates a styled project banner image for the portfolio.
 *
 * Usage:
 *   node scripts/generate-project-banner.mjs \
 *     --tagline "Orchestrating AI agents to unlock research insights" \
 *     --category "AI / ML" \
 *     --output "public/images/projects/project_5.png"
 */

import fs from "fs";
import path from "path";
import os from "os";
import { execFileSync } from "child_process";

function parseArgs() {
  const args = process.argv.slice(2);
  const parsed = {};
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace(/^--/, "");
    parsed[key] = args[i + 1];
  }
  return parsed;
}

const CATEGORY_THEMES = {
  "AI / ML": {
    gradient: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
    accent: "#a78bfa",
    icon: `<svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"/></svg>`,
  },
  "Mobile App": {
    gradient: "linear-gradient(135deg, #0c1220 0%, #1a1a4e 50%, #2d1b69 100%)",
    accent: "#818cf8",
    icon: `<svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"/></svg>`,
  },
  "Web App": {
    gradient: "linear-gradient(135deg, #0a1628 0%, #1e3a5f 50%, #0d2137 100%)",
    accent: "#38bdf8",
    icon: `<svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"/></svg>`,
  },
  "3D / Creative": {
    gradient: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
    accent: "#f472b6",
    icon: `<svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"/></svg>`,
  },
};

function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getTheme(category) {
  return CATEGORY_THEMES[category] || CATEGORY_THEMES["Web App"];
}

function generateHTML({ tagline, category }) {
  const theme = getTheme(category);

  return `<!DOCTYPE html>
<html>
<head>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    width: 1280px;
    height: 720px;
    font-family: 'Inter', system-ui, sans-serif;
    background: ${theme.gradient};
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
  }

  /* Subtle grid pattern */
  body::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 40px 40px;
  }

  /* Glow orbs */
  .glow {
    position: absolute;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: ${theme.accent};
    opacity: 0.1;
    filter: blur(140px);
    top: -150px;
    right: -100px;
  }

  .glow-2 {
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: ${theme.accent};
    opacity: 0.06;
    filter: blur(100px);
    bottom: -80px;
    left: -80px;
  }

  .container {
    position: relative;
    z-index: 1;
    text-align: center;
    max-width: 1000px;
    padding: 0 60px;
  }

  .icon {
    color: ${theme.accent};
    margin-bottom: 36px;
    opacity: 0.85;
  }

  .tagline {
    font-size: 68px;
    font-weight: 800;
    color: #ffffff;
    line-height: 1.15;
    letter-spacing: -1.5px;
    background: linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.75) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
</style>
</head>
<body>
  <div class="glow"></div>
  <div class="glow-2"></div>
  <div class="container">
    <div class="icon">${theme.icon}</div>
    <h1 class="tagline">${escapeHTML(tagline)}</h1>
  </div>
</body>
</html>`;
}

function main() {
  const args = parseArgs();

  if (!args.tagline || !args.category || !args.output) {
    console.error(
      "Usage: node generate-project-banner.mjs --tagline <tagline> --category <category> --output <path>",
    );
    process.exit(1);
  }

  const html = generateHTML(args);
  const outputPath = path.resolve(args.output);
  const outputDir = path.dirname(outputPath);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write HTML to a temp file, then screenshot it with the Playwright CLI
  const tmpFile = path.join(os.tmpdir(), `banner-${Date.now()}.html`);
  fs.writeFileSync(tmpFile, html);

  try {
    execFileSync(
      "npx",
      [
        "playwright",
        "screenshot",
        `--viewport-size=1280,720`,
        "--wait-for-timeout=3000",
        `file://${tmpFile}`,
        outputPath,
      ],
      { stdio: "inherit", shell: true },
    );
    console.log(`Banner saved to ${outputPath}`);
  } finally {
    if (fs.existsSync(tmpFile)) {
      fs.unlinkSync(tmpFile);
    }
  }
}

main();
