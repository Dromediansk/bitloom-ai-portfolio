#!/usr/bin/env node
// Keeps the design system in one place: src/styles/tokens.css.
//   1. No raw colors (hex, rgb(a), hsl(a)) in src/ outside tokens.css and the
//      email template (email clients can't read CSS custom properties).
//   2. The email template's mirrored colors still match tokens.css.
//   3. The Thread names in src/lib/loom/tokens.ts match the --thread-* tokens.
// Run: npm run lint:tokens (also part of npm run lint).
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const TOKENS = "src/styles/tokens.css";
const EMAIL = "src/app/api/contact/route.ts";
// tokens.ts is the canvas bridge to the tokens (its withAlpha builds rgba strings)
const ALLOWED = new Set([TOKENS, EMAIL, "src/lib/loom/tokens.ts"]);

const CSS_COLOR = /#[0-9a-fA-F]{3,8}(?![\w-])|\b(?:rgba?|hsla?)\(/g;
const TS_COLOR = /["'`]#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})["'`]|\b(?:rgba?|hsla?)\(/g;

const problems = [];
const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });

// 1 · raw colors
for (const abs of walk(path.join(ROOT, "src"))) {
  const rel = path.relative(ROOT, abs);
  const ext = path.extname(rel);
  if (ALLOWED.has(rel) || ![".css", ".ts", ".tsx"].includes(ext)) continue;
  const re = ext === ".css" ? CSS_COLOR : TS_COLOR;
  fs.readFileSync(abs, "utf8")
    .split("\n")
    .forEach((line, i) => {
      if (/^\s*(\/\/|\*|\/\*)/.test(line)) return; // comments
      for (const m of line.matchAll(re))
        problems.push(`${rel}:${i + 1}  raw color ${m[0]}  → use a token from ${TOKENS}`);
    });
}

// token values, for the cross-checks
const tokensCss = fs.readFileSync(path.join(ROOT, TOKENS), "utf8");
const tokenValue = (name) => tokensCss.match(new RegExp(`--${name}:\\s*([^;]+);`))?.[1].trim();

// 2 · the email mirror
const email = fs.readFileSync(path.join(ROOT, EMAIL), "utf8");
for (const m of email.matchAll(/"(#[0-9a-fA-F]{6})",\s*\/\/ --(color-[\w-]+)\s*$/gm)) {
  const want = tokenValue(m[2]);
  if (!want) problems.push(`${EMAIL}: mirrors --${m[2]}, which is not in ${TOKENS}`);
  else if (want.toLowerCase() !== m[1].toLowerCase())
    problems.push(`${EMAIL}: ${m[1]} mirrors --${m[2]} but ${TOKENS} has ${want}`);
}

// 3 · thread names
const tokensTs = fs.readFileSync(path.join(ROOT, "src/lib/loom/tokens.ts"), "utf8");
const listed = [...(tokensTs.match(/THREADS = \[([^\]]*)\]/)?.[1] ?? "").matchAll(/"([\w-]+)"/g)].map((m) => m[1]);
const defined = [...tokensCss.matchAll(/--thread-([\w-]+):/g)].map((m) => m[1]);
for (const t of listed) if (!defined.includes(t)) problems.push(`src/lib/loom/tokens.ts: thread "${t}" has no --thread-${t} in ${TOKENS}`);
for (const t of defined) if (!listed.includes(t)) problems.push(`${TOKENS}: --thread-${t} is missing from THREADS in src/lib/loom/tokens.ts`);

if (problems.length) {
  console.error(`Design tokens: ${problems.length} problem(s)\n  ${problems.join("\n  ")}`);
  process.exit(1);
}
console.log("Design tokens: OK (all colors come from src/styles/tokens.css)");
