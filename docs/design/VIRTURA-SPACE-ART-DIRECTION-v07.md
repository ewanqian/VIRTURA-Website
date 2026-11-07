# VIRTURA Space / Art Direction v07
**Purpose:** Art-direction contract for concept images, high-fidelity UI and website engineering. **Not an approved final VI.** Signoff required before Codex ships components.

## 1. Product and visual promise

**Navigate a real creative world, not shop an app shelf.** A sophisticated online port into architectural places, public artworks, AV clubs, worldbuilding, research and independent experiences. Visitors must be able to *orient, select, inspect, enter, return*. The external Studio home remains a premium black editorial commercial site. They share navigation/type hierarchy and logo; the Space interface has its own embodied map and content behavior, not a generic second website.

- Core emotional tenor: quiet wonder, open-world curiosity, clarity, confidence, plausible architecture; **not** neon cyberpunk, HUD overloading, generic space-helmet, green widgets, identical planet icons, waveform bars, random rooms.
- Palette: black/warm off-white/graphite/silver for system chrome. Scenes may introduce **earned** accent color from their real art (Balloon = performance lighting, Green Belt = natural light, TIMER = actual black/red visual), never a single ubiquitous gradient.
- Material: editorial hairlines, atmospheric depth, soft real light and surfaces, purposeful empty space. World entities should be architecturally coherent, not just points sprinkled in arbitrary geometric lines.
- Identity: existing official Studio logo as baseline; new symbol/mark is a **separate approval request**. Do not invent a final V logo or claim team ownership of AI-generated artwork.

## 2. Three directional hypotheses to compare (not three finalized pages)

### A — The Cartographic Port / 地理化太空港 （recommended first study）
A living, composed schematic/architectural overview with a clear arrival axis and six actual stations from SpacePort. Topology looks physically plausible at a glance: landing concourse, connected museum wing, Balloon performance chamber, teahouse garden, research lab. Camera high 3/4, slight orthographic/isometric tilt, restrained atmospheric lights. The map shows **at most 4 labels in default camera frame**, others appear on selection or by zoom. In a selected state, show a single slender inspector ("太空气球" / "视听展演空间" / "进入"), highlight the route by environment light, not a floating paragraph. This is *authoring evidence* for topography, not a claim that the buildings already exist in source.

### B — The Living Channel Desktop / 有生命的频道桌面
UI references Wii's quick destination selection and iCloud's useful modules **without** defaulting to 4×3. Responsive 12-column composition with *different* cover ratios and weights: large 16:9 spaceport viewport, medium 3:2 Balloon programme, a small 4:3 museum card, 1:1 saved world square only where a launcher icon is actually needed. Functional hints preview real schedule or scene, not imagined statistics; keep labels to 1–3 words and show short category only when focused. No commerce, app prices, lists of 33 assets or giant essay.

### C — Inside Balloon / 太空气球空间（频道内部）
A single destination's meaningful actual experience: atmospheric black performance hall, projection/lighting, a concise programme/Session panel (max 2 lines each), one real playback/entry action, functional back to SpacePort and muted audio control. It must communicate within 3 seconds that this is a **live audiovisual performance and programme space**. It cannot look like a generic gaming UI or generic streaming shop.

## 3. Screens that must exist before production approval

| Screen | Desktop | Mobile | Required behavior |
|---|---|---|---|
| A0 Port overview | 1440×900 | 375×812 | visible identity, 2–4 recognizable places, no essay |
| A1 selected Balloon node | 1440×900 | 375×812 | exact name + type + real next action, clear highlighted origin/destination |
| A2 Balloon station entry | 1440×900 | 375×812 | one valid programme/replay, back, error/loading and accessibility |
| B0 alternative channel directory | 1440×900 | 375×812 | visual hierarchy, meaningful non-square covers, few labels, focus state |
| C0 media experience state | 1440×900 | 375×812 | readable control, opt-in audio, return, real source and credit state |

**Concept images do not count as implementation screenshots or functional proof.** For a 2D concept, show enough design specificity to reproduce in HTML/CSS, but React and render engine decisions remain separate.

## 4. Cover system (non-negotiable, not one square icon)

| Role | Master output | Intent | Rule |
|---|---|---|---|
| **World Key Art** | landscape 16:9 master, target 2560×1440 or better | first impression/port/map cinematic hero | derived from real scene when possible; subject+text safe area; original asset never overwritten |
| **Programme / Episode Poster** | 3:2 master, target 1800×1200; optional 4:5 variant | Balloon session, tea-house/ambient release, studio editorial | date/episode/collaborators live in metadata/DOM, not baked into photography |
| **Scene Thumbnail** | 4:3 master, target 1600×1200 | channel gallery, place archive, performance clips | preserve source-native aspect; optional independent crop with explicit camera choice |
| **Launcher Icon** | 1:1, target 512 & 1024 px | future My Space/app shortcut only | simple distinguishable shape/material, not a square crop of the entire illustration |
| **Map Glyph** | 24/32/48 px scalable SVG | focusable location marker / navigation | one systematic stroke/size rule; no decorative neon badges |
| **Portrait / Art still** | original project ratio | archives/work/artist identities | no forced 16:9, credit source and image mapping verified |

Breakpoints: 1440 desktop vs 768 tablet vs 375 mobile each require deliberate layout, not just `width:100%`. Image focal point may change; never distort the source artwork. `object-fit:cover` is a *display-frame crop*, must be art-directed and not applied to source archive.

### Per-world art bible

- **SpacePort:** architectural port/arrival/connection, visible spatial logic and a navigable primary axis; no undifferentiated random starfield.
- **Balloon:** performance venue/stage/session, sound and light, club identity; captions must say “视听展演空间” for first-time visitors.
- **Green Belt / Tea:** calm place, environmental recording, café/plant life, changing light; do not claim medically proven therapy.
- **MOVA:** gallery/viewing architecture, artist and artwork attribution.
- **TIMER:** real artwork and Gaussian scene; 2024 collaborative original and 2026 spatial research must be edition-credited.
- **SceneForge/ENTROPY:** creative instruments, technical clarity; not headline IP world.

## 5. Minimal copy rules and UI grammar

- Default landing: VIRTURA / SPACE, max 4 labels, up to one sentence in selected inspector, one primary action.
- A world card/selected node must distinguish **proper name** from **functional category**. e.g. `太空气球` + `视听展演空间`. A visitor must not need prior lore.
- Default: no status stamp if it adds no meaning, no repeated "EXPLORE ARCHIVE", no duplicate logo, no generic marketing text.
- The real `Archive / Preview / Playable` state should appear only when critical to not misleading visitors. No fabricated numbers, dates or episode lineup.
- Long-form essays, technical specs, collaboration credit, and station history **are preserved** as secondary web pages and can be opened from inspector detail.
- All interaction states designed: unselected, hover/focus, selected, loading, unsupported, unavailable, returning; keyboard, pointer, touch, reduced-motion.

## 6. Hard fail QA

1. 3-second test: 4 of 5 uninformed reviewers can identify port/world selection and Balloon type without explanation.
2. Focused user task: 4 of 5 can go Arrival → Balloon → public programme → Back without instruction.
3. No more than 4 default readable destination labels and max one selected-state information box on main map.
4. High-fidelity prototype evaluated via real screenshots at 375×812 / 768×1024 / 1440×900; no overflow or unreadable truncated bilingual names.
5. No random icon system, no universal green chrome, no 4×3 mandate, no text-dominant landing, no invented project visuals marketed as existing.
6. Portfolio media and rights independently cleared before public use.
7. Prototype and actual production separated in Git history; no auto-merge based only on tests.

## 7. What Codex actually needs from this brief

The art director provides signed-off screen(s), exact layout measurements, original media URLs/files and visual status references. Codex builds a *vertical slice* with routes and test screenshots; reject if it deviates materially from art-approved composition. First implement just A0, A1 and A2. B and C are explorations rather than mandatory site sections.

No final VI approval has occurred. Do not describe these as a completed design system.
