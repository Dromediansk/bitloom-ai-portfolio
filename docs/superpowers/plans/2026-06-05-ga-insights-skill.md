# ga-insights Skill Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a reusable personal Claude Code skill (`ga-insights`) that turns any project's Google Analytics 4 data into a marketing + product strategy report with prioritized recommendations, backed by the official Google Analytics MCP server.

**Architecture:** A personal skill at `~/.claude/skills/ga-insights/` (available across all projects on this machine). The skill encodes the analytical workflow and judgment; the official `analytics-mcp` MCP server provides read-only GA4 access. The skill discovers each project's GA property and event taxonomy at runtime, so nothing is hardcoded to one site. No custom API-client code is written.

**Tech Stack:** Markdown skill files (YAML frontmatter + prose workflow); the official `googleanalytics/google-analytics-mcp` server run via `pipx`; Google Cloud Application Default Credentials for auth; Claude Code MCP configuration.

**Note on methodology:** These are prose/configuration artifacts, not compilable code, so classic test-first TDD does not apply. Verification is behavioral: confirm files exist with the intended content, confirm the MCP server connects, and run the skill end-to-end against a live GA4 property. Each task ends with an explicit verification step and a commit.

**Important — where things live:**
- Skill files live OUTSIDE this repo, in `~/.claude/skills/ga-insights/`. They are NOT committed to the bitloom_portfolio repo.
- The MCP server registration also lives outside the repo (user-scope Claude config).
- Only the spec and this plan (already in `docs/superpowers/`) belong to this repo. Per-task "commits" for the skill files refer to a git repo only if `~/.claude/skills/` is itself version-controlled; if it is not, the commit steps are skipped and replaced by the stated file-existence verification. Check once at the start (Task 0).

---

### Task 0: Determine whether `~/.claude/skills` is version-controlled

**Files:** none (investigation only)

- [ ] **Step 1: Check for a git repo around the skills directory**

Run:
```bash
git -C ~/.claude/skills rev-parse --is-inside-work-tree 2>/dev/null && echo "VERSIONED" || echo "NOT VERSIONED"
```

- [ ] **Step 2: Record the result**

If `VERSIONED`: later "Commit" steps run `git -C ~/.claude/skills add … && git -C ~/.claude/skills commit …`.
If `NOT VERSIONED`: skip every "Commit" step in this plan; the file-existence verification step in each task is the completion gate instead. Do NOT run `git init` — leave the user's home-dir layout as-is.

---

### Task 1: Connect the official Google Analytics MCP server to Claude Code

This is the prerequisite that makes the skill functional. The Google Cloud steps are performed by the user (they own the GA/Cloud account); the agent performs the MCP registration and verification.

**Files:**
- Modify (user-scope MCP config): registered via `claude mcp add` (writes to user Claude config, not this repo)

- [ ] **Step 1: User enables APIs and authenticates (manual, user action)**

Tell the user to do the following once (and wait for confirmation before continuing):
1. In a Google Cloud project, enable the **Google Analytics Admin API** and the **Google Analytics Data API**.
2. Install the gcloud CLI if needed, then run:
   ```bash
   gcloud auth application-default login --scopes=https://www.googleapis.com/auth/analytics.readonly,https://www.googleapis.com/auth/cloud-platform
   ```
3. Confirm `pipx` is installed (`pipx --version`); if not, `brew install pipx && pipx ensurepath`.

Expected: user confirms APIs enabled and ADC login succeeded.

- [ ] **Step 2: Register the MCP server with Claude Code (user scope)**

Run:
```bash
claude mcp add analytics-mcp --scope user -- pipx run analytics-mcp
```

Expected output: confirmation that the `analytics-mcp` server was added at user scope.

- [ ] **Step 3: Verify the server starts and lists tools**

Run:
```bash
claude mcp list
```

Expected: `analytics-mcp` appears in the list with a connected/ok status. If it shows a failure, open a new Claude Code session so the server is spawned, then re-run.

- [ ] **Step 4: Verify auth works via a live preflight call**

In a Claude Code session, confirm the `mcp__analytics-mcp__get_account_summaries` tool returns at least one account/property without an auth error.

Expected: a JSON structure listing GA account(s) and propertyId(s). If it errors with credentials/permission, revisit Step 1 (ADC login + API enablement).

- [ ] **Step 5: Commit** (only if Task 0 = VERSIONED; otherwise skip)

No repo file changed in this task (MCP config is user-scope). Nothing to commit. Proceed.

---

### Task 2: Create the skill directory and `SKILL.md`

**Files:**
- Create: `~/.claude/skills/ga-insights/SKILL.md`

- [ ] **Step 1: Create the directory**

Run:
```bash
mkdir -p ~/.claude/skills/ga-insights/references
```

- [ ] **Step 2: Write `SKILL.md`**

Create `~/.claude/skills/ga-insights/SKILL.md` with exactly this content:

````markdown
---
name: ga-insights
description: Analyze a Google Analytics 4 property and produce a two-section (marketing + product) strategy report with prioritized recommendations. Use when the user wants to understand site analytics, improve marketing/conversion, learn what content resonates, or says things like "analyze GA", "review analytics", "GA insights", "what's working on the site", "marketing insights from analytics", or "product strategy from our data". Works in ANY project that has a GA4 property, via the official Google Analytics MCP server (analytics-mcp). Discovers the property and event taxonomy at runtime — nothing is hardcoded to a specific site.
allowed-tools: Read, Bash(ls:*), Bash(test:*), Bash(date:*), Bash(mkdir:*), Write, mcp__analytics-mcp__get_account_summaries, mcp__analytics-mcp__get_property_details, mcp__analytics-mcp__get_custom_dimensions_and_metrics, mcp__analytics-mcp__run_report, mcp__analytics-mcp__run_funnel_report, mcp__analytics-mcp__run_realtime_report, mcp__analytics-mcp__list_google_ads_links
---

# GA Insights

Turn a Google Analytics 4 property into an actionable marketing **and** product strategy report. This skill is project-agnostic: it discovers the GA property and the site's actual event taxonomy at runtime, then reasons about the data rather than assuming any particular event names.

Read-only throughout — the underlying MCP server cannot modify GA configuration.

## Prerequisites

This skill requires the `analytics-mcp` MCP server to be connected and authenticated. If any MCP call below fails with a connection or credentials error, STOP and read `references/setup.md`, then guide the user through setup. Do not fabricate numbers or proceed without real data.

## Arguments (all optional)

- **property id** — analyze a specific GA4 property (e.g. `properties/123456789`). If omitted, discover it.
- **window** — analysis window in days (default **30**). The report compares this window against the immediately preceding window of equal length (default: last 30 days vs prior 30 days).
- **destination** — output path for the report. If omitted, use `docs/ga-insights/<YYYY-MM-DD>.md` when a `docs/` directory exists in the current project, else `./ga-insights-<YYYY-MM-DD>.md`.

## Workflow

### 1. Preflight

1. Call `get_account_summaries`.
   - On auth/connection error → read `references/setup.md` and help the user fix setup; then stop.
   - If exactly one property → use it.
   - If multiple properties → list them (account name, property name, propertyId) and ask the user which to analyze, unless a property id argument was given.
2. Call `get_property_details` for the chosen property (note timezone and currency — needed to interpret dates and any revenue metrics).
3. Call `get_custom_dimensions_and_metrics` and record which custom dimensions/metrics are **registered**. This determines whether event-parameter breakdowns (e.g. a label parameter) are queryable in `run_report`.

### 2. Resolve the time windows

Compute two equal windows from today (use the property timezone; get today's date via `date +%F`):
- **Current:** last N days (N = window arg or 30).
- **Prior:** the N days immediately before the current window.

Use these as `dateRanges` so every metric can be reported with a period-over-period delta.

### 3. Discover the event taxonomy

Run a `run_report` over the current window with dimension `eventName` and metrics `eventCount`, `totalUsers` (ordered by `eventCount` desc). From the returned event names, classify by semantics — do not assume names:
- **Conversion-like:** events whose names imply intent or a completed goal (e.g. contain "inquiry", "submit", "success", "signup", "lead", "purchase", "contact", "cta").
- **Funnel-like:** sets of events that form a sequence (e.g. a `*_start` / `*_error` / `*_success` family, or GA4 `form_start` / `form_submit`).
- **Content-view-like:** events implying a view of a content unit (e.g. contain "view", "viewed", plus the automatic `page_view`).
- **Engagement-like:** events about depth/dwell (e.g. contain "scroll", "time", "engagement").

If unsure how to classify an event, keep it in an "Other notable events" bucket rather than forcing it.

### 4. Query — marketing

Using `run_report` over both windows:
- Sessions and users by **channel** (`sessionDefaultChannelGroup`) and by **source/medium** (`sessionSource`, `sessionMedium`).
- Top **landing pages** (`landingPagePlusQueryString`) by sessions and by the engagement rate / conversions available.
- **Conversion events:** counts of the conversion-like events identified in step 3, by `eventName`. If a label parameter is registered as a custom dimension, break the key conversion event down by it (reference `customEvent:<param>` per `references/ga4-query-guide.md`); otherwise stay at event-count level and note the limitation.
- **Funnels:** for any funnel-like family, call `run_funnel_report` with the ordered steps to get step-by-step drop-off. See the funnel request shape in `references/ga4-query-guide.md`.

### 5. Query — product

Using `run_report` over both windows:
- **Content/service/project views:** the content-view-like events by `eventName`, broken down by a label/title parameter when registered, else by `pagePath` / `pageTitle`.
- **Engagement depth:** scroll-like and time-like events; if a scroll-depth or time value is sent as an event value, summarize its distribution; otherwise use GA4's built-in `averageSessionDuration`, `userEngagementDuration`, and `engagementRate` per page.
- **Navigation / outbound:** outbound/social/blog-style click events by `eventName` and label when available.
- Top viewed pages (`pagePath`, `pageTitle`) by views and engagement.

### 6. Interpret

For each metric, compute the current-vs-prior delta (absolute and %). Surface:
- What is clearly **growing** and **declining**.
- **Anomalies** (a channel, page, or event that spikes or collapses).
- The **biggest conversion drop-off** in any funnel.
- Honest **data-quality caveats**: low traffic (call out when sessions are too few to be reliable), unregistered custom dimensions limiting breakdowns, sampling, or `(not set)` values.

### 7. Recommend

Produce **prioritized**, concrete recommendations (not generic advice). Each recommendation states: the observation it's based on, the suggested action, and the expected effect.

- **Marketing recommendations:** if the current project exposes a marketing-oriented agent or skill (check `.claude/agents/` and `.claude/skills/` for something marketing/SEO/growth-related), route the marketing findings through it for best-practice grounding and incorporate its guidance. Otherwise apply standard conversion/acquisition best practices yourself.
- **Product recommendations:** base these on what content/services draw engagement vs. what gets ignored, and where users drop off.
- If label-level breakdowns were unavailable due to unregistered custom dimensions, the FIRST marketing recommendation is to register those custom dimensions in GA4 Admin, naming the specific parameters observed.

### 8. Output the report

Determine the destination (per Arguments). Ensure its directory exists (`mkdir -p`). Write a single markdown file using this structure:

```markdown
# GA Insights — <property name> (<propertyId>)

**Window:** last <N> days (<current start> → <current end>) vs prior <N> days
**Generated:** <YYYY-MM-DD>  ·  **Timezone:** <tz>

## Summary
<3–6 bullet headline takeaways across both sections>

## Marketing
### Key metrics
<table: metric · current · prior · Δ%>
### Insights
<what's working / declining / anomalies / funnel drop-off>
### Prioritized recommendations
1. **<action>** — <observation> → <expected effect>
2. ...

## Product
### Key metrics
<table: metric · current · prior · Δ%>
### Insights
<engagement, content resonance, navigation>
### Prioritized recommendations
1. **<action>** — <observation> → <expected effect>
2. ...

## Data quality & caveats
<low-traffic notes, unregistered dimensions, sampling, (not set), etc.>
```

After writing, tell the user the file path and give a 3–5 bullet spoken summary of the highest-priority actions.

## Guardrails

- Never invent metrics. If a query returns no/low data, say so.
- Respect read-only: this skill only reads GA data.
- Keep recommendations specific to the observed data; avoid boilerplate marketing platitudes.
````

- [ ] **Step 3: Verify the file exists and parses as a skill**

Run:
```bash
test -f ~/.claude/skills/ga-insights/SKILL.md && head -5 ~/.claude/skills/ga-insights/SKILL.md
```

Expected: the file exists and the first lines show the YAML frontmatter with `name: ga-insights`.

- [ ] **Step 4: Commit** (only if Task 0 = VERSIONED; else skip)

```bash
git -C ~/.claude/skills add ga-insights/SKILL.md
git -C ~/.claude/skills commit -m "feat(ga-insights): add SKILL.md workflow"
```

---

### Task 3: Create `references/setup.md`

**Files:**
- Create: `~/.claude/skills/ga-insights/references/setup.md`

- [ ] **Step 1: Write `setup.md`**

Create `~/.claude/skills/ga-insights/references/setup.md` with exactly this content:

````markdown
# Setup: connecting the Google Analytics MCP server

The `ga-insights` skill needs the official Google Analytics MCP server
(`analytics-mcp`, repo `googleanalytics/google-analytics-mcp`, Apache 2.0,
read-only) connected and authenticated. Do this once per machine.

## 1. Enable Google Cloud APIs

In a Google Cloud project (any project you control), enable:
- **Google Analytics Admin API**
- **Google Analytics Data API**

## 2. Authenticate with Application Default Credentials

Install the gcloud CLI, then run:

```bash
gcloud auth application-default login \
  --scopes=https://www.googleapis.com/auth/analytics.readonly,https://www.googleapis.com/auth/cloud-platform
```

The Google account you log in with must have at least **Viewer** access to the
GA4 property you want to analyze.

Service-account alternative: set `GOOGLE_APPLICATION_CREDENTIALS` to a service
account JSON key whose service account has Viewer access to the property, and
make sure `GOOGLE_PROJECT_ID` is set. Prefer ADC for a single-user machine.

## 3. Install pipx (if needed)

```bash
pipx --version || (brew install pipx && pipx ensurepath)
```

## 4. Register the server with Claude Code (user scope)

```bash
claude mcp add analytics-mcp --scope user -- pipx run analytics-mcp
```

Verify:

```bash
claude mcp list
```

`analytics-mcp` should appear and connect. You may need to start a fresh Claude
Code session for the server to spawn.

## 5. Confirm auth end-to-end

In a Claude Code session, the `get_account_summaries` tool should return your GA
account(s) and property id(s) without an auth error. If it errors:
- Re-run the ADC login (step 2) and confirm the scopes.
- Confirm both APIs are enabled (step 1).
- Confirm the logged-in account has access to the property.

## Tool reference

The server exposes these read-only tools:
`get_account_summaries`, `get_property_details`, `list_google_ads_links`,
`run_report`, `run_funnel_report`, `get_custom_dimensions_and_metrics`,
`run_realtime_report`.
````

- [ ] **Step 2: Verify the file exists**

Run:
```bash
test -f ~/.claude/skills/ga-insights/references/setup.md && wc -l ~/.claude/skills/ga-insights/references/setup.md
```

Expected: file exists with a non-trivial line count (> 40 lines).

- [ ] **Step 3: Commit** (only if Task 0 = VERSIONED; else skip)

```bash
git -C ~/.claude/skills add ga-insights/references/setup.md
git -C ~/.claude/skills commit -m "docs(ga-insights): add MCP setup reference"
```

---

### Task 4: Create `references/ga4-query-guide.md`

**Files:**
- Create: `~/.claude/skills/ga-insights/references/ga4-query-guide.md`

- [ ] **Step 1: Write `ga4-query-guide.md`**

Create `~/.claude/skills/ga-insights/references/ga4-query-guide.md` with exactly this content:

````markdown
# GA4 query guide (generic)

Patterns the `ga-insights` skill uses when calling the `analytics-mcp` tools.
No project-specific event names live here — only reusable mechanics.

## Common dimensions

- `date`, `eventName`
- `sessionDefaultChannelGroup`, `sessionSource`, `sessionMedium`, `sessionCampaignName`
- `landingPagePlusQueryString`, `pagePath`, `pageTitle`
- `deviceCategory`, `country`
- `customEvent:<parameter_name>` — a custom **event** parameter, queryable in
  reports ONLY if registered as a custom dimension (see below).

## Common metrics

- `sessions`, `totalUsers`, `newUsers`, `activeUsers`
- `eventCount`, `eventCountPerUser`, `keyEvents` (conversions)
- `engagementRate`, `engagedSessions`, `averageSessionDuration`,
  `userEngagementDuration`
- `screenPageViews`, `screenPageViewsPerSession`
- `eventValue` (the numeric `value` sent with an event, when used)

## Custom dimensions — the key constraint

GA4 custom event parameters (e.g. a `label` or `category` sent with an event)
can only be used as a **breakdown dimension in `run_report`** if they are
registered as custom dimensions in GA4 Admin → Custom definitions. Discover what
is registered with `get_custom_dimensions_and_metrics`.

- If a needed parameter IS registered → use dimension `customEvent:<param_name>`.
- If it is NOT registered → you cannot break events down by it in `run_report`.
  Fall back to `eventName`-level counts and recommend registering it. (Realtime
  and Explorations can sometimes see unregistered params, but standard reports
  cannot.)

## Period-over-period

Pass two date ranges so every metric has a comparison:

```json
"dateRanges": [
  { "startDate": "<current_start>", "endDate": "<current_end>", "name": "current" },
  { "startDate": "<prior_start>",   "endDate": "<prior_end>",   "name": "prior" }
]
```

Compute dates relative to today in the property's timezone. For a 30-day window:
current = last 30 days; prior = the 30 days before that.

## Funnel reports

Use `run_funnel_report` to measure step-by-step drop-off for a sequence of
events. Define ordered steps, each matching an `eventName` (and optionally a
parameter filter). The response gives users/completion per step, from which you
compute drop-off between consecutive steps. Use this for any `*_start` →
`*_success` style family, or GA4's `form_start` → `form_submit`.

## Honest-data rules

- Sessions below a small threshold (e.g. < 100 in the window) → label the metric
  low-confidence in the report.
- Watch for `(not set)` / `(other)` rows from sampling or cardinality limits and
  call them out rather than treating them as real segments.
- `run_realtime_report` is for "what's happening now" spot-checks only; base
  trend analysis on `run_report`.
````

- [ ] **Step 2: Verify the file exists**

Run:
```bash
test -f ~/.claude/skills/ga-insights/references/ga4-query-guide.md && wc -l ~/.claude/skills/ga-insights/references/ga4-query-guide.md
```

Expected: file exists with a non-trivial line count (> 50 lines).

- [ ] **Step 3: Commit** (only if Task 0 = VERSIONED; else skip)

```bash
git -C ~/.claude/skills add ga-insights/references/ga4-query-guide.md
git -C ~/.claude/skills commit -m "docs(ga-insights): add GA4 query guide reference"
```

---

### Task 5: End-to-end verification against a live property

**Files:** none (behavioral verification); produces a report at the destination path.

- [ ] **Step 1: Confirm the skill is discoverable**

Start a fresh Claude Code session in any project. Confirm `ga-insights` appears in the available skills list (the harness loads `~/.claude/skills/`).

Expected: `ga-insights` is listed.

- [ ] **Step 2: Run the skill against the Bitloom GA4 property (happy path)**

From the `bitloom_portfolio` project, invoke the skill (e.g. "analyze our GA / ga-insights"). Let it run preflight → discovery → queries → report.

Expected:
- It resolves the property (single property → no prompt; multiple → it asks).
- It writes a report to `docs/ga-insights/<today>.md` (because `docs/` exists here).
- The report has both **Marketing** and **Product** sections, each with metrics, insights, and prioritized recommendations, plus a data-quality section.

- [ ] **Step 3: Verify graceful degradation (missing custom dimensions)**

Inspect the report's recommendations. Because this property's `event_label` /
`event_category` parameters are likely NOT registered as GA4 custom dimensions,
confirm the report:
- Still produces event-count-level analysis, AND
- Includes a top recommendation to register the specific custom dimensions it
  needed.

Expected: no crash, no fabricated label breakdowns, explicit recommendation present.

- [ ] **Step 4: Verify the no-auth path (negative test)**

Temporarily simulate a broken connection (e.g. in a throwaway session where the
MCP server is not connected) and invoke the skill.

Expected: the skill detects the failed `get_account_summaries`, points the user
to `references/setup.md`, and does NOT fabricate data. (Restore the connection
afterward.)

- [ ] **Step 5: Verify property-selection prompt (only if >1 property)**

If the authenticated account has more than one GA4 property, invoke without a
property argument and confirm the skill lists them and asks which to use. If the
account has only one property, note this case as "not applicable on this
account" and skip.

- [ ] **Step 6: Commit the sample report into this repo (optional, user choice)**

The generated report lives in this repo at `docs/ga-insights/<today>.md`. Ask
the user whether to keep it as a sample/baseline. If yes:

```bash
git add docs/ga-insights/
git commit -m "chore: add first ga-insights report"
```

If the user prefers not to track reports, add `docs/ga-insights/` to `.gitignore`
instead and commit that.

---

## Self-Review (completed during planning)

**Spec coverage:**
- Reusable / project-agnostic → Task 2 SKILL.md discovery workflow (steps 1, 3, 7). ✓
- Official GA MCP server, read-only → Task 1 + setup.md. ✓
- Both marketing + product sections → SKILL.md steps 4, 5, 8. ✓
- Insights + prioritized recommendations → SKILL.md steps 6, 7, 8. ✓
- Personal skill location `~/.claude/skills/ga-insights/` → Tasks 2–4. ✓
- 30-day vs prior-30 default window → SKILL.md Arguments + step 2; query guide. ✓
- Report destination `docs/ga-insights/` → root fallback → SKILL.md Arguments + step 8. ✓
- Custom-dimension constraint + graceful fallback → SKILL.md steps 1, 4, 7; query guide; Task 5 step 3. ✓
- No marketing-agent dependency (optional routing) → SKILL.md step 7. ✓
- Error handling (auth fail, multi-property, low data) → SKILL.md steps 1, 6; Task 5 steps 4–5. ✓
- Verification plan → Task 5. ✓

**Placeholder scan:** No "TBD/TODO/implement later". File contents are complete and ready to paste. The `<...>` tokens inside the report template are intentional output placeholders the skill fills at runtime, not plan gaps.

**Type/name consistency:** MCP tool names (`get_account_summaries`, `get_property_details`, `get_custom_dimensions_and_metrics`, `run_report`, `run_funnel_report`, `run_realtime_report`, `list_google_ads_links`) are used consistently across SKILL.md, setup.md, and the query guide. Server name `analytics-mcp` consistent in Tasks 1–2 and setup.md. Skill name `ga-insights` consistent throughout.
