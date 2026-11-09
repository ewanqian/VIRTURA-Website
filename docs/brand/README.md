> **R02 vector studies rejected, 2026-11-09:** [VA geometry and brand-fidelity rejection record](./REJECTION-VA-R02-AND-SOURCE-FIDELITY-GATE-2026-11-09.md). The comparison is preserved in ChatGPT Library. Closed PR #14 SVGs are not usable official marks. Source correction PR #15 remains valid.

> **Source correction:** [2024 brand-panel attribution errata](./SOURCE-ATTRIBUTION-CORRECTION-2026-11-09.md) — corrects Tea House/retreat symbol ownership and Virtual Airlines emblem without merging unapproved SVG candidates.

> **下一阶段执行入口：** [Sprint 01 — 品牌原稿恢复与 Ballroom/SpacePort 产品切片](./SPRINT-01-IDENTITY-RECOVERY.md)。四套首批品牌：Balloon、Virtual Airlines、MOVA、林中茶屋；先进行源稿审计，后进行候选矢量制作，不能把概念图当正式母版。

# SpacePort 品牌视觉资料：本地接入规范

该目录是**官方 VIRTURA 网站的设计归档索引**，不是当前生产页面的运行时资源目录。

- [七品牌视觉语言 / 必须继承的元素](./VIRTURA-SPACE-VISUAL-DNA-2026-11-08.md)
- [机器可读品牌登记册](./spaceport-brand-registry.v01.json)
- [2026 空间与 VI 方向验收](../design/VIRTURA-SPACE-ART-DIRECTION-v07.md)
- [设计否决与风险台账](../design/VIRTURA-SPACE-DECISIONS-AND-RISKS-2026-11-08.md)

## 完整图片归档（2026-11-08）

目前存在**持久 ChatGPT 文件库**中：
`/VIRTURA/Brand-Archive/2026-11-08/`

- `VIRTURA_SOURCE_IMAGES.zip`: 14 张用户原始图片，不做画幅/颜色/标志替换。
- `VIRTURA_CONCEPT_STUDIES.zip`: 6 张 AI 生成探索，其中 3 张方向获积极反馈，**但没有完整正式 VI 审批**。
- `ASSET_MANIFEST.json`: 20 件原始字节级 SHA-256、文件尺寸、图片尺寸、生成来源与角色。
- `reference-overview.jpg`: 缩略总览。

**注意：这些图片目前不在 GitHub repo 的目录中。** 这是为了保护原图和个人/合作作品的发布边界。网站需要引用它们之前，先在本地下载归档，再按授权范围提取、优化、做可用性检查。不能因为一个 ZIP 存在 Library 就在网页中直接引用不存在的 `assets/...` 路径。

## 给 HiKu / OpenCode 的本地导入流程

1. 从文件库取两个 ZIP，备份到项目素材区；GitHub repo 根目录检出最新 `main`。
2. 运行 `python3 scripts/brand/verify_and_stage.py --source-zip <path> --concept-zip <path>`，默认 **只验证** 20 件文件的原始 SHA-256，不写仓库。
3. 报告是否缺失、重复、修改过的图片；源图和 AI 概念图明确分组。
4. 确认发布授权后，对需要在网页使用的图逐一制作单独的 WebP/AVIF/PNG 导出版本，记录 `source_sha256`、输出用途、尺寸、裁切/安全区、作者和版本；提交小范围 PR。
5. 正式 Logo/字标需要取得原始矢量大师稿或经过设计师审核的重绘版本。**绝不能直接把 AI 概念板中的模糊 Logo 放大当“官方”素材。**

网站的 VI/内容升级应依据小范围 PR 验收，保留原有 Studio 首页与作品的相对权重，不直接更改 `index.html`。

## 严格区分四种状态

- `REFERENCE`: 可以学习与索引，不代表拥有网页公开权。
- `CONCEPT`: AI 或人工新方向，用于讨论，不能冒充旧版真实历史。
- `APPROVED`: 经负责方确认字体、图形、色彩、版权与具体场景。
- `PUBLISHED`: 实际网页已经上线并通过浏览器/设备体验与内容 QA。

不把“用户觉得方向很美”直接提升为“Logo 的每一处几何细节已经官方批准”。
