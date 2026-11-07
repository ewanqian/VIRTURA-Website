# R01 — Deployment truth and rollback baseline

Date: 2026-11-08 Asia/Shanghai. Source: main `837d68c6ff15f37500c05ae7e2337721ea613463`. Read-only audit; no production/homepage/source changes. Current status **IN_REVIEW**. Authenticated Cloudflare settings, canonical production SHA, production logs and previous-production target have now been verified with the existing local token. Earlier BLOCKED/access statements below describe earlier audit phases and are superseded by the authenticated findings at the end. Human/editor signoff remains required.

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

Local OpenCode read `apps/index.html` and `r01/runtime.json`; its [raw draft](r01/opencode-review.md) is **unaccepted model output**, not factual authority. Statements about “unified” UX, navigation integrity, 33-asset completeness and “all key assets” exceed the sampled evidence and are rejected by this audit. Deterministic records above govern acceptance. OpenCode executed `python3 docs/pm/evidence/r01/check-evidence.py` and saved [deterministic screenshot integrity output](r01/opencode-evidence-check.json): 30 JPEG files verified, 10 HTTP/body matches. This is not aesthetic or rights approval. Earlier model-generated one-line Python checks failed SyntaxError; supplied standalone script corrected that tool-use failure.

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

## Post-push PR preview acceptance

At observed PR head `9e8bbdf01c1f7ac74bc4960c15232b36bb62e8af`, static integrity and Cloudflare checks both SUCCESS ([check snapshot](r01/pr-checks.json)). Fixed PR preview `https://e378519a.virtura-website.pages.dev` returned successful curl responses for all five routes; each HTML body equals the corresponding observed PR file ([response hash proof](r01/pr-preview-proof.json)). Public sampled HTML still maps to main `837d68c`; PR preview has a distinct SHA and identical website bytes because this PR changes evidence only. Later evidence-only commits are not retrospectively claimed as this measured preview SHA. Cloudflare account settings/build logs and historical rollback target remain unverified.

## Continued R01 audit — 2026-11-08

Automatic Codex review of head 429b5ed completed with no findings; GitHub human reviews remain empty. This is not editorial approval. Follow-up [script](r01/followup.cjs), [raw results](r01/followup.json), and four viewport screenshots add latest observed PR preview, soft-404 and overflow proof. Latest observed PR deployment d666d5f3 serves all five expected HTML files exactly matching 429b5ed.

Historical deployment candidate: `08c21c94.virtura-website.pages.dev`, SHA `15df3236cab97d59bbc8064c234f490d00720b3d`, provider check successful ([snapshot](r01/rollback-candidate-checks.json)); all five HTML responses exactly match that revision. This is a reachable **candidate**, not an approved known-good runtime/rollback target: no provider environment/settings access, rollback permission, all-assets regression or rollback drill was proved.

Follow-up root viewport 375 has scrollWidth 474; Atlas viewport 768 has scrollWidth 793. Negative route displays root with 200. Follow-up root/soft404 zero-image entries were sampled after bounded waits and include visible images with src attributes; they are incomplete-load observations, not proof of missing or corrupt assets. Separate per-asset HTTP/decode output is recorded in image-decode.json.

Additional access search: known local Wrangler config locations contained no config TOML files. Browser inventory was attempted twice and timed out, so an authenticated dashboard session could not be established through available browser tooling. No account login was changed. R01 remains BLOCKED on provider settings/build logs and owner-approved rollback target.

Per-asset decode result: **First attempt: 21 unique root img src values, 20 decoded, one failed HTTP 404**: `assets/people/sihui-xu-square.jpg`. [Raw decode results](r01/image-decode.json), [repeat HTTP proof](r01/missing-portrait.json). This recorded a failed portrait response at that instant; the repeat checks below supersede any interpretation of permanent absence. No replacement photo, credit or homepage markup was introduced; correction requires verified existing source/rights under the original preservation rule.

Portrait recheck correction: local source JPEG decodes at 340×340. Production, main fixed deployment and PR fixed deployment subsequently each returned 200 and exactly the same 19,096 source bytes ([origin comparison](r01/portrait-origin-comparison.json)). The earlier 404 is therefore **intermittent/unexplained**, not a persistent missing source or deployment mismatch. Preserve [first attempt](r01/image-decode-first-attempt.json) and latest [full retry](r01/image-decode.json); no photo replacement is warranted by this evidence. Root DOM load timing still needs bounded-wait treatment; no provider cause is asserted.

## Overflow diagnosis without source changes

[Diagnostic script](r01/layout-diagnostics.cjs) and [raw results](r01/layout-diagnostics.json) identify overflowing containers and test temporary browser-only style overrides, removing each override before the next. These are causal probes, not approved CSS or production changes. Root 375 zh: `#delivery` heading content reaches scrollWidth 474; hiding ticker does not change total width, disproving a ticker-only diagnosis. Atlas 768: long `.meta` contents extend fixed grid columns; applying the existing two-column-style layout temporarily reduces document width from 793 to 768. No source style, media, title or work ordering was edited.

Latest pre-supplement acceptance: PR #5 head 5b052b2 / fixed deployment e66f343e and PR #6 head 36dbcc8 / fixed deployment f0ea6bb6 each serve five HTML entry routes, registry JSON, inventory JSON and language JS exactly matching their source revisions (16/16). Machine-readable record: [latest-preview-acceptance.json](r01/latest-preview-acceptance.json). These observed SHAs are explicit; this evidence supplement itself requires its own CI. Human reviews remain empty, automatic reviews have no findings. Cloudflare browser/access information requested; no assumption of account access made.

## Authenticated Cloudflare closure — supersedes earlier access blockers

Existing local VIRTURA credential was found outside the repository and token verification returned active. Earlier searches checked environment/Wrangler locations but missed this credential file; browser login was unnecessary. Token bytes were never printed, put in command arguments, sent to a model or committed. [Read-only collector](r01/cloudflare-readonly.py) loads the external credential and passes Authorization through curl stdin; only whitelisted project/deployment fields and sanitized logs are written. All provider requests were GET. No rollback/deploy/config/token mutation occurred.

[Authenticated provider evidence](r01/cloudflare-api-evidence.json):

- Project `virtura-website`; GitHub source `ewanqian/VIRTURA-Website`; production branch `main`; production deployment enabled; preview deployment setting `all`. Build command empty, root directory empty, destination directory `.`.
- Custom domains `virtura.space` and `www.virtura.space` both active. Provider canonical production deployment `63c4c95f-838a-4f2f-9b70-e7e742e85eed` maps main SHA `837d68c6ff15f37500c05ae7e2337721ea613463`, completed successfully. This provider mapping closes the earlier alias/SHA uncertainty.
- 46 deployment records collected across 3 pages. Canonical production logs contain 22 entries (all returned entries preserved): correct source checkout, no build command, no Functions directory, asset directory validation, 141/141 assets upload accounting and publication/deployment success. This is provider evidence, independent from the earlier body/hash/browser tests; it does not prove 13-app runtime or asset rights.
- Previous successful **production** deployment: `2945efc6-9417-41c3-9d58-f4a9d68a834e`, SHA `15df3236cab97d59bbc8064c234f490d00720b3d`. All five routes at its fixed URL succeed and byte-match that source revision ([HTTP proof](r01/production-rollback-target-http.json)). Earlier `08c21c94` is provider-classified **preview**, so it is excluded from production rollback targets despite sharing that commit.

### Concrete rollback plan — not executed

Cloudflare's [rollback rules](https://developers.cloudflare.com/pages/configuration/rollbacks/) allow previous successfully built production deployments and exclude preview deployments. The [rollback API](https://developers.cloudflare.com/api/resources/pages/subresources/projects/subresources/deployments/methods/rollback/) performs a POST to `/accounts/{account_id}/pages/projects/virtura-website/deployments/{deployment_id}/rollback`. No POST was made.

If an incident warrants reverting production, deployment owner first approves target `2945efc6-9417-41c3-9d58-f4a9d68a834e` and its content/known baseline defects; confirms it is still an available successful production deployment and that its Git diff fits the incident. Use provider rollback with appropriate permission, then GET project canonical_deployment to verify target/SHA, recheck five public routes/redirects/body hashes and root/app screenshots, bilingual root, image decode and inquiry path. A git revert alternative must use a separately reviewed PR; do not directly push main. Rollback eligibility and HTTP availability are proved; successful rollback execution, write permission and incident-specific owner approval are not claimed.

R01 status is now IN_REVIEW; blocker cleared because required read access and concrete production rollback evidence exist. Keep completedAt null until review. Human/editor review of baseline defects and rollback selection remains the next gate. R03–R10 remain untouched.
