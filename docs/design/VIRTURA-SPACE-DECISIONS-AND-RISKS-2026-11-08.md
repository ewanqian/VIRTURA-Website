# VIRTURA Space / Design Decision Ledger
**Checkpoint: 2026-11-08 · owner-informed, evidence-graded · status: source of accepted constraints, NOT approved final artwork**

This ledger captures high-value decisions lost between chat, disconnected PRs and visual experiments. Future agents **must read it before designing**, and must not mark research examples as an approved VI.

## 0. Recoverable sources and what was already saved

| Area | Existing durable source | State |
|---|---|---|
| Studio identity baseline | `brand-spec.md`; `index.html` | black/off-white, cinematic editorial, original commercial landing page |
| Service architecture / Wii/iCloud references | `docs/site-upgrade/VIRTURA-SPACES-SERVICE-DESIGN-2026.md` | research, not a built operating system |
| 33 candidate works and experiments | `data/space-asset-inventory-2026.json` | source-grounded inventory, **not live verification** |
| 13 curated app entries | `apps/store-registry.json` | code and links, no account/payment readiness |
| Platform/SDK | `docs/site-upgrade/SPACES-STORE-SDK-ACCOUNT-DESIGN-2026.md`; `apps/sdk/` | proposal / local-save first |
| World-as-media-channel | `docs/design/SPACE-CHANNEL-IP-OPERATING-MODEL.md` | IP/audio/video release idea documented |
| v05 VI and concept | `docs/design/VIRTURA-VI-v05-2026.md`; `design/space-v05-preview.html`; PR #7 | **explicitly rejected** as final interface by owner after preview |
| TIMER splat feasibility | PR #8 `design/v06-spatial-navigation-acceptance-20261108`, `docs/design/VIRTURA-V06-GAUSSIAN-TECH-DECISION.md` | research **not merged**; Gaussian optional |
| SpacePort 6-node navigable code | PR #9 `feature/spaceport-navigation-v01-20261108`, `docs/design/SPACE-MAP-V01-REVIEW.md` | interactive proof **not merged**; visual composition **rejected as final quality** |
| Baseline and portfolio QA transfer | PR #5 / #6, `docs/pm/evidence/R01-...` / `R02-...` | merged evidence; task queue still IN_REVIEW pending editorial closure |
| Program + local router | `docs/pm/tasks.json`, `docs/pm/HIKU-HANDOFF.md`, `AGENTS.md` | existing 10-track task machinery |

**Risk:** PR #8/#9-only conclusions are **not present on main**. This ledger records the decision and links but does not silently merge rejected prototypes.

## 1. Owner-approved product invariants (explicit)

1. **The core is a navigable spatial world / map and real destinations.** Gaussian/3DGS is a visual option, not the navigation architecture or top priority.
2. **Space is not a Store**. It is a digital port/world, curation platform and cross-app entry point. Studio commercial work remains credible and separately accessible.
3. **SpacePort gets priority**. Balloon is labeled `视听展演与节目空间` (not an unexplained code name). Green Belt/Tea House, MOVA, research and archive can be nodes. Shanhai Fusheng is associated work, lower in the hierarchy and accurately credited.
4. **No global green-tinted interface.** Retain Studio black frame, off-white type, real imagery, cinematic composition; each IP can express its own unique art direction.
5. **No rigid 4×3 square grid rule.** Wii is a navigation precedent, not a literal template. Large/medium/small scenic covers and spatial map regions are allowed; proportions must be designed with actual media.
6. **No explanatory essay on the landing viewport.** Names/categories/selected action are revealed contextually. Long descriptions, legal credits, technical status and theory belong in secondary sheets / archives.
7. **Original source media and artwork ownership must be preserved.** TIMER/Drop Flow edition-specific team credits; artist projects not automatically owned by the collective; client spaces require permission.
8. **One authentic end-to-end journey first**: Arrival → select Balloon → understand it is a live audiovisual performance/channel → open actual session/experience → return in context. No app icon/inventory count as progress without it.
9. **Preserve old Studio content and URLs.** Do not overwrite original home, works, people, inquiry and archives to chase visual trends; staged route migration and rollback.
10. **No fake readiness**. Code existence, CI success, Cloudflare build success, visual acceptance and public browser/Quest/AVP usability are separate release states.

## 2. Negative decisions: DO NOT repeat

- v05: oversized VIRTURA SPACE title, long arrival paragraph, section-index essays, endless repeated status/CTA badges, green/gray standalone app styling. It looks like a pitch deck, not a world interface. **Rejected**.
- PR #9 map: abstract node-circle + dashed-lines/inspector UI works as an interaction test only; **not an approved visual map, geographic design, mature iCloud-like product or game-grade interface**.
- 4×3 Wii imitation: force-fitting all work into same square tile form is arbitrary. Need deliberate visual importance, landscape poster/portrait material, map and selection behavior.
- AI image generation alone cannot establish art direction or real in-world city geometry. Use it as **concept exploration**. Never call those images production project screenshots.
- A polished static background, SuperSplat iframe, or 3D canvas **does not** substitute the map, true destinations or working interactions.
- Do not automatically generate empty creator accounts, weekly schedules, fake recent updates, payment gates, financial institutions, 3D platform claims or wellness efficacy.
- Don't solve visual failure by adding a more powerful model without design references and human rejection criteria.

## 3. Missing / high-risk information to secure next

| Risk | Impact | Current evidence / next capture |
|---|---|---|
| **P0: final direction not signed off** | every model invents its own UI | first approve 2–3 actual desktop and mobile visual directions; record owner selection and rejected patterns |
| **P0: authored port geography / visual grammar not approved** | generic dot-map keeps returning | use SpacePort Station Bible + actual building/blockout + real world adjacency; coordinates in PR #9 are *editorial schematic*, not surveyed or production topology |
| **P0: media source matrix incomplete** | wrong art/poor covers | asset/hash/edition/rights/ratio matrix, 2–3 hero-quality source images per flagship world; CI image decode and human scene review |
| **P0: public SpacePort URL checks incomplete** | fake live experience | test external routes, mobile/keyboard return; PR #9 source links are present in repo but not all HTTP-verified |
| **P0: rejected branches may be merged accidentally** | old v05 or green Store becomes production | explicitly hold `deploy/space-v05-as-public-entry-20261108`; PR #8/#9 remain review-only, no production reroute without design approval |
| **P0: team/person/edition credits** | reputational and license risk | TIMER original collaborative 2024 vs later Gaussian Ewan spatial research; Balloon sessions' rights and client-produced work permission |
| **P1: Gaussian original source/export** | can't self-host accurate 3DGS | Portfolio stores public SuperSplat TIMER 0531 scene `b9ec0173`, poster and iframe; raw SOG/PLY export not observed in repo; rendered camera motion ≠ animated 4DGS |
| **P1: personal Portal / cross-device identity** | privacy/security | current My Space localStorage only; no OAuth, Workers/D1 or entitlements verified |
| **P1: performance profile and screens** | high quality not measurable | 375/768/1440 + keyboard/locale/overflow + device conditions; map must pass user path; real browser screenshot required |
| **P1: content IP channels** | empty social accounts | SpacePort / Balloon / Green Belt café need owner, original/licensed audio, one finished release and actual repeatable editorial process |
| **P2: platform pricing and model efficiency** | unreliable budget | 40–90 task cycles and 25–50 human person-days for polished 2D/2.5D are *planning estimates*, not a benchmark; model Go lineup needs fresh in-product confirmation before purchase |

## 4. Reference principles and exact transfer

| Reference | Keep | Don't copy |
|---|---|---|
| Nintendo Wii Menu | places recognizable as channels, navigation/return, focus, low cognitive load | Wii branding, always-square 4×3 as a universal visual law |
| iCloud.com | rearrange/useful previews, consistent shell, quick access without full page transition | random widget collection in lieu of spatial map |
| Bungie Destiny Director | authored destination hierarchy, context-on-selection, coherent routes and responsive cursor | spaceship HUD clutter, dense text or meaningless linked nodes |
| Star Citizen / ARK Starmap | spatial graph and world/station context; navigation driven by actual places | huge sci-fi visuals without useable routes; don't claim verified real cartography |
| New Art City | one artwork/curator world per site; independently visitable spaces and archive relation | every institution needing heavy WebGL by default |
| Panic Playdate / Fortnite / Roblox asset systems | system chrome consistent, per-app identity distinct; launcher icon vs landscape hero are separate assets | all apps share one auto-generated square card |
| Apple product pages | proof-led media, systematic pacing, editorial rigor and few key actions | using scrolling prose as a replacement for interaction |

Public research links are in `docs/design/VIRTURA-VI-v05-2026.md` and the unmerged v06 design tech doc. Vendor UI technology rumors (e.g. iCloud exact React version) are not design evidence; confirm independently before asserting.

## 5. Design completion is not code completion

Design is ready for Codex **only when** there are:
- 1 approved primary art direction and its precise rejection set;
- desktop arrival, selected Balloon state, station entry, and mobile equivalents with real hierarchy;
- typography/gutters/panel states/icons/scene cover rules, real project imagery or explicitly labeled conceptual placeholder;
- real route/asset and credit registry; error/loading and fallback behaviors;
- task-specific screenshots at 375 / 768 / 1440 and test scripts.

No high-fidelity approval → implementation **BLOCKED**. Successful tests → engineering QA, **not** visual or production approval.

## 6. Next deliverables

A. See [art-direction brief](./VIRTURA-SPACE-ART-DIRECTION-v07.md) for three screen concepts, image standards and human review.
B. See [prompt pack](./VIRTURA-SPACE-PROMPT-PACK-v07.md) for image generation and Codex handoff prompts.
C. Preserve related code PR #8/#9 and original assets. Do not merge them into production homepage until a direction is chosen and real visit/return accepted.

**Files on main here represent recorded research & constraints, not a launched Space operating system.**
