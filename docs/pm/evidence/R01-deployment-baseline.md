# R01 — Public deployment and browser QA summary

Historical review: 2026-11-08, updated to a public-safe summary on 2026-11-20. **Not a current production availability claim.**

## What was checked in the R01 review

- The reviewer recorded a successful provider check for the audited source revision; this alone did not prove the complete website was working.
- Five sampled routes were checked on a public domain and a fixed deployment URL. The observed HTML contents matched the compared source files at that time.
- Thirty browser captures covered desktop, tablet and mobile sizes in Chinese and English. A missing-route negative control returned a soft-404 style 200 response, which was flagged rather than treated as success.
- Additional work was still required for final human/editorial signoff and full site behaviour; later changes require their own verification.

## Inspectable public evidence

- [Browser and HTTP sample](r01/runtime.json) (public pages and their test metadata)
- [Selected screenshot evidence](r01/) (layout and rendering observations)
- [Preview acceptance summary](r01/latest-preview-acceptance.json)

## Internal operational evidence

The full historical R01 report, credentialed Cloudflare read-only audit script and raw provider deployment/log export were preserved in private `ewanqian/VIRTURA-Team` under `projects/virtura-website/internal-evidence/2026-11-r01/`. This public summary intentionally excludes account-level exports and the private audit tooling. Git commit history can still contain older versions; there has been no history rewrite.
