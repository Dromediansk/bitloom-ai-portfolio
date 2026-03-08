---
name: add-project
description: Add a new project to the Bitloom portfolio from a GitHub repository URL. Use this skill when the user wants to add a project, showcase a repo, or extend the projects section with a new entry. Trigger whenever the user mentions adding a project, a GitHub repo they want on the portfolio, or wants to update the projects list.
---

# Add Project to Portfolio

You are adding a new project to the Bitloom portfolio website. The user provides a GitHub repository URL. Your job is to analyze the repo, generate a preview image, and add a complete project entry with translations.

## Input

The user provides: `$ARGUMENTS` — a GitHub repository URL (e.g., `https://github.com/Dromediansk/some-repo`).

## Step 1: Analyze the Repository

Use the GitHub CLI to gather information:

```bash
gh repo view <repo-url> --json name,description,url,homepageUrl,repositoryTopics,languages
```

Also fetch the README:

```bash
gh repo view <repo-url> --json readme --jq '.readme'
```

From this, extract:
- **Project name** — a clear, human-friendly title
- **Description** — 2-3 sentences summarizing what the project does, its key features, and what makes it interesting. Write it to showcase the project to potential clients visiting the portfolio.
- **Technologies** — 4-6 main technologies/frameworks. Use proper casing (e.g., "TypeScript" not "typescript", "Next.js" not "nextjs"). Check `package.json`, `requirements.txt`, or similar files if the languages field isn't detailed enough.
- **Category** — auto-detect one of: `aiMl`, `mobileApp`, `webApp`, `creative`
- **Live URL** — use `homepageUrl` from the repo if available

## Step 2: Read Current State

Read these files to understand the current project count and structure:
- `src/components/projects/data.ts` — current project entries
- `messages/en.json` — English translations (`projects.items` array)
- `messages/sk.json` — Slovak translations (`projects.items` array)

Note the current number of projects (N). The new project will be at index 0 (first position), and its id will be N + 1.

Since translations and images are mapped by array index (not by id), inserting at the front means all existing items shift down by one. You'll handle this in the following steps.

## Step 3: Generate Project Preview Image

The portfolio displays project screenshots as card images. Generate an appropriate preview image and save it to `public/images/projects/project_<N+1>.png`.

**First, shift existing images** so the new project can take position 1. Rename them in reverse order to avoid overwriting:

```bash
# Shift existing images: project_N.png → project_N+1.png, ..., project_1.png → project_2.png
for i in $(seq N -1 1); do
  mv "public/images/projects/project_${i}.png" "public/images/projects/project_$((i+1)).png"
done
```

**Then generate the new project's image** as `public/images/projects/project_1.png`.

**If the project has a live demo URL**, take a screenshot using Playwright:

```bash
npx playwright screenshot --viewport-size="1280,720" --wait-for-timeout=3000 "<demo-url>" public/images/projects/project_1.png
```

**If there is no live URL**, generate a styled banner image using the banner generator script. The script creates a professional banner with a creative tagline and a category-themed icon — styled with colors that match the category (purple for AI/ML, blue for Web App, etc.).

First, craft a short, punchy tagline (5-8 words) that captures the essence of what the project does. The tagline should NOT repeat the project title — it should describe the project's purpose or value in a creative way. Think of it as a motto or elevator pitch.

Examples:
- For a research agent: "Orchestrating AI Agents to Unlock Research Insights"
- For a note-taking app: "Capture Your Thoughts, Powered by AI"
- For a 3D portfolio: "Where Code Meets Creative Expression"

```bash
node scripts/generate-project-banner.mjs \
  --tagline "<creative tagline about what the project does>" \
  --category "<display category name, e.g. 'AI / ML', 'Web App', 'Mobile App', '3D / Creative'>" \
  --output "public/images/projects/project_1.png"
```

The `--category` value must match one of: `AI / ML`, `Mobile App`, `Web App`, `3D / Creative` (these are the display names, not the categoryKey values).

## Step 4: Update data.ts

Add a new entry as the **first item** in the `projectsData` array in `src/components/projects/data.ts`:

```typescript
{
  id: <N + 1>,
  categoryKey: "<detected-category>",
  technologies: ["Tech1", "Tech2", ...],
  githubRepo: "<repo-name>",
  // only include demoUrl if a live URL was found
  demoUrl: "https://...",
},
// ... existing entries follow
```

The `githubRepo` field is just the repo name (not the full URL) — it gets prefixed with `https://github.com/Dromediansk/` by the `getProjects` function. The `codeUrl` is generated automatically from this.

## Step 5: Update Translation Files

Add a new item as the **first entry** in the `projects.items` array in both translation files. This keeps translations aligned with the `projectsData` array order (index 0 = first project).

**messages/en.json**:
```json
{
  "title": "<English project title>",
  "description": "<English project description>"
}
```

**messages/sk.json**:
```json
{
  "title": "<Slovak project title>",
  "description": "<Slovak project description>"
}
```

The Slovak translation should sound natural — written as a native speaker would, not machine-translated. Use professional, business-appropriate tone in both languages.

## Step 6: Verify

Check if the category key you used already exists in `projects.categories` in both translation files. If it's a new category, add it to both `en.json` and `sk.json`.

## Category Detection Heuristics

- `aiMl`: AI/ML libraries — CrewAI, TensorFlow, PyTorch, OpenAI, LangChain, scikit-learn, etc.
- `mobileApp`: React Native, Expo, Flutter, Swift, Kotlin, mobile-focused projects
- `webApp`: Next.js, React, Vue, Angular, Django, Rails, Express, and other web frameworks
- `creative`: Three.js, React Three Fiber, WebGL, canvas-heavy, 3D, or generative art projects

When ambiguous (e.g., a Next.js app using AI), prefer the category that best describes the project's primary purpose rather than a secondary technology it uses.

## Summary

After completing all steps, show the user:
- Project title (EN and SK)
- Detected category
- Technologies list
- Whether a live URL was included
- Whether a preview image was generated or needs manual addition
