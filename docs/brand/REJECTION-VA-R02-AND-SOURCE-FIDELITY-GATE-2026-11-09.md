# Brand fidelity rejection — Virtual Airlines and R02 candidates
**2026-11-09 · status: REJECTED, review evidence only**

## Owner feedback (authoritative review)
> 虚拟航线这个 logo 比例不对 其他的这些细节都不对

**Do not reinterpret this as “minor typography polish.”** R02 brand-vector proposal was structurally inaccurate. Draft [PR #14](https://github.com/ewanqian/VIRTURA-Website/pull/14) was closed **without merge** on 2026-11-09. It passed GitHub static tests and Cloudflare preview construction, but those checks did **not** establish identity fidelity. All R02 vectors remain **rejected experiments, not approved masters**.

## Original and rejected output

| Item | Source / record |
|---|---|
| Untouched source | `va ep02 the nav system(20261107-195845).png`, 2048 × 1024 px |
| Source SHA256 | `9477c497043a9eeb7ccf981bd2d4e086c93f765ec4dfbd22aa9cce893be000a1` |
| Preserved source | ChatGPT Library `/VIRTURA/Brand-Archive/2026-11-08/VIRTURA_SOURCE_IMAGES.zip` |
| Comparison image | ChatGPT Library `/VIRTURA/Brand-Archive/2026-11-08/Key-Visuals/VA-R02-Rejection-2026-11-09/VA-original-vs-R02-rejected.png` |
| Enlarged unredrawn crop | ChatGPT Library `/VIRTURA/Brand-Archive/2026-11-08/Key-Visuals/VA-R02-Rejection-2026-11-09/VA-original-crop-enlarged.png` |
| Rejected attempt | Historical PR #14 `assets/brand-candidates/virtual-airlines/va-orbit-emblem.candidate.svg` — **do not cherry-pick** |
| Original master found? | **No** editable logo file has yet been identified in the four examined repository main trees; this does not rule out the user's local/other cloud files |

### Geometry observations directly supported by the supplied raster

These are approximate **pixel observations**, NOT verified original construction measurements:

- In the 2048×1024 composite, the prominent VA symbol including its thin orbit is roughly **90 px wide** and its solid triangle motif roughly **44 px high**; about **2:1** in visible overall mark proportions. This is a low-resolution source. Cropping and interpolation do not recover hidden source detail.
- A **downward-pointing black/charcoal triangle on the left** with horizontal upper edge, and an **upward-pointing triangle on the right** with horizontal bottom edge.
- The two forms are separated by a **deliberately angled light negative-space strip**. Its slope and width must be traced, not improvised.
- A **very thin, flattened orbital ellipse** passes across the middle, beyond both solids. Its overlaps/occlusions are part of the mark. The R02 ring is too thick and misregistered.
- Fills darken near the tops and lighten toward the bottoms (black → grey). R02 used nearly uniform black, distorting volume and visual weight.
- The **wordmark is two stacked lines**, VIRTUAL / AIRLINES, with generous custom tracking and deliberate distance from the glyph. The Chinese and Japanese applications are *separate lockups*, not automatic Chinese glyph replacements.

R02 got silhouette width, triangle slopes and areas, diagonal gap, ellipse aspect/occlusion, gradient, alignment and font details wrong. Even an optically attractive redesign would still be wrong if it no longer matched the 2024 source.

### Other R02 review faults

- **MOVA:** R02 Arial variant and improvised thin SVG letterforms both lack proof of original geometry, kerning, weight and MUSEUM / OF / VIRTURA / ART micro-typographic proportion. Mark **rejected** pending master/source-overlay review.
- **林中茶屋:** an OS font fallback does not recover the original Chinese headline's design or source architecture; the bordered layered-roof glyph is **NOT** established as a Tea House symbol. Mark **rejected** pending source/master verification.
- **自然疗养中心:** roof-symbol attribution and actual original Chinese/English official naming remain unresolved; no official SVG may be issued.
- **Balloon PR #13:** remains separately **unapproved Draft**, not automatically rejected on the basis of this R02 correction. Its color ratios/letterforms still require independent master-level visual review.

## Release gate for *every* sub-brand (hard requirement)

**G0 — SOURCE:** locate actual native SVG / Adobe Illustrator / Figma / PSD / Blender-UV/material artwork from the original artist/project. A low-res JPEG does **not** count as a recovered vector.
  
**G1 — PIXEL EVIDENCE:** if source master is unavailable, create a source-locked overlay with a stated pixel crop (original width, original native coordinate bounds, normalized viewBox), never treat a generated logo as a trace.

**G2 — SHAPE:** define source-referenced contours, aspect, black/grey gradients, intersections, occluded orbit, widths and negative spaces. Compare separately with source by full-size and scaled overlays; provide an uncertainty list.

**G3 — TYPE:** compare original font glyph structure, kerning, bilingual line breaks and actual wordmark measurements. Do not claim exact typeface from screenshot; Unicode editable text is useful engineering-wise but is **not** historical font fidelity.

**G4 — SMALL SIZES:** check 24/32/48px mark and 512px editorial use, plus 16:9 desktop and mobile site uses. Good 512px view alone does not establish usability.

**G5 — APPROVAL / RIGHTS:** explicit source ownership/permission and visual signoff recorded; then *and only then* label SVG `approved` and allow production imports. A CI green check and a Cloudflare preview are not this signoff.

**Fallback:** until G0–G5 pass, use the authentic original crop only as a **private design reference**; publicly visible pages retain safe prior imagery rather than an unapproved logo.

## Product-level stop rule

No production homepage, map, SpacePort, Balloon, Virtual Airlines, MOVA or Tea House component may import `assets/brand-candidates/**/*.candidate.svg` or any historical PR #14 vector as its official identity. Keep any candidate in an explicitly `design/` review page only, with visible `not approved` language. Documentation may link to closed PRs for reproducibility, but not present them as approved design output.

**Priority:** recover original master(s) → prove correctness by overlay → human review → export approved variations → integrate app UI. **Not** more AI concept artwork, not an open-ended CSS redraw, and not an automated “brand recovery done” milestone.

## Backlog/operational state

- PR #14: **closed, unmerged** (failed art review)
- PR #15: merged source attribution corrections (retained)
- PR #13: Balloon candidate Draft, still needs its **own** review
- R04: VI implementation blocked pending compliant source-derived brand and approved screen design. R05 source audit can continue.
- GitHub Issues API in this repository returns `410 Issues has been disabled`; track the block in `docs/pm/tasks.json` and this file rather than claiming an issue was created.
