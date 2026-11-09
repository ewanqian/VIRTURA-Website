> **Source attribution correction / 2026-11-09:** In user-provided 2024 composite, the boxed layered-roof glyph is near the nature-retreat identity, NOT proven as Tea House logo. The separate Virtual Airlines emblem is the lower black opposed-triangle/orbit mark; upper coloured motif panels are NOT verified airline subsidiary logos. Read `docs/brand/RECOVERY-R02-SOURCE-ATTRIBUTION-2026-11-09.md` before making any icons, brand boards or navigation. All SVGs under `assets/brand-candidates/` are **not approved masters**.

> **VIRTURA SpacePort 2024 visual preservation checkpoint (2026-11-08):** Before creating/replacing any SpacePort, Balloon, MOVA, Virtual Airlines, Digital Geographic, Tea House, CCC or nature-retreat logo, UI, poster or 3D scene, read `docs/brand/VIRTURA-SPACE-VISUAL-DNA-2026-11-08.md` and `docs/brand/spaceport-brand-registry.v01.json`. The user's original 2024 visual references and the AI 2026 direction sketches are separately and persistently archived in ChatGPT Library `/VIRTURA/Brand-Archive/2026-11-08/`. **The original binaries are not committed to this GitHub repository.** Do not fabricate visual historical provenance, rename brands, replace Balloon's electric-blue/magenta/yellow/white identity with generic purple/green, or pass AI-composed concept text/logo for approved masters. Get the original vector masters/rights checked before publication.

> **Design checkpoint 2026-11-08**: Before any Space/VI, map, hero, app icon or homepage redesign, read `docs/design/VIRTURA-SPACE-DECISIONS-AND-RISKS-2026-11-08.md` and `docs/design/VIRTURA-SPACE-ART-DIRECTION-v07.md`. v05 is explicitly rejected as final UI; PR #9 is an interaction proof, not an approved visual map. Do not merge green UI or the `deploy/space-v05-as-public-entry-20261108` branch. Map/navigation is primary; Gaussian optional. Visual proposals must pass human art-direction review before implementation.

# VIRTURA Website · Agent Operating Rules

Scope: `ewanqian/VIRTURA-Website`, production domain `virtura.space`. This repository is the **public website**, not a workspace for arbitrary prototype generation.

## Mandatory before work
1. Read `docs/pm/VIRTURA-SPACE-PROGRAM-2026-11-07.md` and `docs/pm/tasks.json`.
2. Select one READY task, check its dependency status. Do not exceed 2 simultaneous local tasks; main product/design decisions require editor signoff.
3. Read the existing repository files and related Portfolio PR before editing. Verify exact route/asset path/credit source.
4. Always branch from current `main`, write small, reversible PRs. Do not direct-push or auto-merge production.

## Home page preservation rule
- Existing `index.html` black editorial art direction is the visual baseline. Preserve its hero, cases, people, inquiry, bilingual switch, and anchor IDs `#top #universes #capabilities #work #delivery #workflow #studio #people #project-inquiry`.
- Never globally restyle `body`, `.project`, `.person`, or homepage typography from an apps page. First author scoped CSS/tokens, compare screenshots at 375 / 768 / 1440 and both languages, then make reviewed changes.
- Retain old URLs and application entrypoints. A route redirect requires a mapping and live proof; a Cloudflare deployment is verified by actual page response, not by Git merge or `CNAME` alone.
- Existing images retain original aspect ratios and must map to correct work/edition/rights. No invented images, fake galleries or generated stock shots.

## Editorial and product gates
- Brand/product: `VIRTURA Space` is a curated digital space/world and service gateway, **not primarily a Store**. Studio is a credible business presentation; SpacePort is a navigable space/IP; tools/workshops are auxiliary instruments.
- Do not claim experimental apps, XR passthrough, paid store, accounts, completed live shows or features until demonstrated. Mark research, archive and working experiences separately.
- Project/version-specific credits; don't turn collaborators' personal works into the team's exclusive deliverables. Client work must accurately state VIRTURA's scoped role.
- Every published card answers: what is it, what can the visitor do, why does it matter, and what is verified today. Provide Chinese/English copy where the surrounding site is bilingual.
- Follow image provenance/rights. Don't commit client secrets, maps, private personal information, PAT, or Cloudflare tokens.

## Completion criteria
A PR with diff, real browser or relevant automated evidence, broken items, source and screenshot references, rollback procedure, task ID and updated `docs/pm/tasks.json`. No evidence → no DONE. Cloudflare production confirmation remains a separate gate after merge.

## Research and code routing
- LOCAL_OPENCODE: deterministic auditing, page inspections, code/CI, screenshots and smoke tests.
- LOCAL_DEEPSEEK: cross-reading and proposal drafting; never sole factual source.
- ONLINE_GPT_EDITOR: product semantics, editorial priorities, collaboration/rights, visual direction approvals.
- If blocked, stop and document the precise missing access/evidence, rather than inventing results.

Issue creation returns 410 because Issues are disabled in this repository. Use `docs/pm/tasks.json` + scoped PRs until explicitly enabled.
