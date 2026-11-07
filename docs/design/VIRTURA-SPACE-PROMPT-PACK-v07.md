# VIRTURA Space — Image / VI / Codex Prompt Pack v07
**2026-11-08 · for design exploration ONLY.** Read [decision ledger](./VIRTURA-SPACE-DECISIONS-AND-RISKS-2026-11-08.md) and [art brief](./VIRTURA-SPACE-ART-DIRECTION-v07.md) first. Save versioned outputs and selections to a future `docs/design/reviews/` PR. Do not commit generated art to the production site as an authentic project asset.

## Shared direction — prefix every image request

```text
Create a single high-fidelity desktop interface concept (16:9 landscape) for VIRTURA Space, an original spatial arts platform and online spaceport. It is a real navigable world interface, NOT a SaaS dashboard, an app store, a generic portfolio hero, an infographic, or a long landing page. Reference quality: sophisticated 2020s first-party console interface and museum-grade digital exhibition. Inherit a sharp black/off-white editorial Studio VI. Realistic architectural spatial hierarchy; a few independent destination identities; purposeful negative space; authored composition and legible native HTML-like typography. Few words, no repeated status labels, no large explanatory paragraphs, no neon cyberpunk, no global green gradient, no identical square icons or generic planets, no spectrogram, no overlaid HUD clutter. Use original invented geometry, no third-party logos or trademark UI clone. All visible places are clearly fictional design hypotheses and must not be misrepresented as already built by VIRTURA. Top typography only: VIRTURA, SPACE; interface labels may be Chinese placeholders, accurate final copy will be set in DOM.
```

### Prompt A — WORLD / CARTOGRAPHIC PORT (priority 1)

```text
Show a beautiful usable aerial 3/4 oblique architectural map of a coherent futuristic cultural spaceport at nighttime, as if designed by a world-class game art director and an editorial UI designer together. Cinematic but plausible civic architecture: a recognizable arrival concourse at the central transport axis, a spectacular audiovisual performance balloon/dome venue in one district, a clean digital art museum wing, a botanical teahouse garden with small intimate water courtyard, a research laboratory at a separate outpost. Visible routes, canals/bridges and real built-space relationships, not abstract dashed point-to-point lines. Interface overlay extraordinarily minimal: tiny VIRTURA top-left, SPACEPORT top-center or top-left and only 3–4 small location names near distinct buildings. One node subtly highlighted by actual architectural lighting, with a single semi-transparent, immaculate panel on the right showing: '太空气球', '视听展演空间', '进入 →'. Mostly image and spatial orientation, almost no words. No row of same-sized cards, no giant hero marketing title. Render like a thoughtful playable world selection UI, 16:9 desktop screenshot, crisp light and atmospheric perspective, black graphite and warm silver with selective earned venue light.
```

**Deliverable:** image A0 (overview), image A1 (same camera and district after Balloon selected), and a text-only topology note for actual production. Do not invent measured coordinates in the final app.

### Prompt B — LIVING CHANNEL DESKTOP (alternative)

```text
Show a world-class sophisticated digital culture operating home, inspired by the *usability* of console channels and useful cloud home widgets, but visually original. VIRTURA Space is a spatial arts world, not an App Store. A quiet graphite interface with an architectural 16:9 live window of the SpacePort taking roughly the left half; to the right and beneath, asymmetric and carefully art-directed landscape/portrait channel windows: Balloon audiovisual stage programme as a cinematic 3:2 poster, a botanical teahouse scene as a 4:3 window, an art museum miniature, and a restrained personal saved space strip. Original, distinct, high-quality imagery per location; no repeating square tiles. Strong unified typography, one visual hierarchy, 4–6 short labels max, no text paragraphs, no pricing, no Store language, no onboarding banners. Visually equivalent in finish and calm to a premium first-party OS surface, but no Apple or Nintendo logo or copied design.
```

**Deliverable:** image B0; compare against A's map. Do not merge map and launcher styles without a clear selection decision.

### Prompt C — BALLOON PERFORMANCE STATION (inside world)

```text
Create a premium in-world interface scene for 'Balloon Live Space / 太空气球', explicitly an audiovisual performance and programme venue within VIRTURA SpacePort. A memorable, believable architectural performance room: suspended elliptical projection, elegant truss and acoustic treatment, luminous volume in dark space, evidence of seating/visitor circulation, minimal stage-light contrast, no nightclub cliché. 16:9 camera from visitor position. Only essential overlay: discreet '← SPACEPORT', small '太空气球 / 视听展演空间', one featured programme cover or original audiovisual frame, simple '播放 / ENTER' operation and mute control. The environment is the artwork. The panel is lightweight, no fake episode dates, fake artists, fake tickets, price or streaming-status icons. Editorial and spatial consistency with the proposed main port map.
```

**Deliverable:** C0. Distinguish an actual *place* from a generic video player screenshot.

### Optional D — 5-element VI design study (after selecting A/B)

```text
One coherent original graphic identity study for VIRTURA Space, showing: black/off-white wordmark treatment without claiming a finalized logo, 3 functional route glyphs at 24px, 2 different world badges, a minimal dark selected-inspector component, and one poster cropping/safe-area example. Clear restrained typographic hierarchy and spacing; premium museum/game interface craft. No huge corporate brand-book paragraphs, no green UI, no generic futuristic font.
```

**Deliverable:** VI direction board; visuals are exploration, **not** a vector logo file or implemented design tokens.

## Negative list — reject immediately

1. Essay-sized hero, three independent long explanatory sections, repeated CTA per tile.
2. Meaningless wireframe orbital rings, circles and lines not corresponding to districts/roads.
3. Mandatory 4×3 grid or arbitrary identical square thumbnails; it is not a Wii screenshot recreation.
4. Monochrome-green design, neon cyan/magenta cyberpunk, data-dashboard ribbons, waveform bars.
5. Unlicensed brand logos (Apple, Nintendo, Bungie), copyrighted game scenes, recognizable protected environments.
6. AI hallucinations presented as actual SpacePort source architecture, fake dates, ticket prices, viewer stats, payments or medical promises.
7. A concept image that cannot be decomposed into actual viewport regions, navigation components and one user journey.

## Controlled output cycle and reviewer scorecard

- Generate first 3 **distinct directions**, label them A/B/C externally (do not add giant labels inside art).
- Score 0–5 each: **Orientation**, **Spatial geography**, **Visual quality**, **Interaction legibility**, **Brand coherence**, **Production realism** (30 total).
- Gate: minimum 24/30 overall, and no individual category under 4, before becoming design reference. Score without rationalizing weaknesses; reviewer must sign off.
- Then generate only chosen direction's selected-node and mobile adaptations, with original scene continuity.
- After first approval, produce true implementation specs: assets, dimensions, type weights, spacing, role labels and node/overlay states.

## Codex / HiKu local handoff — copy exactly after concept is selected

```text
You are the VIRTURA Space frontend engineering lead. Before coding, read:
docs/design/VIRTURA-SPACE-DECISIONS-AND-RISKS-2026-11-08.md
docs/design/VIRTURA-SPACE-ART-DIRECTION-v07.md
docs/design/VIRTURA-SPACE-PROMPT-PACK-v07.md
AGENTS.md and docs/pm/tasks.json.

Do NOT treat concept imagery as existing production assets. Do NOT merge outdated v05 or green Store styling. DO NOT modify Studio index.html, projects, credits or inquiry.
First compare the selected signed-off desktop and mobile concept screens to the actual existing PR #9 map and SpacePort station manifest.
Write a 1-page implementation decomposition: data/route graph, shared layout, approved media asset map, state transitions, loading/error/back, i18n and test plan.
Then implement only one vertical slice on a fresh scoped branch: Arrival → select Balloon → see category 视听展演空间 → enter an actual public station/programme → return with selection retained. Keep the visual geometry/camera/layout faithful to the approved concept. Use semantic HTML/CSS and SVG/Canvas for a navigation map if sufficient; React/TS only when justified by interactions; R3F/PlayCanvas/Gaussian only when selected content requires them.
Produce real Playwright 375/768/1440 screenshots, keyboard/locale tests, actual route/asset HTTP results, before/after diff, and issue a PR for human art review. Fail clearly if published SpacePort route cannot be opened. Do not auto-merge.
Stop when the vertical slice is QA-ready and report what is still missing. Never describe CLI/CI PASS as design acceptance or working WebXR.
```

## Asset handoff fields

For each real cover or in-world source asset: `assetId, workId, editionId, sourceRepo, exactPath, sha, rightsOwner, usageAllowed, naturalWidth, naturalHeight, focalPoint, proposedAspect, cropSafeArea, renderPurpose, pageRoute, lastVerified`. No team-owned claim inferred from collaborator identity.

## Budget context (estimates requiring benchmark)

One convincing polished SpacePort 2D/2.5D vertical slice often needs 15–30 engineer person-days plus 5–12 visual/technical-art days when sources are available. A fuller first-release product is materially larger. Agent cycles are rough planning measures, not fixed minutes or guaranteed cost. Avoid blanket app/cloud migrations and account backend until first slice passes design and interaction review.
