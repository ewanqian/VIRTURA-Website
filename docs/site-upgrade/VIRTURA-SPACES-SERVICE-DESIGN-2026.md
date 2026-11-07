# VIRTURA 2026–2027｜网站接管、Wii Channel 式入口与空间 Web App 服务设计

**状态**：2026-11-07 第一轮调查与实施；供团队复核，不把研究概念当作已经交付。  
**控制权**：`ewanqian/VIRTURA-Website` 当前连接具备 Admin/Push；`CNAME=virtura.space`，`docs/site-upgrade/DEPLOYMENT-OWNERSHIP.md` 记载 Cloudflare Pages 项目 `virtura-website`，`main` 自动发布。此为仓库配置记录，不代替线上部署确认。

## Executive decision｜目前不建设大一统 3D OS

把 VIRTURA 分为**Studio (可信商业入口)**、**Spaces (Web App/档案入口)**、**Content Graph (作品/版本/人/空间/服务的数据层)**、**Independent Apps (独立可部署体验)**。这样能先收尾原有页面，再逐个发布空间体验；外部客户首先看到团队做过什么，再选择体验内容。

新的 `/apps/` 是一个**可用的频道目录 Beta**，现有卡片按 Public / Archive / In development 标注。它不是一个已交付的三维操作系统。Wii 的价值在于可识别频道、远距离指向、每页少量选择和低门槛返回，而非怀旧按钮/蓝白渐变的直接复刻。

## 已阅读的实证与对照

- [Nintendo 官方 Wii Channels 启动说明](https://en-americas-support.nintendo.com/app/answers/detail/a_id/2796/p/172)：从首页选择频道，更多频道通过页码/左右分页访问。可借用“启动点→完整频道→返回”的三段关系，不必复刻商标或 Wii 图标。
- [Nintendo 官方 Wii 手册](https://en-americas-support.nintendo.com/app/answers/detail/a_id/16890/)：频道/设置是明确的产品层而不是项目标签。
- [Xbox 360 Blades 历史参考](https://interfacelineage.com/xbox-360-dashboard-blades)：邻接导航帮助用户定位，适合键盘/遥控器，不适合把数十种内容全部塞到一页。
- [Apple visionOS 3D content](https://developer.apple.com/documentation/visionOS/adding-3d-content-to-your-app)：窗口、3D 体积和沉浸空间是不同观看层，不需要所有内容都沉浸。
- [Meta WebXR overview](https://developers.meta.com/vr/documentation/web/webxr-overview/)：浏览器进入沉浸会话，需运行时能力检测；Quest WebXR 可单独部署。新项目可参考 IWSDK。
- [Meta Web/PWA 入口](https://developers.meta.com/vr/discover/platforms/)：同一个 Web App 可先做 2D，按需要增加 WebXR；不得仅凭手机访问就声称 Quest/AVP 兼容。
- [MDN PWA 可安装规则](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable)：安装能力依赖应用 manifest 等条件，离线缓存是另一层，不是仅有图标就等于 PWA。
- [web.dev Manifest](https://web.dev/learn/pwa/web-app-manifest)：独立应用有自己的名称、图标、快捷方式和显示配置。

## 1. 三层服务体验

**第一层 Discover / 导览**：`virtura.space` 的 Studio 介绍：已验证项目、团队职责、案例视频和咨询入口；`/apps/` 的频道目录：图标、状态、一个动词、进入按钮与外部路由；每月刊出 1 个重点“更新中 / 新开放”对象。无需登录即可浏览。

**第二层 Experience / 体验**：每个产品有独立 URI；落地页 10 秒交代“这是什么、能干什么、时间、交互方式、设备限制”，低配移动优先；资源从静态网页/全景/音画→3D 浏览→WebXR 三个 progressive enhancement 层次升级。不能让所有人先等待一个大模型或大地图加载。

**第三层 Participate / 合作**：每个体验可选收藏/分享、研究报告、场地预约、工作坊、定制服务/咨询；最少先实现邮件询价。付费与账号在有商品交付、隐私政策、订单状态和客服后再逐项添加，不要为了模拟 App Store 提前堆支付/会员。

关键路径：官网案例→Space 频道→独立应用→可分享的访问结果→参加工作坊/定制委托；每步记录转化而不是单看页面 PV。

## 2. 真实产品目录（截至本轮仓库审计）

| App / IP | 已知代码/资料入口 | 本轮资格 | 进入方式 | 必须收尾的内容 |
|---|---|---|---|---|
| VIRTURA Studio | `ewanqian/VIRTURA-Website` | PUBLIC | 官网内部路由 | 修正人物/署名/图片对应 |
| CNG Spatial Archive | `ewanqian/cng-design-archive` | ARCHIVE | 公开浏览器链接 | 12 张公共全景/8 条站点记录的链接和移动端二次验收；内网素材不得暴露 |
| TIMER Spatial Study | `ewanqian/portfolio` | ARCHIVE/RESEARCH | 个人作品研究页 | Volumetric Sand 仍是研究方向，原作团队 Credit 独立 |
| Drop Flow | `VIRTURA-Collective/works/drop-flow` | PUBLIC ARTWORK | 版本档案 | ROOM719、创作营、杭州双年展照片对应版与角色 |
| Balloon Live Space | `VIRTURA-SpacePort/stations/balloon-live-space` | DEVELOPMENT | 先指向资料 | 验证可访问站点页面，再决定是否从 Archive 升级为 Experience |
| SpacePort / 2114 | `VIRTURA-SpacePort`、`VIRTURA2114` | DEVELOPMENT | 世界观/资料入口 | 整理 World Bible、Stations、航线、机构功能与已上线状态 |
| Senia Digital Resort | `ewanqian/Senia-Digital-Resort` | DEVELOPMENT | GitHub 工程入口 | 先选一个可访问场景/故事/动作作为最小完成体验 |
| 新媒体艺术家模拟器 | `ewanqian/new-media-artist-simulator` | NEEDS AUDIT | 暂不发布 | 运行/移动端检查、首个完整游戏回合 |
| 上海浮生 | `ewanqian/shanhaifusheng-2026` | NEEDS AUDIT | 暂不发布 | 核对授权、剧场/制作关系、可公开互动内容 |
| Greenhouse / 数字植物园 | `ewanqian/Greenhouse-in-Transit` | NEEDS AUDIT | 暂不发布 | 先做一处可进入植物空间，区别 Quest3 和 AVP 玩法 |
| World Remix、SPLINE、苗圃、故事游戏 | 多处未整合 | INVENTORY | 暂不发布 | 先定位现有文件/URL，再建档，不自行发明项目 |

状态严格区分：PUBLIC（有实际可浏览页面）/ARCHIVE（可验证档案，但不是互动软件）/BETA（能实际完成一次交互）/DEVELOPMENT（进行中）/INVENTORY（仅有想法或素材）。

## 3. 2114 世界观与虚拟机构

**太空港 / Port**：城市/主题空间索引，不是另一份商务官网。  
**虚拟航线 / Routes**：把两个可访问的节点组织成策展旅程；初版仅使用简明的阅读路线和地图，不假定有连续 3D 世界。  
**经济发展委员会**：对应创作者服务与资源对接，在没有实际团队、流程和资金前标为“世界观设定 / 未运营”。  
**基金会**：对应未来项目资助计划；在预算、申请、评审、披露完善前不能收款或承诺投资。  
**纬线银行**：保留为叙事/IP 名称；不能对外宣传具备金融牌照、存款或投资产品。  
**塞尼亚岛**：数字目的地、休养与轻交互分支；支持公共入口→小体验→收藏记录→活动/课程。  
**植物园**：自然生长/观察/声音与空间互动的轻量体验，很适合首个小规模原创 Web App。

保持虚构机构与真实商业主体、收费、财务产品边界；IP 叙事可丰富世界，不以虚构组织代替法律实体。

## 4. App 标准：可以单独发布，也可以从 Space 启动

每个 App 必须独立有：`appId`、`title`、`ownerRepo`、`webUrl`、`cover`、`iconAsset`、`status`、`deviceModes`、`creditIds`、`rights`、`lastVerified`、`contactAction`。官网统一注册，App 代码仍在自己的仓库，禁止把所有作品源代码复制到官网一个巨仓。

建议 URL：官网 `virtura.space/`；聚合目录 `virtura.space/apps/`；独立正式 Web App 优先 `apps.virtura.space/<slug>/` 或专属子域；长期归档 `spaceport.virtura.space/stations/<slug>/`。DNS/路由计划未经配置不得宣称已上线。

设备策略：Desktop/Mobile 首先完整可用；Quest3 可选独立 Immersive WebXR；AVP 在真实 Safari/visionOS 验证能力后开放空间模式；不根据浏览器 UA 猜测硬件。为鼠标、触控、手柄、键盘、手眼输入提供明确的能力回退与退出路径。

## 5. Wii-inspired 视觉规范，但不复制 Nintendo

- 频道是**视觉上明确的方形/圆角矩形图标 + 名称 + 简短状态 + 单一动作**，可以筛选；单页不超过首屏 6–9 个主要入口。
- 第一版采用中性雾灰、低饱和苔绿、银白的材料系统；保留 Studio 黑白的严谨商业识别；未来让不同 IP 有自己的局部色调，但共享字体度量、无障碍、图标底板规格。
- Icon Source：首先使用真实项目/空间几何轮廓，不用每张都生成一个重复星球或霓虹光环。统一 viewBox 64、线宽/圆角与 1:1 画幅；应用自身可拥有更丰富的主封面。
- Wii 的历史启示是“频道/服务能够持续更新且适合操控”，不是盗用其 logo、菜单素材或声音。
- 长期可加入左右分页、置顶、最近访问、时间/通知，但必须有真实数据后再增加，不制造空动态。
- 动效保持可关闭的 150–250ms hover/focus；移动端不依赖 hover，支持键盘方向与可读焦点。

## 6. 数据和 Agent 流水线

```text
GitHub owner repos / artwork archives
  ↓ ingestion (source URL, SHA, permission, version)
Content Registry (works, events, people, editions, credits, apps, spaces, assets)
  ↓ schema validation + evidence gate
Review PR (factual checks, editorial, rights, UX)
  ↓ approved builds
Studio website + Spaces launcher + independent Web Apps
  ↓ measured outcomes
Analytics / client inquiry / workshop sales / archive refresh
```

初期只需要**一个 Agent**按固定 checklist 做仓库发现、路径查验、资源分类和生成 PR；当真实案例变多，再拆成资料 Agent、设计/内容 Agent、QA Agent。多 Agent 并不直接提升事实准确度；同一项 Credit 必须有固定来源并由人确认。

每次发布必须核验：404、图片解码与画幅、双语、375px/1280px、服务状态真实性、版权/署名、App 可访问性、实际转化动作。PR 有预览和回滚点；禁止仅因 GitHub 合并成功就宣称 Cloudflare 生产已通过。

## 7. 接下来优先收尾什么

**P0**：主站许思慧人物卡、Murphy 链接、Collective 文案去重复；保留原有商业案例。

**P1**：TIMER — Spatial Study 变为 Featured Research（图片归档已在 Collective）；与 TIMER 原作合作署名分离。

**P1**：独立 `/apps/` 频道目录 Beta 只连接验证过的公共页面；后续原型必须完成一次完整交互再标 `Playable`。

**P2**：对 CNG、Balloon、Senia、植物园、新媒体艺术家模拟器、上海浮生做逐项关账：功能、图片、署名、链接、设备与商业转化。每完成一个才增加主页入口，不使用十几个“Coming Soon”填满页面。

**P3**：探索 `atlas`（词条/关系图）、策展路径、独立 PWA/WebXR、基金会/经济委员会叙事与收入产品。暂不在本轮承诺落地。

## 8. 质量验收和对话成本

推荐 4 个短闭环，不用一次讨论全体世界观：

1. **事实与旧站接管**（一次验收）：署名、头像、图片与链接对齐，官网实际部署。
2. **频道目录 Beta**（一次验收）：移动与桌面可浏览、每张卡片状态真实、链接有效。
3. **选择一个 playable pilot**（1–3 次实现/测试迭代）：植物园或现有可玩的模拟器，具备明确输入/反馈/结束/重访。
4. **产品化**（按证据决定）：工作坊、咨询、周边与付费，先询价转化，再支付与会员。

AI 对话轮数是过程规划，不是开发完成的时间保证。只有在浏览器、设备、素材、运行环境均可访问的情况下才能验收完整体验。

## 当前风险记录

- 旧 SpacePort 的部分页面 canonical 仍指向 `https://virtura.space/stations/...`，而现在 `virtura.space` 实际对应新官网仓库；必须逐个核对旧深链是否失效，再改成 `spaceport.virtura.space` 或实际可访问域名。
- CNG 公共浏览器与私人设计/生产素材须保持物理隔离；不可前端隐藏私有空间而仍传输模型数据。
- 已有 Portal/World Bible、Collective、Studio、Newsroom 文档中对同一入口定位不同，下一版应冻结官方 Route Registry，避免不同 Agent 互相覆盖。
- 目前站点是静态 HTML，没有统一内容编译、UI QA 或 App Registry 自动同步；此文档是下一步实施规范，不是已经建成的系统。
