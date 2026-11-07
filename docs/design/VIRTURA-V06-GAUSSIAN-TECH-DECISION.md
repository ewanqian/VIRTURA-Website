# VIRTURA Space v06 — TIMER Gaussian Background Technical Decision & Delivery Gates

**Date:** 2026-11-08  
**Status:** Design/engineering research; no production route replacement approved.  
**Proof of concept:** [design/timer-gaussian-fullscreen-poc.html](../../design/timer-gaussian-fullscreen-poc.html). The PoC uses a known public SuperSplat iframe and explicitly **does not claim scene-ready load status**.  
**Critical stop:** `design/space-v05-preview.html` is rejected as the production user experience. The separate branch `deploy/space-v05-as-public-entry-20261108` must not be merged without a completely new review.

## Product priority correction — Navigation first, Gaussian optional

**Owner clarification (2026-11-08): Space map / navigation architecture is the primary product. Gaussian rendering is not the primary architecture.** A spectacular TIMER scene without an understandable way to choose, locate, enter and return from worlds does not pass acceptance.

Required first implementation:
1. **Spatial topology and navigation model:** a coherent set of destinations with world ID, readable name/category (e.g. Balloon = 视听展演空间), route, parent region, position or explicit grouping, actual availability, entry type, return route and versioned credits.
2. **First-screen selection/inspect/enter/return:** one high-quality, appropriately authored overview (2D, 2.5D or 3D) where visitors recognize the port, see selectable destinations, inspect just one selected node and enter a real published route. No 4×3 grid mandate and no information-essay overlays.
3. **One real end-to-end route:** SpacePort → Balloon programme/archive (or another verified destination) → Back. Show what actually opens; never label a GitHub README as an interactive 3D world.
4. **Visual and content contract:** source-derived world cover/camera angles, shared site navigation, restrained labels, consistent hover/focus/loading/error, mobile and keyboard path; preserve existing Studio works and credits.
5. **Gaussian as a replaceable rendering layer:** TIMER SuperSplat can serve a featured artwork or optional ambiance scene, provided the portal still operates with a static poster. It must not delay or dictate navigation data, interactions, route design or the above acceptance gates.

**Engineering implication:** Build a small `worlds.json` or typed route registry, navigation state and DOM inspector first. Then choose among static imagery, SVG/Canvas map, Three.js / R3F or PlayCanvas per world as warranted. Use a single shared UI layer; don't introduce R3F as a prerequisite for the map, nor require 3DGS export before the map can ship.

**Priority order:** (1) usable map/routes and one real destination, (2) accepted world visual system, (3) real device/browser QA, (4) optional Gaussian runtime and enhancement, (5) account/subscriptions/commercial services. A Gaussian background passing its own load test without a working destination map is **NOT DONE**.

## 1. Verified source reality (do not infer data)

The user's personal Portfolio contains `archive/gaussian-scenes/scenes.json`, `scenes-source.json`, `assets/gaussian-scenes/timer-gaussian-0531.webp`, and `works/timer.html` with this public iframe.

- **TIMER Gaussian 0531**: https://superspl.at/scene/b9ec0173
- **Public embed**: https://superspl.at/s?id=b9ec0173
- **Scene displayed size**: 19.06 MB at SuperSplat public scene page. This is *displayed metadata*, **not** independently measured CDN bytes, GPU resident memory, or transfer time.
- **Existing local poster file**: original `ewanqian/portfolio/assets/gaussian-scenes/timer-gaussian-0531.webp` is copied to `VIRTURA-Website/assets/gaussian/timer-gaussian-0531.webp`; exact Git SHA: `4bff6150a7a458af86819779de6e6d4a42515f74`. Existing image is square, featuring black/red/warm-white scene geometry: do not stretch or crop it as a fake 16:9 source.
- **No .ply/.sog/.splat raw TIMER source was found** in the main file trees of Portfolio, VIRTURA-Website, VIRTURA-Collective, VIRTURA-SpacePort. Need actual SuperSplat export or legally accessible official asset before fully self-hosting.
- Other existing scene: Drop Flow/ROOM719 https://superspl.at/scene/36db89a4, public page metadata 210.36 MB; never use this heavier scene as an auto-loading homepage background.
- TIMER 2024 original is collaborative; Gaussian web conversion was a subsequent Ewan Qian spatial study. `VIRTURA-SpacePort/organization/works/timer-series/timer-2026.md` calls AVP Volumetric Desert a **concept/research**. Do not claim a completed AVP-native app or true time-varying 4D Gaussian sequence.

## 2. Recommended stack, with staged adoption

```text
VIRTURA Website / Studio (existing static HTML; keep production stable)
           │
           ├── /space/ — application shell (React 19 + TypeScript + Vite, later if approved)
           │      ├── Navigation + spatial/world registry (normal DOM and CSS)
           │      ├── Selection/inspect drawer / back / saved world state
           │      ├── MediaLayer:
           │      │       poster first → SuperSplat Viewer (PlayCanvas) when activated
           │      │       → Camera / first-frame ready / GPU budget / destroy
           │      ├── World/Station routes and content sheets
           │      └── Device capability detection / reduced-motion fallback
           │
           ├── /works/...  — retained original editorial content and real credits
           └── Cloudflare Pages (static build) + optional R2 for >25MiB blobs
```

**Why not R3F first?** R3F is a React renderer for Three.js, not a Gaussian renderer by itself. Existing content is SuperSplat, whose supported PlayCanvas Viewer already supplies camera animations, annotations, XR on supported devices, SOG delivery/LOD and a load-state API. Rewriting to Three.js before the design is approved creates double framework and file-format risk. Three.js GaussianSplat currently requires WebGPURenderer or its WebGL fallback; the stable Three.js/WebGLRenderer path is not equivalent. R3F v10 WebGPU is alpha as of this research date, while v9 is stable. Use R3F only if a selected world proves the need for true custom composited 3D object/hotspot/physics scenes, and benchmark side-by-side instead of stacking a second full-screen WebGL canvas over an existing viewer.

**Preferred splat implementation:** self-host `@playcanvas/supersplat-viewer` once the scene SOG/export exists. Current API supports `createViewer({container, settings, contentUrl, posterUrl})`, progress and `loaded:changed` signals, animation seeking, camera mode, interaction enable/disable, frame capture, XR toggles and `destroy()`. Do not invent page load readiness. Use one live viewer per screen, destroy when leaving and disable input in ambience mode.

**Short-term PoC:** public iframe `https://superspl.at/s?id=b9ec0173` behind DOM UI; its `load` event only means iframe document loaded, NOT that a splat frame has rendered. Because of cross-origin boundaries, host cannot reliably control orbit/renderer or sense first frame; a fallback poster and explicit opt-in remain mandatory. Not acceptable as a performance-certified production hero.

**Cloudflare:** Cloudflare Pages single-file asset limit is **25 MiB**. The existing scene's displayed 19.06 MB figure does not prove a SOG export fits Pages. If any export exceeds the limit, serve it from R2/public media domain; avoid committing giant PLY to the website repository. Compress / publish SOG; large scenes may use Streamed SOG LOD. Keep camera/export source in a media repository or durable storage, not one opaque HTML blob.

Official sources:
- https://developer.playcanvas.com/user-manual/supersplat/viewer/embedding/
- https://github.com/playcanvas/supersplat-viewer/blob/main/docs/api.md
- https://developer.playcanvas.com/user-manual/supersplat/streaming/
- https://developer.playcanvas.com/user-manual/gaussian-splatting/formats/
- https://developers.cloudflare.com/pages/platform/limits/
- https://threejs.org/docs/pages/GaussianSplat.html
- https://r3f.docs.pmnd.rs/next/getting-started/introduction

## 3. Visual and interaction contract (v05 failure correction)

**The home screen is a spatial product, not an information essay.** It needs three distinct modes:

1. **Arrival / Environment**: full-bleed authored scene; one visible VIRTURA identity, one main action, at most four destination labels (category appears on inspect), no long headings, no repeated English badges. Image and Gaussian communicate the world.
2. **Inspect / World Map**: choose a grounded place from a spatially coherent authored topology. Display only selected world's short name, clear category and current real action. For Balloon, category must be **视听展演与节目空间**; don't assume users know what the name means.
3. **Archive / Studio**: existing editorial articles, credits, videos and supporting technical descriptions remain in layer two/three, via normal routes and overlay panels. Never delete the original pages or move all copy into scene textures.

A working route must be Home → inspect → actual site/scene → Back with context preserved. A true world should have one user input and an observed feedback; an archive link must say archive, not “enter immersive experience.” A single static Gaussian sample with moving camera is **not** automatically a navigable 3D map with collision or additional buildings.

**TIMER homepage visual possibility:** use authentic 3DGS red/black interior as living environment, place small VIRTURA logo and minimal navigation in semantic HTML, show TITLE only when TIMER featured, maintain full-frame screenshot/low-bandwidth fallback. Need creative direction to approve composition: the existing source image is square; a deliberate 16:9 camera render from SuperSplat is required for premium desktop treatment. Do not force the square poster through `object-fit:cover` and cut objects arbitrarily.

## 4. Transitions / loading: concrete rules

- First paint: lightweight image/poster at correct ratio. Desktop may background-load the splat after page is usable, mobile/reduced-motion starts with poster and explicit play button. No blocking navigation while a 20 MB asset loads.
- Camera animation: only after viewer loaded, subtle orbit of **authored** start/end camera poses; pause when tab hidden or reduced motion requested. Do not rotate the entire scene aggressively.
- **A/B scene route:** clicking a station transitions with a 200–400ms visual mask or crossfade (authoring choice), changes actual route URL and world data, and shows its poster immediately. No fabricated loading progress percentage. Fade away the mask only after viewer's first frame reports ready; error path returns to poster + retry.
- Avoid 2 concurrent high-resolution 3DGS viewers; switch poster/environment before tearing down and creating the next viewer, and explicitly free GPU context.
- When linking to independent external apps, avoid simulating an internal scene transition that hides opening a separate site. Show location and mode before leaving.
- AUDIO is opt-in, initially muted; neither ambience nor “healing noise” auto-plays.

## 5. Costs / human and infrastructure resources (planning ranges, not promises)

These are **person-day** orders of magnitude for competent practitioners once source assets and access are ready. They are not a commitment that an Agent will deliver unattended, nor elapsed calendar times. Parallel paths do not reduce manual art direction or physical-device QA.

| Scope | UI/engineering effort | Additional human resources | Meaningful deliverable |
|---|---|---|---|
| A. Public SuperSplat full-screen proof | **0.5–2 engineer-days** | ~0.5 art-direction day | One correct poster/iframe scene, minimal logo/UI, static fallback, basic interaction |
| B. Self-hosted TIMER polished hero | **3–6 engineer-days** | 1–3 art/media days, QA 1–2 days | Exported SOG, hosted viewer, camera animation, reliable first frame, benchmark and mobile fallback |
| C. Shared Space shell and 2D/2.5D map | **7–15 engineer-days** | 3–6 art/UX days, 2–4 QA/editor days | Approved map, accessible destination inspector, 2 real connected routes, bilingual responsive layouts |
| D. Three-mode Space platform + 3 real destinations | **15–30 engineer-days** | 6–12 design/content days, 4–7 QA/device days | Public portal, channels, preserved archive, common shell, 3 validated paths, deployment/rollback |
| E. Custom R3F 3D world and integrated interactive splats | **additional 10–25 engineer-days** | 3D artist & graphics specialist 5–10 days | Only if needed: custom geometry/hotspots/physics/camera integration, device-specific performance |
| F. Identity/cross-device/paid services | Separate discovery + security/ops scope | security/privacy/account/product operations | Not in v06; not a precondition for real spatial portal |

Infrastructure: existing GitHub + Cloudflare Pages can host frontend, static thumbnails and small optimized splats. R2 may be needed for files >25MiB; costs depend on actual storage, requests, egress and plan, and must be measured. Hardware: Windows workstation with discrete GPU is suitable for splat export/benchmark; Mac/Safari and phones must be tested separately; Quest 3 and AVP claims require each real device.

**AI allocation:** OpenCode/Codex can do loaders, build wiring, src audit, QA scripts and PRs. DeepSeek can categorize content / research docs. A human art/experience director still chooses composition, map geography, credits, sound, icon system, and rejects low-fidelity screens. Code generation does **not** remove real asset production or device validation.

## 6. Priority ranking across R01–R10

| Order | Task | Gate |
|---|---|---|
| 0 | **R01/R02 editor-close** | Close baseline/evidence review and preserve existing route QA |
| 1 | **R03 spatial route system** | Define the port's places, categories, edges, URLs, statuses and back navigation; require one usable map interaction |
| 2 | **R04 navigation-first VI** | Approve selected world presentation and short labels, avoiding 4×3 rigidity or documentation-like layouts |
| 3 | **R07 one real route** | SpacePort → verified destination (e.g. Balloon) → Back, desktop/mobile/bilingual acceptance |
| 4 | **R05 source/cover mapping** | Real world assets, art direction, accurate provenance and image fallbacks |
| 5 | **R06 credits and publication truth** | Edition-specific credits and no misleading claims about available apps |
| 6 | **Optional TIMER Gaussian study** | Separate PlayCanvas/iframe benchmark after navigation works; real SOG export and first-frame proof before production background |
| 7 | **R08 IP / world content graph** | World Bible, navigable regions, story/archival links, independent URL conventions |
| 8 | **R09 SDK/account, R10 monetization** | Only after useful routes, measured engagement and operation owner |

**Stop rule:** no visual, WebGL, Gaussian or framework upgrade is eligible to ship if it does not preserve the primary navigation contract. The iframe PoC belongs to an optional graphics experiment, not the product's critical path.

## 7. Hard acceptance gates before changing `/apps/`

- [ ] Source model is a verified exported scene and license-approved for website use; image is not a random generated replacement.
- [ ] A selected **desktop 1440×900**, **mobile 375×812** and **selected-node/transition** art-direction composition exists and is approved.
- [ ] Main viewport has no documentation essay; first scene and action are identifiable without paragraph reading; UI text only in a small inspector when selected.
- [ ] Poster visible before first real splat frame; real completion event from owned viewer (iframe onload alone is **not** acceptable).
- [ ] Network load bytes, first poster, first 3D frame, memory/performance and GPU context disposal are measured at mobile + desktop; never hardcode “smooth on all devices.”
- [ ] At least one world navigation path and one scene control work; focus/keyboard/touch/back routes tested.
- [ ] Both CN/EN states, 375/768/1440 widths, reduced-motion and no-WebGPU fallback passed screenshots.
- [ ] Collaborative TIMER credits and 2026 research status not misrepresented.
- [ ] Preview deployment accessible and signed off; production merge is separately tracked and reversible.
- [ ] No changes to commercial `index.html` original works/people/inquiry without explicit second PR.

**Bottom line:** v06 needs a better visual composition and real viewer readiness. Choosing R3F alone does not produce a product-level VI.
