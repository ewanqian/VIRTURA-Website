# VIRTURA Space · 接管评估 / TOP 10 未关闭研究与执行方案
**2026-11-07 · PM-SPACE-01 · Decision draft for local HiKu → OpenCode / DeepSeek and online editorial review**

## 核心判断

**问题不是缺少新概念，而是素材、项目、软件、共同创作、场地和商业服务没有受同一套事实与视觉质量标准约束。**
此前将 Space 当成 App Store，用独立苔绿色卡片页填充内容，实际上削弱了原本黑白、编辑式、大尺度空间视觉的 VIRTURA 官网识别。新目标是 **VIRTURA Space：能进入的数字港口、展览容器、创作者网络与体验服务**。Studio 可以作为正式能力介绍入口；作品与 IP 是主角；工具与工作坊为创作装备。**不要**优先建设支付、会员或一堆空应用。

此文件只批准调研与审查任务，不自动批准完整 UI 重构或生产合并。

## 已核实代码 / 仓库状态

- 官网 `ewanqian/VIRTURA-Website` / `main` / `CNAME=virtura.space`，当前 GitHub 连接可推送；仓库 `docs/site-upgrade/DEPLOYMENT-OWNERSHIP.md` 记录 Cloudflare Pages `virtura-website` 与主分支自动发布，**但此处没有 Cloudflare 账户工具访问及生产构建日志证据**。
- `index.html` 约 55KB，使用长段内联 CSS 与页面 Canvas；主站已经有黑底、12 列、不规则大幅图、团队介绍、作品和联系路径。保护这些已工作的结构，不从零重写。
- `apps/index.html`、`apps/store.html`、`apps/my-space.html`、`apps/catalog.html` 各自有 CSS、导航和单独的配色；目录 UI/内容定位与 Studio 明显不同。已有 `apps/store-registry.json` 13 个精选入口，`data/space-asset-inventory-2026.json` 33 条线索，两个不是同一种状态，也没有统一的页面编排层。
- 官方主站 PR #1/#2/#3 已合并，但 Git 提交成功 ≠ 访客页面 200 / 全部图像解码 / 设备可玩。对 `apps/` 的公开读取此前失败，不能无依据宣称生产已正常。
- 官网此前缺少 `AGENTS.md`、统一 PR checklist 和前台 QA workflow。Issues 在此 repo 关闭，创建 Issue 返回 HTTP 410；先以 `docs/pm/tasks.json` 为唯一任务状态源，PR 作为可审计执行载体。
- 历史 `redesign/spaces-unified-editorial-20261107` 实验分支已拷贝 5 张 SpacePort 原图，但尚未作为获批视觉方案和部署验收的证据。**不直接合并该分支**；先审图和取舍。
- 旧 `VIRTURA-Cellective/VIRTURA-Website` 是历史来源。当前以新仓库主线开发，勿把历史组织凭据复活，也不要使用聊天里曾公开过的 PAT。

## Portfolio 方法迁移：读过的关键 PR

| PR | 可复用的经验 | 团队站落点 | 禁止机械复制 |
|---|---|---|---|
| [portfolio #130](https://github.com/ewanqian/portfolio/pull/130) | 自动渲染首页、解码媒体、留存截图与布局证据 | R01 / R04 / R05：浏览器基线、视觉回归 | 不能把脚本“运行过”当等于 QA PASS，须保留输出 |
| [#132](https://github.com/ewanqian/portfolio/pull/132) | 优先真现场照片，避免用海报代替证据 | R05：SpacePort / TIMER / Drop Flow 媒体治理 | 不得把某个版本照片映射给另一展演版 |
| [#134](https://github.com/ewanqian/portfolio/pull/134) | 将虚构、重复及弱文章转内部 archive，保持旧资料不破坏 | R02 / R03：旧“Store”文案与无证明的项目降级，不删除源 | 不把所有旧页面 301 到首页 |
| [#121](https://github.com/ewanqian/portfolio/pull/121) | 明确内容构建/部署的真实 source-of-truth | R01 / R09：Cloudflare 与静态仓库分离验证 | 不照搬 React build 到静态 HTML 官网页 |
| [#94](https://github.com/ewanqian/portfolio/pull/94) | 项目经理 WIP 限制、证据升级门槛和停止扩张规则 | 本方案 `tasks.json`、PR gate、最多 2 个活跃 P0 | 不把个人项目的“拥有”转为 VIRTURA 共同拥有 |
| [#139](https://github.com/ewanqian/portfolio/pull/139) | 合作图片依版本归档 | R05 / R06 | 同组图像不等于所有人独占所有版权 |

个人仓库的层级是 `projects/ → database/ → content/ → generated`。团队站应采用对应的 `evidence/ → registry/ → curated stories/ → pages`，但当前还**没有运行中的统一 CMS**，必须先审已有数据与差异，不新增另一套未经维护的数据库。

## TOP 10 研究评估（评级为当前证据充分度，不是实施进度百分比）

| ID | 研究线 | 优先级 | 当前质量判断 | 最关键缺口 | 路由 |
|---|---|---|---|---|---|
| R01 | 部署事实、路由、回滚 | P0 | **RED / 无生产证据链** | Git main ↔ Cloudflare build SHA ↔ 实际 URL/图像 | 本地 OpenCode |
| R02 | Portfolio 机制迁移 | P0 | **AMBER / 有现成 PR** | 机制到团队适配、避免复制无关代码 | 本地 DeepSeek |
| R03 | Space 产品语言和信息架构 | P0 | **RED / 定位冲突** | Space ≠ Store、Studio/SpacePort/Archive 权重和入口层级 | 线上主策展 |
| R04 | 首页视觉、组件与设计质量 | P0 | **RED / 视觉断裂** | 单一视觉契约、黑色原站的非破坏演化、对照图 | 线上定方向→本地实现 |
| R05 | 媒体、图片、权利与画幅 | P0 | **AMBER / 有实拍但映射薄弱** | 图片 hash/解码/项目版本/合法公开用途 | 本地 OpenCode |
| R06 | 协作署名、角色和事实一致性 | P0 | **AMBER / 部分档案存在** | 版本级 Credit、个人/团队作品区分 | 线上审核 |
| R07 | 13 项 App / 场景实际可玩性 | P1 | **RED / 主要是源码线索** | 真实打开-操作-结果-返回-设备闭环 | 本地 OpenCode |
| R08 | SpacePort / 2114 / 塞尼亚岛的策展内容 | P1 | **AMBER / IP 文档丰富** | 真实入口和仅有世界观叙事的区分 | 线上策展 |
| R09 | Registry、SDK、个人账户可行性 | P1 | **AMBER / 有 schema 草案** | 33 条与 13 条的单一权威源、身份/权限模型 | 本地→线上 |
| R10 | 服务产品化与持续运营 | P2 | **AMBER / 有案例与课程** | 可交付服务、支持成本、客户触达、复购证据 | 线上产品判断 |

**Top 10 不是同时执行 10 项。** 排序决定哪项能阻断生产；只有前项证据到位后才提升后项。

## 外部交互参考的可核实结论

- Apple iCloud.com 官方用户指南说明：首页可添加、更换、拖动、移除 tile，指定 tile 显示内容，并在部分 tile 内执行快捷操作。我们的目标是“有用的卡片/空间入口”，**不应凭未经核实的技术传闻声称复刻 Apple 的 React 组件**。 https://support.apple.com/guide/icloud/customize-and-use-the-homepage-tiles-mm048a5aa9cc/1.0/icloud/1.0
- visionOS 官方 HIG 将普通窗口、3D Volume、沉浸空间分别视为不同任务环境；VIRTURA 应有网站/3D/XR 渐进能力，不是强制让客户进入头显。 https://developer.apple.com/design/human-interface-guidelines/windows
- Cloudflare Pages 官方 Git Integration 文档描述生产与 PR preview、构建检查和 Git 连接，不代表本项目一定启用了所有检查；必须查具体 Cloudflare 项目配置。 https://developers.cloudflare.com/pages/configuration/git-integration/
- Wii 频道的启示是可辨识入口、清晰退出、低操作学习成本；不应直接复制 Nintendo 的视觉商标或音乐。

## 决策：新视觉不是继续“绿色 Store”

### 必须继承主站
黑底主基调与大幅实际媒体、节制的留白、专业作品图、真实人物与团队服务说明。优先同一个 logo、字体、边线、对齐系统与图片画幅原则。允许不同世界作品图产生局部色彩；**不能**用一组统一颜色渐变替代差异化的项目证据。

### 必须重新设计
1. **顶层**：VIRTURA Space 作为数字港口，Studio 是具有实际客户转化目标的正式入口，SpacePort 是可访问世界与研究节点；统一 shell，不能在 Spaces 下突然进入另一套绿色导航。
2. **首屏**：用真实空间影像建立“去哪里”的指向，而不是 13 张同质化圆角图标；首页只精选 4–6 个重点入口，余下进入 Atlas，不上“未完成就可玩”的空格。
3. **内容权重**：在线太空港口 > 真实可进入的空间/展览/游戏 > 作品档案 > 工具与课程 > 开发者 SDK。**《山海浮生》往后排**，只有真实操作测试、项目授权与舞台说明完整才升级位置。
4. **语言**：去掉“乱七八糟都可以打开”“一个文件就可玩”等低可信度措辞。每张内容卡必须回答：是什么、我能做什么、它为何值得进入、现在真的可以做什么。
5. **Atlas**：事实登记与前台产品卡分层；已接入 VIRTURA Space 可以是“我们收录/策展”，**不代表 VIRTURA 完成该作品的所有制作**。

## 保护现有 homepage：PR 切片而不是重新生成整个文件

目前官网 `index.html` 承载了商业案列、人物、服务、联系表单和原有路由。不得一次性“全部统一改造”。
- Phase A / R01：从 main 生成网页基线，桌面 1440、平板 768、手机 375；中文/英文；保存 screenshot、链接、图像原始画幅、页面主要锚点与表单动作；判定本来就存在的缺陷。
- Phase B / R03–R04：**仅在 PR 分支**制作可审查的视觉目标与统一 token 方案。先定 **Space 首屏、Studio 入口、在线太空港、3 张不同类型媒体卡**。未选视觉方向前不要把生产改成统一巨卡片。
- Phase C / 实装：独立 PR 修改共享页头/导航（不改 work 卡次序和业务表单），第二个 PR 改 Spaces 首页/内容卡，第三个 PR 才调整主站 hero 周边的 Space 入口与分段；旧 /apps/store.html 保留兼容入口或单独做迁移，不做无提示 404。
- Phase D / 验收：对照截图，无意外内容丢失，至少两个页面完整键盘路径，语言切换、移动横向滚动、图片解码、外链及实际 Cloudflare PR preview 全过才 merge。
- **Rollback**：每项 PR 单独 squash + 关联部署 SHA；生产问题先 revert 相关 PR，而不是大段覆盖 main。

## 并行任务与成本边界

- **仅同时进行 2 项本地任务、1 项线上架构审核；P0 活跃不超过 2 项。**
- 第一批只执行 R01（部署证据）+ R02（Portfolio 机制迁移），R03 线上预备但不得抢跑设计实施。第二批做 R03 定案和 R05 媒体验证；随后 R04 首页。R06 署名可穿插审核，但尚未通过时不向客户发布新 credit。
- 轻量（S）= 只读审计/单文档/固定校验；中量（M）= 媒体索引/集成测试/跨仓核对；重（L）= 信息架构/视觉方向/长期内容策略。投入量是路由判断，不是承诺时间。
- 停止条件：连续两轮只有概念/文档而没有真实截图、运行记录或发布变更；立刻暂停拓展新 App。此策略也避免分散 `Stage Casting 04` 的硬截止研发。

## 管理规则

`docs/pm/tasks.json` 是当前唯一状态源。合法状态：`QUEUED`、`READY`、`IN_PROGRESS`、`IN_REVIEW`、`BLOCKED`、`DONE`。每次 Agent 更新必须在 PR 中同步：状态变化、证据、blocker、对应 SHA、下一项门槛。没有证据不能改成 DONE。

目前 GitHub Issues 功能关闭，创建 Issue 返回 HTTP 410；不要反复发送 Issue 请求。使用 PR（代码交付）+ machine readable queue（状态）替代；未来启用 Issues 时按 ID 映射而非复制两份状态。

## PR 发布质量门槛

- **Factual**：作品 title、版本、参与者、地点、机构关系必须指向可核实来源。
- **Technical**：路径与依赖正确、代码检查、JS 不报错、外链路由真实打开。
- **Visual**：与已通过的 baseline 对照，图片解码、非破坏画幅、手机/桌面/双语截图。
- **Experience**：一条完整用户路径，不只跳转 GitHub README。
- **Safety / rights**：不得向 public commit 任何 token、客户秘密、私有地图或无授权素材。
- **Ownership**：一个变更一个 owner；设计/署名/首页晋升需人工策展/编辑判断。

**“文档写好了”、“分支有代码”和“Cloudflare 生产可用”是三个不同状态。**
