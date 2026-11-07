# Tool execution — 2026-11-08 Asia/Shanghai

Actual tools: local OpenCode 1.2.10/1.3.15 installations; Playwright 1.65.0; Chromium 158.0.8127.18 (1254); Node 23.6.0; authenticated gh/git.

OpenCode default failed external-plugin TypeError `fn3 is not a function`; `--pure` unsupported at execution. Temporary isolated OPENCODE_TEST_HOME and XDG_CONFIG_HOME, plugin=[] and mcp={} allowed startup. Global model/provider config unchanged. Cloud Coding Plan rejected expired subscription; DeepSeek route rejected unsupported model. Local Qwen 35B resource guard rejected load; Gemma default context too short. Temporary Gemma alias vsp-audit-gemma with 32768 context, parallel=1, TTL=600 used for review. External-directory /tmp write auto-rejected; repository evidence output allowed.

OpenCode commands read apps/index.html, runtime.json and wrote opencode-review.md. Raw output is unaccepted draft; see main audit for unsupported claims. Supplemental screenshot-check output, when present, contains deterministic file checks. Model inference never replaces source or runtime proof.

HTTP: authenticated `gh api .../deployments`, `.../commits/main/check-runs`, `.../commits/main/status`; audit.cjs fetched five public/fixed-deployment responses and compared git-show bytes. curl -sS -L -D - -o /dev/null --max-time 20 captured headers. No wrangler executable; no Cloudflare env variable names found. No provider secrets logged.

Browser: initial launch before install failed, then Chromium channel used after install. Interrupted first browser capture produced browser-closed error; final audit.cjs rerun completed 30 samples. Scripts preserve current full-page capture results; these are not synthetic screenshots.
