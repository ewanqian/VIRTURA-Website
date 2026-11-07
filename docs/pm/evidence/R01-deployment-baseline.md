# R01 — Deployment truth and rollback baseline

Date: 2026-11-08 Asia/Shanghai. Source: main `837d68c6ff15f37500c05ae7e2337721ea613463`. Read-only audit; no production/homepage/source changes. Status **BLOCKED** on authenticated Cloudflare settings/build-log and rollback-target confirmation; accessible HTTP/browser baseline complete. Human/editor signoff remains required.

## Deployment identity and exact limits

[GitHub main check snapshot](r01/github-main-checks.json) contains Cloudflare Pages check `128380781332`, completed/success, SHA `837d68c6ff15f37500c05ae7e2337721ea613463`, deployment ID `63c4c95f-838a-4f2f-9b70-e7e742e85eed`, fixed URL https://63c4c95f.virtura-website.pages.dev. It proves provider-reported success for that SHA, not full experience QA. [Deployments API](r01/github-deployments.json) returned `[]`; [legacy commit status](r01/github-main-status.json) has no statuses. Neither empty API negates the check-run evidence.

[Runtime record](r01/runtime.json) independently downloaded all five public and all five fixed-deployment HTML responses. All ten byte-for-byte match corresponding files at main SHA. Thus these **five sampled HTML files** agree with main and fixed deployment; this is not a claim that every production asset/configuration is identical or that every app works.

The provider check calls its fixed URL “Preview URL” even for main. It is a deployment URL, not proof of a distinct PR preview environment. Current audit PR's SHA/preview must be checked separately after push. No authenticated Cloudflare dashboard/API configuration or full build logs were accessed: `command -v wrangler` returned no executable and no Cloudflare-related environment variable names were present. Browser account sessions were not searched. Project settings, production alias mapping, build command/output and previous known-good rollback deployment remain **unverified**, not inferred from CNAME or ownership prose.

## Route/HTTP acceptance

Raw response headers, redirect locations and timestamps: [http-headers.json](r01/http-headers.json). Body SHA256/full final URLs and source equality: [runtime.json](r01/runtime.json).

| Requested route | Public response | Fixed deployment final response | Main HTML bytes equal |
|---|---|---|---|
| `/` | 200 | 200 | yes |
| `/apps/` | 200 | 200 | yes |
| `/apps/store.html` | 308 → `/apps/store` → 200 | 200 after redirect | yes |
| `/apps/my-space.html` | 308 → `/apps/my-space` → 200 | 200 after redirect | yes |
| `/apps/catalog.html` (Atlas) | 308 → `/apps/catalog` → 200 | 200 after redirect | yes |

Negative control `/r01-intentional-missing-route` returns **200**, not 404. [Negative-route body comparison](r01/missing-route.json) records whether it is the root HTML fallback. HTTP 200 alone must not become route-existence proof. No redirect was added in this PR.

## Actual browser baseline

[Reproduction script](r01/audit.cjs), [runtime JSON](r01/runtime.json), screenshots in [r01](r01/). Chromium/Playwright only, headless, viewport height 900, deviceScaleFactor 1; screenshots are full-page JPEG quality 60. Samples: all five routes × 375/768/1440 × requested zh/en = **30 real captures**, no navigation exceptions. Each sample records screenshot path, requested/actual language, page errors, failed requests, image natural dimensions/object-fit, anchors, links and forms. This is baseline observation, not a blanket release PASS.

- All samples returned 200; observed pageerror events 0 and requestfailed events 0. HTTP status of every image/external link was not separately audited.
- Root applies zh/en and has two language controls. All four apps pages remain `zh-CN`, have zero `[data-set-lang]` controls even when English preference is requested: their English-request captures are **not translated English pages**.
- Overflow observed: root 375 zh; Atlas 768 zh and en. Others have no horizontal overflow by document scrollWidth test. Root 375 zh full-page capture expands beyond viewport, useful failure evidence; do not normalize/crop it away.
- Root contains zero-dimension images with empty currentSrc (one to four by sample). These are not proved broken network images; hidden/lazy elements and src assignment need further investigation. Do not report all images decoded. Source audit preserves relevant paths/lines.
- All nine protected root anchors present: `top`, `universes`, `capabilities`, `work`, `delivery`, `workflow`, `studio`, `people`, `project-inquiry`.
- [Source audit](r01/source-audit.json): root `index.html:256` project form; `index.html:316` mailto submission. Actual sending/external mail client not tested. Registry fetches: store `:28`, My Space `:16`, Atlas `:15`; these are entry-page checks, not the 13-app runtime task R07.

Language click/persistence probe, if completed, is separately recorded in [interactions.json](r01/interactions.json) using [interactions.cjs](r01/interactions.cjs). Never infer interaction success solely from setting storage before load.

## OpenCode use and evidence review

Local OpenCode read `apps/index.html` and `r01/runtime.json`; its [raw draft](r01/opencode-review.md) is **unaccepted model output**, not factual authority. Statements about “unified” UX, navigation integrity, 33-asset completeness and “all key assets” exceed the sampled evidence and are rejected by this audit. Deterministic records above govern acceptance. Screenshot file checks requested separately; any resulting record is supplemental, not an aesthetic or rights approval.

Initial startup failed external-plugin `fn3 is not a function`; command-line pure flags were unsupported. A temporary isolated config removed plugins/MCP without changing global user configuration. Cloud Coding Plan expired; DeepSeek model unsupported; larger local model rejected by resource guard. Local Gemma 32K context completed source/runtime review. First /tmp output write was automatically rejected by OpenCode's external-directory permission rule; output was safely written inside repository instead. No permission bypass or credential copied into repository. See [execution notes](r01/tool-execution.md).

## Reproduce / actual checks

Use an external dependency install to avoid changing website dependencies:

```sh
npm install --prefix /tmp/vsp-browser playwright@1.65.0
node /tmp/vsp-browser/node_modules/playwright/cli.js install chromium
NODE_PATH=/tmp/vsp-browser/node_modules node docs/pm/evidence/r01/audit.cjs
NODE_PATH=/tmp/vsp-browser/node_modules node docs/pm/evidence/r01/interactions.cjs
gh api repos/ewanqian/VIRTURA-Website/commits/837d68c6ff15f37500c05ae7e2337721ea613463/check-runs
git diff --exit-code origin/main -- index.html apps assets VIRTURA_WEBSITE_ASSETS
```

Pin to actual installed version in tool-execution.md if different. Scripts audit current public content; results can change over time. Initial browser launch before installation failed; a stopped initial capture left a browser-closed error; final 30-sample run supersedes that incomplete run. Full browser installation/retry is not falsely counted as first-run success.

## Rollback and next gate

This PR changes only evidence and R01 task state. Before merge: close PR; no runtime rollback needed. After an authorized merge: revert its squash commit through a new reviewed PR, preserving independent task state. **Do not execute rollback now.**

For future production incident: deployment owner first confirms known-good deployment ID, SHA, project, production environment and the same five-route browser/HTTP evidence. With approval, restore that known-good Cloudflare deployment (if available), or revert the responsible functional PR via review, await successful provider check, then repeat route/hash/browser verification on production. No known-good previous deployment or rollback permission was proved here; this procedure is an unexecuted plan, not a successful rollback drill. GitHub checks and body equality do not grant Cloudflare access.

Next gate: editor/deployment owner verifies provider configuration/build logs and chooses rollback target, reviews overflow/language/image limitations, then accepts baseline. Stop after R01/R02; no R03–R10 work started.
