---
name: add-project
description: Add a new project to the Bitloom portfolio from a GitHub repository URL. Use this skill when the user wants to add a project, showcase a repo, or extend the projects section with a new entry. Trigger whenever the user mentions adding a project, a GitHub repo they want on the portfolio, or wants to update the projects list.
---

# Add Project to Portfolio

You are adding a new project to the Bitloom portfolio website. The user provides a GitHub repository URL. Your job is to analyze the repo, add a project entry keyed by a stable `ProjectKey`, write both translations, and give it a preview (a screenshot, or a woven swatch when there is none).

## Input

The user provides: `$ARGUMENTS` — a GitHub repository URL (e.g., `https://github.com/Dromediansk/some-repo`).

## Step 1: Analyze the Repository

```bash
gh repo view <repo-url> --json name,description,url,homepageUrl,repositoryTopics,languages
gh repo view <repo-url> --json readme --jq '.readme'
```

Extract:

- **Key** — a camelCase identifier, e.g. `researchAgent`, `holaEspanol`. It names the project everywhere (data, translations, image file).
- **Title** — a clear, human-friendly name
- **Description** — 2-3 sentences for potential clients: what it does, who it is for, what Bitloom did, where it stands (live, pre-launch…). Match the tone of the existing `projects.items` entries.
- **Technologies** — 4-6 main technologies with proper casing ("TypeScript", "Next.js"). Check `package.json`, `requirements.txt` etc. if `languages` isn't enough.
- **Category** — one of `aiMl`, `mobileApp`, `webApp` (see heuristics below). These are the only values `ProjectData.categoryKey` accepts.
- **Live URL** — `homepageUrl` if set

## Step 2: Read Current State

- `src/components/projects/types.ts` — the `ProjectKey` union
- `src/components/projects/data.ts` — `projectsData` (order = order on the projects page, the first is the lead) and `HOME_PROJECTS`
- `messages/en.json` / `messages/sk.json` — `projects.items.<key>` and, for home-page projects, `home.work.items.<key>`

Ask the user where the project should go in the list (default: last) and whether it should also appear on the home page's "work" rail.

## Step 3: Preview Image

The projects page shows `image` when set; otherwise it renders the project's woven `swatch`, which is on-brand on its own.

- **Live URL**: take a screenshot, save it as `public/images/projects/project_<key-in-snake_case>.jpg` (e.g. `project_research_agent.jpg`), and keep it small (other images are compressed JPEGs, a few hundred KB at most):

  ```bash
  npx playwright screenshot --viewport-size="1280,720" --wait-for-timeout=3000 "<demo-url>" /tmp/shot.png
  sips -s format jpeg -s formatOptions 75 /tmp/shot.png --out public/images/projects/project_<key>.jpg
  ```

- **No live URL**: leave `image` out and rely on the swatch. Ask the user if they have a screenshot or mockup to use instead. (`scripts/generate-project-banner.mjs` exists but predates the loom design and its gradients don't match the site; don't use it unless the user asks.)

Existing images are never renamed.

## Step 4: Update types.ts and data.ts

Add the key to the `ProjectKey` union in `src/components/projects/types.ts`.

Add an entry to `projectsData` in `src/components/projects/data.ts` at the chosen position:

```typescript
{
  key: "<key>",
  categoryKey: "<aiMl | mobileApp | webApp>",
  technologies: ["Tech1", "Tech2"],
  swatch: { weave: "<plain | twill | basket | herring | satin>", weft: "<thread>", warp: "<thread>" },
  image: "/images/projects/project_<key>.jpg", // only if an image was added
  githubRepo: "<repo-name>", // only if the repo is public and should be linked
  demoUrl: "https://...", // only if live
},
```

- **Swatch**: pick a weave not used by its neighbours and two thread names from `THREADS` in `src/lib/loom/tokens.ts` (`cobalt`, `sky`, `pale`, `bone`, `mist`, `ivory`, `frost`, `navy`, `indigo`). Thread names only, never hex values.
- `githubRepo` is just the repo name; `getProjects` prefixes `https://github.com/Dromediansk/`.
- If the project should be on the home page, add its key to `HOME_PROJECTS`.

## Step 5: Update Translations

Add the project to both `messages/en.json` and `messages/sk.json` under `projects.items`, keyed by the project key (the order inside the object doesn't matter):

```json
"<key>": {
  "title": "<title>",
  "description": "<description>"
}
```

If it is in `HOME_PROJECTS`, also add `home.work.items.<key>` in both files, following the existing entries:

```json
"<key>": {
  "name": "<title>",
  "for": "<who it is for>",
  "did": "<what Bitloom did>",
  "fibre": "<technologies, comma-separated>",
  "state": "<where it stands; wrap a live link as <link>domain</link>>"
}
```

Slovak must read as natural, native Slovak (not Czech-influenced, not machine-translated); mirror the style of the existing `sk.json` entries.

## Step 6: Verify

```bash
npm run lint
npm run build
```

The type check fails on a key that isn't in `ProjectKey`. A missing translation does **not** fail the build: next-intl logs a `MISSING_MESSAGE` error during prerendering and renders the key path instead. Scan the build output for `MISSING_MESSAGE`, and confirm the new key exists in both files:

```bash
node -e 'for (const l of ["en","sk"]) { const m = require(`./messages/${l}.json`); console.log(l, !!m.projects.items["<key>"], !!m.home.work.items["<key>"]) }'
```

## Category Detection Heuristics

- `aiMl`: AI/ML libraries — LangChain, LangGraph, OpenAI, Anthropic, CrewAI, PyTorch, etc.
- `mobileApp`: React Native, Expo, Flutter, Swift, Kotlin, mobile-focused projects
- `webApp`: Next.js, React, Vue, Django, Express, and other web frameworks

When ambiguous (e.g., a Next.js app using AI), choose by the project's primary purpose rather than a secondary technology.

## Summary

After completing all steps, show the user:

- Key and title (EN and SK)
- Category, technologies, swatch
- Position in the list and whether it's on the home page
- Whether a live URL and an image were included
- Lint/build result
