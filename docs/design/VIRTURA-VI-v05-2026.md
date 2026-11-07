# VIRTURA Space — Identity & Interaction v05

**Status:** 2026-11-08 / unapproved visual proposal. Prototype: ../../design/space-v05-preview.html . Does not replace production.

## Product principle

VIRTURA is one studio with a coherent space-universe. Studio presents actual work and inquiry. Space is a navigable portal into places, not an App Store. SpacePort first; experiences and exhibitions next; people/artworks and archives follow; SceneForge, workshops, SDK are supporting instruments. Associated individual projects such as Shanhai Fusheng are clearly credited and not given the headline role.

## Current defects grounded in repository

- Studio brand-spec.md: #0b0b0b, #f3f3ef, thin line, sharp 12-column asymmetry and cinematic imagery.
- apps/index.html uses dark green #111615 and multiple tinted cards; apps/store.html uses #111714, #1b2420, #cce0c3, and separate UI. My Space and catalog add more unrelated CSS.
- All app pages have their own header and inline CSS. R01 captured that four apps pages do not respond to the main site English language preference; small-screen root and tablet Atlas overflow.
- The visual prototype cannot be called deployed or accepted until staged browser screenshots and functionality tests pass.

## Reference research — learn behaviors, not branding

| Reference | Transferable idea | Reject |
|---|---|---|
| Nintendo Wii Menu | Recognizable destination channels, consistent pointer/selection, arrangement and return; 4×3 paged grid | Wii icon logos, colors, sounds, literal menu clone |
| Apple iCloud.com | Tiles can show real data, move, change and expose quick actions | A tile wall without meaningful worlds |
| Panic Playdate | Launcher is legible and playful but system UI recedes to the game art; unique launcher cards | Same generic icon for every world |
| Destiny UI (Bungie GDC) | Pointer/focus and map or Director with clear novice/expert layers and icon production pipeline | Excessive sci-fi HUD clutter |
| Twined After Hours | Studio direct-service route + optional navigable 3D city with each stop a job | A slow required 3D homepage |
| Are.na channels | Curated nested content with individual/group ownership and collaborators | Treating indexed media as VIRTURA exclusive IP |
| Steam Library | Actual recent activity, updates, collections, favorites | Fake recent activity, empty personalized recommendations |

Sources: https://www.nintendo.com/en-gb/Wii/Wii-Channels/Wii-Menu/Wii-Menu-749371.html ; https://support.apple.com/en-mo/guide/icloud/mm048a5aa9cc/icloud ; https://help.play.date/developer/designing-for-playdate/ ; https://www.gdcvault.com/play/1023107/Tenacious-Design-and-The-Interface ; https://www.twined.io/work/after-hours ; https://help.are.na/docs/getting-started/channels ; https://store.steampowered.com/libraryupdate

## VI rules

**Invariant (all surfaces):** logo geometry, layout grid, typography rhythm, top navigation, system actions, focus, URL/route, credits and content statuses remain coherent.

**Variable by world:** architecture, environment media, ambience sound, controlled palette, naming, clock/calendar/weather fiction. Distinctive media first; never recolor all worlds into one green UI.

| Token | Proposed value | Purpose |
|---|---|---|
| Base | #08090A | Space chrome/night |
| Secondary | #111215 | Deep panel |
| Foreground | #EEEDE6 | Legible content |
| Secondary text | #A5A8AA | Captions |
| Rule | #464748 | Edges |
| Light contrast | #D6D4CE | Equipment/technical paper |
| Gutters | clamp(20px,4.2vw,72px) | Shared alignment |
| Accent | unique to each real source space | Never global brand tint |

Type: existing Arial/Helvetica/PingFang SC until official brand font/license decision; no random futuristic fonts. Header and UI elements are compact, editorial headlines can be oversized. Hero media uses real high-quality archived source photography and keeps original intrinsic file ratio; architectural preview frames may intentionally crop with object-position approval but the original is untouched.

Icons are THREE DIFFERENT ASSETS: utility icon (24/48 px controlled stroke); world launcher cover (1:1 original geometries 512 and 1024 px, real unique world); destination hero (natural wide frame, 16:9 only when suitable). No identical spheres, waveform bars, default neon, shallow generator templates.

## Templates (complete visual system, not just a homepage)

1. Studio: black editorial commercial entry; existing hero, selected projects, people and inquiry remain guarded.
2. Space Arrival: one lead environment (SpacePort) + two clear operations, sub-navigation and current build state.
3. World Channel: environmental header, what you can do now, scene/episode/station menu, credits, diary and a return route.
4. Archive / Atlas: calm type-driven node index with versioned works/credits and connections; not an app store.
5. Live Station (Balloon): shows actual program/replay entries, dates, sound controls and playable/archived status.
6. Equipment: light schematic section for SceneForge/ENTROPY/Workshop/SDK; user sees examples and one real action.
7. My Space (later): saved worlds and recent visits, no account required initially; cloud identity only after explicit backend/privacy plan.

## Product and content hierarchy

SpacePort > accessible worlds/locations > live stations & exhibitions > group artworks TIMER/Drop Flow > artists/archives > optional tools/workshops > developer instruments. Shanhai Fusheng may appear in Atlas/guest projects lower down, never as the owned flagship. Planet/greenbelt healing café and Senia remain developmental until public browser experience proves access.

**Copy contract for every public card:** (1) name as artists know it, (2) what it is, (3) what visitor can actually do today, (4) why it belongs in the world, (5) status / owner / edition. State markdown-only as Archive, prototype as Preview, live playable only after a measured action result. Never write 'immersive 3D' for a GitHub README link.

## 'Game-level' required interactions

- Home: first-visit comprehension in one viewport; real scene/feature map; zero fake controls.
- Enter: known loading/progress and device requirements; action, cancel, exit, default no autoplay audio.
- World: at least one observed interaction→response cycle; content metadata and release notes.
- Return: context-preserving navigation, keyboard and mouse/touch, fallback for low-power devices.
- Errors: empty/offline/unsupported WebXR states, captions and image fallback.
- AAA-inspired production rigor must not become 3D-on-every-screen complexity; use progressive enhancement on Quest/AVP only after real device tests.

**QA targets, not measured facts:** widths 375/768/1440; zh/en; image decode, native media ratio, no overflow; meaningful focus states and controls; minimum WCAG 2.2 pointer target 24px where relevant and 44px preferred for touch; LCP at most 2.5s, INP at most 200ms, CLS at most 0.1 for real-user web vitals. Real screenshots and preview branch before any merge. No automatic audio and no claims of clinical benefits for soothing soundscapes.

References: https://www.w3.org/TR/WCAG22/ ; https://developers.google.com/search/docs/appearance/core-web-vitals ; https://developer.apple.com/design/human-interface-guidelines/windows

## Architecture / backwards compatibility

Proposed (not yet implemented): root Studio stays; /space becomes portal; /space/<world-id> per destination; /atlas for works/people/editions; /equipment for creative instruments; /my-space for user-saved spots. Existing /apps/, /apps/store.html, /apps/my-space.html, /apps/catalog.html remain until each has a route-map and tested redirect. Do not issue a one-shot redirect. SpacePort can keep its own deploy/repo, with canonical link to main Space shell.

## Approval gates

D0: accept R01 and R02 evidence, review unresolved overflow, i18n and rollback.
D1: evaluate this VI v05 preview against alternatives; approve brand grammar and world hierarchy.
D2: create shared header, grid/tokens, focus and return shell in a small non-production PR; no edit to existing Studio hero.
D3: migrate Spaces first, preserving deep routes and redoing verified 375/768/1440 screenshots both languages.
D4: only after proof, promote Space entry in main Studio homepage without losing original case/people/form content.
D5: validate public Cloudflare production independently; editor approves complete world paths and media rights.

**The current v05 HTML is a design experiment only. No real browser interaction, WebXR, rights or production acceptance has been claimed.**
