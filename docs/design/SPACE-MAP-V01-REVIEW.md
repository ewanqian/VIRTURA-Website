# VIRTURA SpacePort — Navigation Map v01 / Review Contract

**Status:** interactive feature branch; not an approved final VI, not yet production.  
**Entry:** `/space/` · **Selected station:** `/space/station.html?id=balloon`  
**Source:** [SpacePort frontstage manifest](https://github.com/ewanqian/VIRTURA-SpacePort/blob/main/stations/frontstage-manifest.json), [station manifest](https://github.com/ewanqian/VIRTURA-SpacePort/blob/main/stations/station-manifest.json), [Station Bible](https://github.com/ewanqian/VIRTURA-SpacePort/blob/main/docs/world-bible/VIRTURA-SPACEPORT-STATION-BIBLE-v1.0.md). `space/worlds.json` is a selected **presentation projection**, not a new canonical world database.

## One sentence

**The primary product is a legible route map with an actual visit-and-return journey, not a Gaussian video wallpaper or a wall of 13 thumbnails.**

### What visitors see

- One dark architectural/map surface, centered A00 Arrival, five related public nodes, each with just its name and station number.
- Selecting one station highlights the route and updates an inspector: **name, what kind of place it is, a short truthful summary and one primary action**.
- `Enter station` opens a second, self-contained visit/entry page (with authentic SpacePort imagery) that offers a real URL to the pre-existing station and a visible return path; the original station can also open in a new tab.
- Browser back restores selected station, the language preference is retained in the URL, arrow keys move node focus and Escape returns to Arrival.
- No universal green palette, 4×3 square-channel mandate, long marketing essay, fictional 3D readiness badge or autoplay sound.

### Station catalogue / Source-aligned access

| ID | Place | Visitor-facing definition | Present link | Status |
|---|---|---|---|---|
| A00 | Orbital Arrival Terminal | 公共导览与路线入口 | `arrival-terminal-v0.1.html` | web graybox/prototype |
| A01 | MOVA | 数字展览与观看空间 | `stations/mova/index.html` | web station / archive |
| A02 | Balloon Live Space | 视听展演与节目空间 | `stations/balloon-live-space/index.html` | web station / archive |
| A03 | T-House / Forest Pavilion | 环境声音与慢速空间体验 | `stations/teahouse-forest-pavilion/index.html` | web station / archive |
| F01 | Research Laboratory | 研究方法与实验设施 | `stations/research-laboratory/index.html` | web station / archive |
| F02 | Knowledge Network | 档案、学习路径与创作工具 | `knowledge-network/index.html` | web station / archive |

All URL paths are observed in the SpacePort Git tree. They **were not verified as HTTP 200** by public web retrieval in this turn; attempts to read representative live paths returned inaccessible. Do not claim Cloudflare's remote SpacePort routes are healthy until an independent browser check confirms them.

We deliberately **exclude Senia from this first navigable route set**: it appears in the Station Bible as a future public route but no stable public HTML destination has been verified. It belongs in world/lore layers until a visitor-facing route is actually ready.

### Geographic truth and aesthetic constraints

Station nodes are laid out in a legible diagram around A00. The data contains percentages `x/y` for a **curated functional map**, not real survey coordinates, distances, or a published CAD master plan. Station adjacency is based on the station manifest's `related_stations` links, and `sourcePath` preserves provenance. The product must not claim that a viewer can physically walk between these points in an already completed 3D world.

The map UI deliberately employs *world-map grammar* instead of a rectangular app shelf: route arcs, station codes, distinct architectural source images, small visible labels, one selected inspector, an accessible station sheet. The current abstract layout is a functional proof. A final visual destination requires art direction of true port geography, architecture, hierarchy and cover standards.

### Why this is more than a cosmetic mockup

1. `space/worlds.json` defines world IDs, source, actual URL, ownership context, category, mode, related nodes, optional secondary programmes and a coordinate disclaimer.
2. `space/map.js` constructs the map from data and supports selection, focus/arrow navigation, browser history, language and route highlight.
3. `space/station.js` resolves a selected route, shows the real project image, links to the current station web page/programme, and returns to the original selected node.
4. It is standalone static HTML/CSS/JS for the existing Cloudflare Pages project; no React, R3F, authentication or Gaussian viewer needed to make the map work.

### Product QA gate (before any merge)

- [ ] Automated `node scripts/qa-space-route-map.mjs` succeeds; every station has a unique ID, correct source/provenance, canonical actual links, existing original image and valid JS.
- [ ] Real screenshots at 375×812, 768×1024, 1440×900 show no clipped stations, no overlap with labels/legend, no horizontal scrolling and not more than one concise inspector panel.
- [ ] **Critical path:** select Balloon → see '视听展演与节目空间' → enter station → return to the same Balloon selection. Test on desktop and mobile.
- [ ] Keyboard arrows/Tab + Escape work; Chinese/English state stays consistent across map and station.
- [ ] Every featured node's public external station URL is manually or automatically verified to open successfully, with a valid fallback if remote SpacePort is unavailable.
- [ ] Gallery and programme links actually have content and rights to show; station image source correct.
- [ ] Existing Studio `index.html`, works, people, contact form and legacy `/apps/` remain unchanged.
- [ ] Design owner explicitly approves visual composition and whether this map should replace `/apps/`. **This PR must not automatically redirect legacy routes.**
- [ ] Cloudflare preview confirmed by actual browser, then after merge verify production route and rollback SHA separately.

### Routing contract for Codex / HiKu

**Local:** inspect preview screenshot and publish exact failures via separate minimal fix PRs; run all sizes; verify Cloudflare URL; preserve station source references.  
**Online:** assess whether the map represents the intended SpacePort geography and world hierarchy; approve interface typography/visual treatment and how many nodes should be public.  
**Stop condition:** if the click→inspect→enter→return flow fails, do not add Gaussian, R3F, My Space, login, a new store or more world assets. Real functionality wins over decorative polish.

### Next steps after visual signoff

- R03: refine the topology into a more authored port map; connect station icons to visual art direction. No ungrounded coordinates.
- R04: extract shared nav/VI tokens so Studio/Space appear to belong to one brand without changing the existing black Studio home blindly.
- R05/R07: verify source imagery and actual station URLs; promote sites from archive to playable only on observed input/output evidence.
- R08: attach deeper 3D/WebXR/Gaussian viewers as optional rendering modes per destination. The route layer remains functional with them disabled.
