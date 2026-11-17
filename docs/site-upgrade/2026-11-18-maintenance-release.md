# Whole-site maintenance · 2026-11-18

Task: R01 (deployment truth and rollback). Status: **IN_REVIEW** — isolated maintenance files are prepared; preview, production and the final organization handover remain separate gates.

## Current instruction supersedes the earlier announcement

The owner changed the request before the previous small-banner PR was merged:

- The public website should show only a maintenance page for approximately one month.
- Old projects, Apps, people, contact forms and activity links should not remain public routes on this deployment.
- The previous website source must be preserved for ongoing development and later reopening.
- Do not promise a specific reopening date. The approved public sentence is: **本轮更新预计持续约一个月，重新开放时间将另行公布。**

The earlier banner and `upgrade.html` are not the release target. `index.html` at the repository root has been restored exactly to baseline `98ba8737767f257a9f1d59d0fd476fcd1a96634e`; the unmerged upgrade page is removed. No old content is copied into a public archive route.

## Verified website source and archive

- Active newer source: https://github.com/ewanqian/VIRTURA-Website
- Baseline main commit: `98ba8737767f257a9f1d59d0fd476fcd1a96634e`.
- Baseline homepage and the pre-maintenance public response were byte-for-byte identical: **63,179 bytes**, SHA-256 `4d5824d2bcb7b902993a0fa9b656146f3d58db9b0d6764c041de2eda88b1d637`.
- The restored root `index.html` has that same hash. Apps, people, project pages, images and existing source checks remain in the repository.
- Preservation branch: [`archive/pre-maintenance-20261118`](https://github.com/ewanqian/VIRTURA-Website/tree/archive/pre-maintenance-20261118).
- Existing deployment documentation and the baseline GitHub check identify Cloudflare Pages project `virtura-website`. The baseline check succeeded; it does not prove this new maintenance version is deployed.
- The current connection successfully created the maintenance branch in this personal repository. The user confirms they are the organization Owner; the current GitHub App installation is scoped to the personal account, and organization integration write attempts still returned 403. This is an integration-authorization blocker. The final organization source transition is **not complete**.

## Repository map and retained work

| Repository | Verified role | Maintenance / handover action |
|---|---|---|
| [`ewanqian/VIRTURA-Website`](https://github.com/ewanqian/VIRTURA-Website) | ID `1449186106`; newer website source matching the existing public homepage | Prepare this preserved source and the isolated maintenance output |
| [`VIRTURA-SPACEPORT/VIRTURA-Website`](https://github.com/VIRTURA-SPACEPORT/VIRTURA-Website) | ID `1314662775`; transferred older copy at `069e61a3e047dd0335783e4ac9f980096d373237`; owner-selected canonical destination | Reconcile the newer history and deployment after integration authorization; do not replace the newer source with this older homepage |
| [`VIRTURA-SPACEPORT/VIRTURA-SpacePort`](https://github.com/VIRTURA-SPACEPORT/VIRTURA-SpacePort) | Transferred SpacePort project with the account/Apps plans and foundation branch | Retain the existing execution issues and code |
| [`VIRTURA-SPACEPORT/VIRTURA-SPACE`](https://github.com/VIRTURA-SPACEPORT/VIRTURA-SPACE) | New, currently empty platform repository | Future repository role requires an explicit choice; empty does not mean work was lost |

Retained SpacePort issues: [#21 Web System 1.0](https://github.com/VIRTURA-SPACEPORT/VIRTURA-SpacePort/issues/21), [#22 authentication and personal records](https://github.com/VIRTURA-SPACEPORT/VIRTURA-SpacePort/issues/22), [#23 Luma and activity resources](https://github.com/VIRTURA-SPACEPORT/VIRTURA-SpacePort/issues/23), [#24 collaboration covenant and project ledgers](https://github.com/VIRTURA-SPACEPORT/VIRTURA-SpacePort/issues/24).

The account foundation remains on `feat/virtura-id-foundation-20261118`; source existence is not a released cloud account service.

## Deployment artifact

`wrangler.toml` targets the existing project name `virtura-website`, declares `pages_build_output_dir = "./maintenance"` and sets compatibility date `2026-11-01`. The production output contains exactly three files:

| File | Purpose |
|---|---|
| `maintenance/index.html` | Self-contained Chinese/English maintenance page with the original white logo embedded unchanged |
| `maintenance/_redirects` | `/* / 200`, explicitly proxying every legacy path to the current root maintenance asset |
| `maintenance/_headers` | `Cache-Control: no-store` on all output routes |

The root source, Apps, images and documentation are outside this output. No Worker, Functions quota, external dependency, navigation, Luma link, form, login or paid feature is added. No DNS or access policy is changed. No robots or noindex restriction is introduced.

The earlier four-file preview failed legacy-path verification: `/apps/` returned 404, and Cloudflare's redirect parser rejected `/* /index.html 200` as an infinite-loop rule. The correction removes `maintenance/404.html` and changes the proxy destination to `/`. An explicit root proxy is retained so a missing legacy path resolves to the current root asset instead of relying on a not-found path that may consult preserved assets from older deployments. This is a routing fix awaiting a new preview; it is not a claim that preview or production has passed.

Wrangler source configuration is not itself proof of the deployed output. The actual PR preview must establish that Cloudflare used `./maintenance`, and the live route checks below must confirm that former paths no longer return old content.

## Local checks

- `node scripts/qa-site-static.mjs`: unchanged original source gate, **0 errors / 0 media warnings**. It validates the preserved source, not public maintenance routing.
- `python scripts/brand/qa_rejected_brand_candidates.py`: unchanged brand gate, passed.
- `node scripts/qa-maintenance.mjs`: three-file output allowlist with no top-level 404, approved copy and marker, original embedded logo, no navigation/external requests, correct Wrangler directory and root-proxy/header configuration, passed locally. The online thirteen-path and HEAD requirements are unchanged.
- `git diff --check`: passed.
- [Actual command output](../pm/evidence/r01/maintenance-static-20261118.txt).

No original CI workflow, protected-homepage requirement or quality rule was relaxed to make this maintenance release pass. The root homepage remains intact and outside the deployment output.

## Preview and production gates

1. Confirm the exact new commit's Cloudflare build succeeds and uses `./maintenance`.
2. Open the preview at 375 / 768 / 1440 px, test Chinese/English, keyboard focus and logo proportions.
3. Run `MAINTENANCE_ORIGIN=https://<observed-preview-host> node scripts/qa-maintenance.mjs`. This requests the root, legacy Apps and work URLs, both existing registry JSON paths, `docs/pm/tasks.json`, a former image URL, the removed upgrade URL and a missing route; each must show maintenance with `no-store`. It also checks HEAD.
4. Merge only the reviewed change. Confirm the same route behavior on `https://virtura.space` and `https://www.virtura.space` after deployment.
5. Keep R01 pending while any required preview, production or organization-handover evidence is missing. Do not claim the organization has become the active deployment source from repository metadata alone.

Earlier immutable deployment URLs, other repositories, independent subdomains and third-party copies are outside the main-domain route check. This release does not claim to erase historical public copies.

## Organization handover gate

The owner-selected canonical destination is `VIRTURA-SPACEPORT/VIRTURA-Website`. The immediate maintenance release uses the current working live deployment source while integration authorization is resolved. The organization source must retain the newer website history and the saved pre-maintenance baseline. Verify the exact repository ID and organization GitHub App permission, reconcile the newer history, then verify the Cloudflare repository/branch/build source and repeat preview and public-domain checks. The two same-named Website repositories must not be mistaken for one another.

Do not merge the older organization source over the newer source, claim a transfer completed through a failed 403, or create another independent site without an agreed handover path.

## Reopening / rollback

The preservation baseline is `98ba8737767f257a9f1d59d0fd476fcd1a96634e` and the saved archive branch above. Reopening is a separate release:

1. Finish and review the new website against the retained source.
2. Intentionally change the Pages output back to the approved website build directory, with preview evidence.
3. Remove the maintenance rewrite/header output from the selected deployment.
4. Verify real projects, Apps, images, languages and inquiry behavior on the public domain.

Deleting `wrangler.toml` or applying a normal Git revert does not automatically restore the Pages build configuration. For an incorrect maintenance release, either restore a previously verified deployment, or retain an explicit Wrangler configuration and set `pages_build_output_dir` back to the approved website directory (for example, `.` when the repository root is the intended output). Verify the resulting preview and its routes before publishing, then verify the public domain. Retain the archive branch; do not delete or regenerate the historical source.


## Verified corrected preview · 2026-11-18

Commit `2f8b81c3ea2ba6e1a57b52c16823508b5e3ce407` passed Cloudflare Pages, `verify`, and `candidate-production-gate`. Its exact preview is https://d5e71ee8.virtura-website.pages.dev. The corrected three-file artifact passed all thirteen GET routes and HEAD, with HTTP 200 and `Cache-Control: no-store`. Every GET returned HTML byte-for-byte equal to the current maintenance page (18,276 bytes; SHA-256 `07d3a2b89ff4952f689a8f0d6d2946ebf9c8ae703ac043d00815f0574bd9a8ca`). See [HTTP evidence](../pm/evidence/r01/maintenance-preview-20261118.json).

The repository live QA also passed with `NODE_USE_ENV_PROXY=1 MAINTENANCE_ORIGIN=https://d5e71ee8.virtura-website.pages.dev node scripts/qa-maintenance.mjs`. The proxy setting uses the execution environment's existing network configuration; the first default Node fetch timed out before any route result. No routing assertion was relaxed.

Browser review verified both languages, Tab/Enter language selection, visible keyboard focus, the original logo proportions, and no horizontal overflow at the observed desktop viewport 1363×936. Browser zoom additionally exercised CSS widths 681 and 340 with no horizontal overflow; these are recorded as zoom-based checks, not claimed as exact 375/768/1440 device emulation. Screenshots: [Chinese](../pm/evidence/r01/maintenance-preview-zh-20261118.jpg), [English](../pm/evidence/r01/maintenance-preview-en-20261118.jpg). The maintenance HTML was unchanged between the initial visual preview and corrected routing preview.

This evidence authorizes assessment of the temporary maintenance artifact only. Production still requires a main merge and public-domain verification; organization source handover remains blocked by the current integration's organization access. R01 therefore remains IN_REVIEW.
