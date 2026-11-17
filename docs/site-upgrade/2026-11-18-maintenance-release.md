# Website maintenance announcement · 2026-11-18

Task: R01 (deployment truth and rollback). Status: IN_REVIEW — local source prepared; preview and production confirmation remain separate gates.

## Verified source

- Active source repository: https://github.com/ewanqian/VIRTURA-Website
- Baseline main commit: `98ba8737767f257a9f1d59d0fd476fcd1a96634e`.
- The baseline `index.html` and the HTTPS response from `https://virtura.space/` were byte-for-byte identical: **63,179 bytes**, SHA-256 `4d5824d2bcb7b902993a0fa9b656146f3d58db9b0d6764c041de2eda88b1d637`.
- The domain response was HTTP 200 when requested with a browser User-Agent.
- The transferred repository `VIRTURA-SPACEPORT/VIRTURA-Website` is a different, older copy at `069e61a3e047dd0335783e4ac9f980096d373237`. Its 59,111-byte homepage lacks the live Apps navigation, two later people entries and related-link changes. It must not be used to overwrite this production source.
- Existing deployment documentation names Cloudflare Pages project `virtura-website` and production branch `main`. The baseline commit's GitHub check reports **Cloudflare Pages: success** for that project. This is evidence for the existing baseline, not for the new announcement; the deployment gates below must still be checked.
- Remote branch `chore/upgrade-notice-20261118` was successfully created in this personal repository through the current connection, confirming actual branch-write access here.

This release adds a small announcement to the verified source; it does not migrate ownership or change DNS.

## Repository map and retained work

| Repository | Verified role | Action for this release |
|---|---|---|
| [`ewanqian/VIRTURA-Website`](https://github.com/ewanqian/VIRTURA-Website) | Repository ID `1449186106`; active, newer website source matching the public homepage | Apply the small announcement here |
| [`VIRTURA-SPACEPORT/VIRTURA-Website`](https://github.com/VIRTURA-SPACEPORT/VIRTURA-Website) | Repository ID `1314662775`; transferred older source with the same repository name | Retain as historical source; do not use it to overwrite the active website |
| [`VIRTURA-SPACEPORT/VIRTURA-SpacePort`](https://github.com/VIRTURA-SPACEPORT/VIRTURA-SpacePort) | Transferred SpacePort project; account/Apps/coordination plans and the foundation branch are retained here | Use existing work and issues; do not recreate the account work in the older website copy |
| [`VIRTURA-SPACEPORT/VIRTURA-SPACE`](https://github.com/VIRTURA-SPACEPORT/VIRTURA-SPACE) | New, currently empty platform repository | Future destination to decide; its empty state is not evidence that SpacePort files were lost |

Retained execution issues in SpacePort:

- [#21 — Web System 1.0 / VIRTURA ID and Collective Network](https://github.com/VIRTURA-SPACEPORT/VIRTURA-SpacePort/issues/21)
- [#22 — Email authentication, collections/progress and isolation](https://github.com/VIRTURA-SPACEPORT/VIRTURA-SpacePort/issues/22)
- [#23 — Luma, event resources and personal records](https://github.com/VIRTURA-SPACEPORT/VIRTURA-SpacePort/issues/23)
- [#24 — Collaboration covenant, proposal cards and project ledgers](https://github.com/VIRTURA-SPACEPORT/VIRTURA-SpacePort/issues/24)

Account foundation source is on `feat/virtura-id-foundation-20261118`, including `docs/site-upgrade/2026-11-18-network/` and `updates/network-upgrade/index.html`. A feature branch and its public UI prototype do not establish a released cloud account service.

## Scope

- `index.html`: an in-flow bilingual notice within the existing hero, a `data-release="2026-11-18"` marker, and a link to `upgrade.html`.
- `upgrade.html`: a short bilingual public update explaining the next directions — try an experience, take part in an event, continue with resources.
- Existing projects, people, Apps route, inquiry form, anchors, language preference, logo and image assets remain intact.
- No new dependency, external homepage request, account registration, payment flow or membership claim.
- The release explicitly states that VIRTURA ID, cloud collections and cross-device progress are in preparation.

The user requested a maintenance announcement as a real deployment check. This is a small R01 maintenance change; it does not promote the rejected R04 homepage/SpacePort redesign.

## Copy sources

The account and participation wording follows the existing proposal at:

https://github.com/VIRTURA-SPACEPORT/VIRTURA-SpacePort/blob/feat/virtura-id-foundation-20261118/updates/network-upgrade/index.html

That branch's preview is not presented as a released account service. The Luma destination `https://lu.ma/VIRTURA` is taken from its existing source, not an invented event ID. No event date or paid benefit is promised.

## Validation completed locally

- `node scripts/qa-site-static.mjs`: exit 0, **0 errors; 0 media warnings**.
- `python scripts/brand/qa_rejected_brand_candidates.py`: exit 0, no rejected/unapproved logo references.
- `git diff --check`: passed.
- HTML parsing of the two changed pages: no duplicate IDs; all local file and fragment targets resolve.
- Patch application was checked against both the older copy and the verified live baseline. Implementation uses the live baseline.
- Evidence: [maintenance static checks](../pm/evidence/r01/maintenance-static-20261118.txt).

## Release gates still to record

1. Browser comparison at 375 / 768 / 1440 px, Chinese and English; verify notice readability, language switching, keyboard focus and homepage → update → homepage route.
2. PR commit build/check and Cloudflare preview response; record the exact commit SHA and preview URL.
3. Merge the reviewed change under the existing repository workflow.
4. Read `https://virtura.space/` and `https://virtura.space/upgrade.html` after deployment; confirm the exact `2026-11-18` marker and expected copy.
5. Keep the release pending if the preview, build or public response is missing. A merged PR is not production proof.

Screenshots, preview deployment and production verification are not claimed by the static checks above.

## Rollback

Revert only this announcement PR/commit through a new reviewed change. This removes the small homepage notice and the new upgrade page without restoring the older repository or touching Apps, people, assets or DNS. Verify the rollback response on the production domain and retain the previous deployment SHA before release.

