> **New checkpoint:** `docs/design/VIRTURA-SPACE-DECISIONS-AND-RISKS-2026-11-08.md`, `VIRTURA-SPACE-ART-DIRECTION-v07.md`, and `VIRTURA-SPACE-PROMPT-PACK-v07.md` preserve rejected designs, missing risks and reproducible visual prompts. Read these before R03/R04/R05 implementation. Treat all generated imagery as conceptual, not authentic project assets. No production homepage changes until owner approves art direction.

# HiKu / OpenCode / DeepSeek · Local Routing Packet v1

This is a READY-TO-PASTE operations handoff for the user's local router. Project: `ewanqian/VIRTURA-Website`. First read `AGENTS.md`, `docs/pm/VIRTURA-SPACE-PROGRAM-2026-11-07.md`, `docs/pm/tasks.json`.

## First command / 一次性交付给本地 HiKu 的指令

> 你担任 VIRTURA Space 的本地执行路由器，不是重新设计一套网站的自主决策者。使用当前机器已经认证的 `gh` / git，不读取、保存或要求旧的 PAT。工作仓库 `ewanqian/VIRTURA-Website`，主分支 `main`；先完整读取仓库的 `AGENTS.md` 和 `docs/pm/tasks.json`。
>
> 本轮只启动 **R01（OpenCode，部署真相与页面基线）**、**R02（DeepSeek 可做资料分析，OpenCode 负责取证与写回）**，两项并行上限。不要自行启动 R03–R10 的实现工作，不开付费/账号/新世界项目。
>
> 对每个任务：从最新 main 创建专属分支，逐项记录原始 repo/PR URL、文件、命令、可复查结果；缺浏览器、Cloudflare 权限或外部源时标 `BLOCKED` 而不是猜测；提交非破坏性 PR（不要直接 push main、不要自动 merge）；同步更新 `docs/pm/tasks.json` 中当前任务的 status / blocker / evidenceLinks / prUrl；完成后返回以下结构化报告。所有运行截图必须来自真实运行，不允许生成模拟结果冒充 QA。
>
> `{ "taskId":"R01", "status":"IN_REVIEW", "branch":"...", "prUrl":"...", "evidence":["..."], "changedFiles":["..."], "tests":{"passed":[],"failed":[],"notRun":[]}, "blockers":[], "nextGate":"..." }`
>
> R01 检查是否能读取 Cloudflare Pages 的 Production/Preview 构建状态及提交 SHA；无法访问时保留待检查条目并通过 HTTP 访问、截图、错误日志完成其余部分。检测 `/`、`/apps/`、`/apps/store.html`、`/apps/my-space.html`、`/apps/catalog.html`。对 375/768/1440px 各取当前主站、Space 首页与相关应用页的基线截图；如果页面不能访问，截图或日志体现真实失败状态。
>
> R02 逐个阅读个人 Portfolio 的 PR #130、#132、#134、#121、#94 的实际 diff，不只读标题；把每项经验转成 *why / what to reuse / what not to reuse / how to prove*。制作可实施清单和优先级，绝不直接复制个人经历、作者身份、媒体和无关的 React 输出。
>
> 输出完成后停止，由线上架构编辑决定 R03 的信息架构和 R04 的视觉方案。只有经过审核的方案才能授权本地实现 PR。

## Routing policy

| Agent / 场景 | 可独立做 | 必须升级给线上编辑/用户 |
|---|---|---|
| OpenCode 本地 | git/gh 仓库检索、代码与依赖检查、截图/Playwright、CI、链接 QA、静态页面的明确 bug 修复 | 改首页排序/叙述主题、项目归属、用户隐私和支付功能 |
| DeepSeek 本地 | 比较 PR diff、读文档、归纳信息架构选项、草拟双语摘要、校对 URL 格式 | 任何未经来源核实的人物、机构、展演版、技术能力或版权声明 |
| ChatGPT 线上 | 品牌/产品方向、编辑筛选、Credit 验证、视觉方案选择、跨项目优先级和审核 | 最终业务授权/客户合同/艺术家肖像及署名的个人确认 |
| 用户 | 优先级与预算、视觉选择、真实合作权利、设备体验、账户/支付隐私决策 | 不必手工做重复性仓库清点或文档格式化 |

## Git branch / PR contract

- 一件任务一个分支：`audit/vsp-r01-deploy-baseline`、`research/vsp-r02-portfolio-transfer` 等，始终基于**最新** `main`。不在历史 `redesign/spaces-unified-editorial-20261107` 试验分支上继续堆改动。
- 对首页 `index.html` 的修改需另建单一目的 PR；编辑批准前 R01/R02 不得修改它。
- PR title: `[VSP-R01] Verify production/preview deploy and baseline`。
- PR body 必须包含 Objective / Evidence / Files changed / Screenshots / Test outputs / Known failures / Rollback / Next gate。
- 开发者不得用 `TODO` 标记已经完成的功能，不得用“已部署”掩盖未实测状态。
- 只有任务证据和审查通过后才能将 `tasks.json` 的状态改成 `DONE`。
- 当前 GitHub Issues 关闭，任务状态更新用 PR + `tasks.json`；不要把 Issue 当成已经创建。

## First wave · concrete outputs

**R01**：`docs/pm/evidence/R01-deployment-baseline.md` 和真实截图文件（或失败证据），只读侦察；可另提出最小 QA workflow PR，但不得悄悄覆盖 root 首页。

**R02**：`docs/pm/evidence/R02-portfolio-transfer.md`，五个历史 PR diff 的逐条证据、哪些机制值得移植、建议的轻量实现任务。最后提炼最多 3 项要迁移的实际自动化工具（如图片解码、工作内容准入、预览部署验证），不要启动全新 CMS。

## Next wave · prerequisites

R03 / R04 / R06 是高认知负担：需要线上定内容模型、视觉系统和合作署名。只有这些得出决策后，再让本地 OpenCode 具体修改 HTML、CSS、图片和桥接代码。R07 是可并行的设备/浏览器测试但必须先有 R01 的部署真相。R09 的付费与用户同步继续 HOLD。

## Resource constraints

- WIP: 2 本地任务 + 1 线上决策；不要把“十项研究”理解为十个同时运行的 Agent。
- 不需要 GPU/本地模型的大规模生成来解决路由/图片链接和文案问题。使用确定性脚本和浏览器证据优先；模型只负责解释资料与提出候选。
- 屏幕与媒体文件本来已存在时，勿重新裁切或重复生成。
- 保留个人 Stage Casting 04 的硬截止优先级，团队网站工程不应消耗全部艺术研发时段。

## Safety

No plaintext PAT / Cloudflare credentials in repository, logs, screenshots, PRs or chat. Never paste a token into a DeepSeek prompt. Cloudflare provider access must use authenticated local environment. Any credential disclosed previously should be revoked.
