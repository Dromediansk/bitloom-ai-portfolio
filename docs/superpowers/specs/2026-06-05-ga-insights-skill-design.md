# Design: `ga-insights` — reusable GA4 → marketing & product strategy skill

**Date:** 2026-06-05
**Status:** Approved (pending final spec review)

## Goal

Turn Google Analytics 4 data into actionable marketing and product strategy
through a repeatable, version-controlled Claude Code skill. The skill must be
**project-agnostic**: usable in any project that has a GA4 property, discovering
each project's analytics configuration at runtime rather than hardcoding it.

## Background / Research

- The current project (Bitloom portfolio) already uses GA4 via `gtag` with a
  rich custom-event scheme (`src/lib/analytics.ts`): `business_inquiry_submitted`,
  `service_viewed`, `project_viewed`, `cta_click`, `service_inquiry`, a contact
  form funnel (`form_start` → `form_error` → `form_success`), `scroll_depth`,
  `time_on_page`, and outbound/social/blog clicks. This is a good first test
  target, but the skill must NOT depend on these specific event names.
- **An official GA MCP server exists:** [`googleanalytics/google-analytics-mcp`](https://github.com/googleanalytics/google-analytics-mcp)
  (Apache 2.0, read-only). Tools: `get_account_summaries`, `get_property_details`,
  `list_google_ads_links`, `run_report`, `run_funnel_report`,
  `get_custom_dimensions_and_metrics`, `run_realtime_report`.
- Install: `pipx run analytics-mcp`. Auth: Application Default Credentials with
  scope `https://www.googleapis.com/auth/analytics.readonly`, after enabling the
  GA Admin API + GA Data API in a Google Cloud project. Works with any
  MCP-compatible client, including Claude Code.

## Decisions

| Decision | Choice |
| --- | --- |
| Deliverable | Reusable Claude Code skill |
| Report focus | Both marketing and product, in two sections |
| Actionability | Insights + prioritized recommendations |
| Install scope | Personal skill: `~/.claude/skills/ga-insights/` |
| Default time window | Last 30 days vs prior 30 days (overridable by argument) |
| Report destination | `docs/ga-insights/YYYY-MM-DD.md` if a `docs/` dir exists, else project root; overridable |

## Architecture

A personal Claude Code skill backed by the official GA MCP server. The skill
encodes the *workflow and analytical judgment*; the MCP server provides
read-only access to GA4 data. No custom API-client code is written or maintained.

### Files (`~/.claude/skills/ga-insights/`)

- **`SKILL.md`** — trigger description (analyze GA / marketing & product
  insights) + the workflow below.
- **`references/setup.md`** — one-time MCP connection guide (enable GA Admin +
  Data APIs, ADC auth, register `analytics-mcp` in MCP config). Read by the skill
  only when preflight fails, and by the user during initial setup.
- **`references/ga4-query-guide.md`** — generic GA4 reference: standard
  dimensions/metrics, the `customEvent:<param>` mechanism, the funnel-report
  request shape. Patterns only — no project-specific event data.

## How it stays project-agnostic

1. **Discovers the property.** Preflight calls `get_account_summaries`. One
   property → use it. Several → list them and ask, or accept a property-ID
   argument.
2. **Discovers the event taxonomy.** Calls `get_custom_dimensions_and_metrics`,
   then a `run_report` broken down by `eventName`, to learn what events the site
   actually fires. Reasons about which events are conversions vs engagement vs
   content-views from their semantics — never assumes specific names. Works for
   GA4 automatic-events-only projects and rich custom schemes alike.
3. **No agent dependency.** If the current project exposes a marketing-oriented
   agent/skill, route marketing recommendations through it; otherwise apply
   built-in marketing best-practice heuristics.
4. **Discovers the report destination.** Default `docs/ga-insights/YYYY-MM-DD.md`
   when a `docs/` dir exists, else project root; overridable by argument. Never
   assumes a fixed path.

## Workflow

1. **Preflight** — `get_account_summaries` (verifies auth), resolve property,
   `get_custom_dimensions_and_metrics`.
2. **Time window** — default last 30 days vs prior 30 days; overridable.
3. **Discover events** — `eventName` breakdown to map the project's actual
   taxonomy.
4. **Query** — `run_report` / `run_funnel_report` for:
   - *Marketing:* sessions/users by channel & source, top landing pages,
     conversion events, conversion funnels.
   - *Product:* content/page engagement, scroll depth, time-on-page, top-viewed
     content, navigation & outbound clicks.
   Break down by custom-event params only where registered as custom dimensions;
   otherwise event-count level.
5. **Interpret** — trends vs prior period, anomalies, what's rising/declining.
6. **Recommend** — prioritized actions, two sections (Marketing / Product), each
   structured as *metrics → insights → actions*.
7. **Output** — one markdown report saved to the discovered destination.

## Key constraint: custom dimensions

GA4 custom event parameters (e.g. `event_label`, `event_category`) can only be
broken down in `run_report` if they are **registered as custom dimensions** in
GA4 Admin. The preflight `get_custom_dimensions_and_metrics` call discovers
what's registered. When label-level breakdown is unavailable, the skill falls
back to event-count level and includes "register these custom dimensions" as a
recommendation, which unlocks richer future analysis.

## Error handling

- **Preflight auth/MCP failure** → point the user to `references/setup.md`;
  do not guess or fabricate.
- **Multiple properties** → ask which to analyze.
- **Low/no traffic or unregistered dimensions** → report honestly; never
  fabricate numbers.

## Verification

Run against a live GA4 property (the Bitloom property is a fine first test) and
confirm:

1. Produces a coherent two-section (Marketing / Product) report.
2. Degrades gracefully when custom dimensions are missing (falls back +
   recommends registering them).
3. Correctly surfaces the no-auth / not-connected path.
4. Prompts for property selection when more than one property exists.

## Out of scope (YAGNI)

- Scheduled/recurring report generation.
- Writing back to GA (the MCP server is read-only by design).
- Google Ads optimization beyond surfacing linked-account context.
- A standalone API-client implementation (the MCP server replaces it).
