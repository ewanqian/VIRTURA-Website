# 2026-11-11 · Team biographies and site navigation audit

## Scope / status

User-requested editorial subset of R06: remove the Collaborating Artist distinction and disclaimer-like language from Sihui Xu and Xiaoyao Ma, and present professional biographies alongside the other team members. This does not close R06's wider edition-level credit verification.

Baseline: `401a7b3621663518b81ffd251239e66e984606ee`.
Branch: `fix/team-bios-site-audit-20261111`.
Source change: `1357685393d656cd0fa6e7d9974008ec2feee2b0`.
Status: IN_REVIEW for this subset. No production or full R06 DONE claim. Existing programme tasks and their broader dependencies remain unchanged.

Read before editing: AGENTS.md, docs/pm/VIRTURA-SPACE-PROGRAM-2026-11-07.md, docs/pm/tasks.json and the current index.html; compared the associated personal Profile, navigation, CV manifest and publisher.

## Changed

- Section label: `团队 / Team`.
- Sihui Xu: `媒体艺术 / 交互设计` / `Media Art / Interaction Design`.
- Xiaoyao Ma: `数字影像 / 沉浸式艺术` / `Digital Moving Image / Immersive Art`.
- Bilingual bios now introduce their practice, education and selected presentations. Removed generic statements about separately credited individual and collaborative works from the member cards.

No new founder, employee or director roles were invented. The other four bios, all six existing portraits, image paths, external portfolio links, anchor IDs, seven work cards, CSS, JavaScript and inquiry behaviour are unchanged. Project-level credits have not been removed or reassigned. GitHub diff shows the three intended source-line replacements and a nonfunctional EOF-newline difference only.

## Sources for the two new bios

Checked 2026-11-11:
- https://xusihui.com/about — Art and Technology at China Academy of Art; Shanghai-based practice; game-engine narrative, moving image, audiovisual, interactive and XR work; selected presentation venues.
- https://xiaoyaoma.com/information — Royal Academy of Art, The Hague and Royal College of Art, London; based in Shanghai. No degree level inferred.
- https://xiaoyaoma.com/ — work descriptions and presentations at Frameless and Hockney Gallery.

These support the member bios, not exclusive team ownership of every personal work.

## Navigation / copy findings left for scoped follow-ups

| Priority | Evidence | Repair / acceptance |
|---|---|---|
| P0 | Source branch and deployment are separate; cached page extraction previously did not prove main parity | After merge, verify #people on the actual domain, both bios, all six image decodes, Chinese/English and mobile layout. Record the deployment revision, not only Git merge |
| P1 | index.html delivery paragraphs, workflow copy and inquiry fields contain Chinese without language-specific alternatives; assets/lang.js only switches attributes, buttons and metadata | Complete these English surfaces and test language switching through the inquiry journey |
| P1 | Project form uses mailto:studio@virtura.space and explicitly opens a local email client | Verify mailbox receipt with authorization; add a copy-brief fallback. Do not claim the form directly submits to a server or that delivery was tested |
| P1 | Immersive Destination describes destination/hotel/commercial work but links to the personal Gaussian scene list | Route to a suitable existing case, or label the destination as spatial capture/research. Source proves a semantic mismatch, not a failed HTTP response |
| P2 | Spaces, Collective and SpacePort are separate related entries with overlapping explanations | Clarify existing labels, available/experimental status and return paths. No extra portal or visual redesign |
| P2 | Team member and case pages have different jobs | Keep bios focused on professional practice; use actual project detail pages for edition-specific credits |

## Personal site counterpart

Portfolio PR #157: https://github.com/ewanqian/portfolio/pull/157

It updates bilingual Profile copy, fixes HashRouter chapter links, adds the canonical CV hub and work-card links, and saves the combined audit at:
`docs/portfolio-maintenance-os/handoffs/2026-11-11-profile-navigation-and-two-site-audit.md`.

The personal CV manifest is R1.2.1 / 2026-11-07, whereas the active-practice ledger still carries a 2026-10-29 review and 2026-11-05 next-review date. Fresh file timestamps are not proof that all prose is current. Prioritise ENTROPY post-show documentation, BPM System cross-links, TIMER/Drop Flow edition media and existing spatial-capture cases; preserve historical dates and unfinished-research status.

## Verification and release gate

Performed: complete index source review; source comparison against baseline; official biography source checks; language script and form action inspection. The remote diff contains no layout, behaviour or media modifications.

Not performed: full 375/768/1440 screenshots in both languages, actual browser clicking, production HTTP/asset decode checks for this branch, video playback or email receipt. Connected browser access was unavailable. No screenshot references are fabricated.

Before merge, run the existing static-content gate and review the longer bios at the existing mobile and desktop breakpoints. After merge, verify the real deployment separately. Keep R01 deployment verification and R06's full credit matrix open until their own evidence is complete.

Rollback: revert this scoped PR only; do not reset main or overwrite later work. The previous bios remain in Git history. The production brand and Space redesign gates are untouched.
