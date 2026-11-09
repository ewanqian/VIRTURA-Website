# VIRTURA Space — Sprint 01: 视觉考古 → 品牌原稿恢复 → 可发布组件

**状态：可执行任务书（未获最终 VI 签收） | 2026-11-08**

这不是“继续出 20 张好看图”的任务。目标是在保留 2024 真实资料的前提下，把已经得到认可的视觉语言转换为 **4 个可审核品牌套件、1 组跨品牌 UI 原件和 1 个可实际访问的产品切片**。品牌套件的“通过设计审核”与“网站已经发布”分别判断。

## 已核实的起点

- 官方网站 `ewanqian/VIRTURA-Website` 的 `brand-spec.md` 是黑色 `#0b0b0b` / 暖白 `#f3f3ef`、编辑式排版，没有完整子品牌 VI 工程。
- `ewanqian/VIRTURA-SpacePort/assets/virtura-wordmark.svg` 是现成的 VIRTURA 矢量字标；`ewanqian/VIRTURA-Collective/merch/assets/virtura-logo.svg` 另有可比较版；**两者不是以下四个子品牌的正式可编辑标志稿**。
- 检索了 VIRTURA-Website、VIRTURA-SpacePort、VIRTURA-Collective、portfolio 的 main 文件树：未找到 BALLOON、MOVA、VIRTUAL AIRLINES、林中茶屋这四项独立的 SVG/AI/EPS/PSD 品牌母版。这个结论限于这些仓库文件树，不排除用户本地或其他云端保存有原稿。
- **14 张 2024 来源图片与 6 张 2026 概念图分别保存**在 ChatGPT Library `/VIRTURA/Brand-Archive/2026-11-08/`，原始字节/校验值已记录。七品牌档案：`docs/brand/VIRTURA-SPACE-VISUAL-DNA-2026-11-08.md` 和 `spaceport-brand-registry.v01.json`。
- 既有 PR #9 可复用的是导航状态/数据/测试，不是正式艺术指导；旧绿色 Store 与 v05 都不能作为 VI 母版。

## 为什么先做这四个

| 品牌 | 识别重点 | 进入体验的产品角色 | 第一个具体封面/组件 |
|---|---|---|---|
| **Balloon Live Space** | 电蓝 + 洋红 + 明黄 + 白色，球体/线框球、叠排字标 | 视听展演与节目空间 | 3:2 Session 海报 + 节目频道选中态 |
| **Virtual Airlines** | 交叠 VA 三角形与环轨、窄版航空识别系统 | 空间交通/路线入口 | 航线入口牌、方位箭头、抵达动效静帧 |
| **MOVA** | 黑白、细线结构、轻字重、桁架展陈 | 数字艺术美术馆 | 16:9 展览入口图 + 档案详情 |
| **林中茶屋** | 中英字标、雾林、木材、暖光；方框檐形符号不归属茶屋（待另核） | 环境声音/日常停留空间 | 4:3 场景封面 + 音频进入/静音操作 |

### 并行安排：3 条线，不互相覆盖文件

**Track A / Provenance & Logo Recovery（本地 OpenCode 或视觉设计师，4 个独立子任务）**
- 从归档 ZIP 校验源文件的 SHA，索引每个品牌在第几张图的哪个区域，截图裁剪只能作为**工作底稿**，不能替代原图和最终 SVG。
- 优先找用户本地的 Figma/AI/PSD/SVG/Blender/VRChat 项目；找到原始母版优先于重绘。
- 若确无母版：按可见图形作**忠实矢量描摹候选**，记录不可判读部分，不擅自改变文本/形态，不推断或虚构官方字体。
- 每个品牌单独 PR，交付 `identity-candidate.svg`、`wordmark-candidate.svg`（仅在能辨认的条件下）、`source-evidence.md`、`audit.png`，文件标记 `candidate-not-approved`；无原稿时允许只提交证据审计，绝不硬凑 Logo。
- 对照 2024 源图的**球体比例、三角比例、檐口结构与字体字距**，把错误列为问题而不是“AI 风格化”。

**Track B / UI Tokens & Product Components（单一前端 Agent；不要碰身份母版）**
- 提炼品牌不变系统：VIRTURA 字标、安全留白、黑/暖白公共外壳、字体级别、12 栏比例、键盘焦点、选中反馈、加载/失败/返回。
- 各个 IP 色彩使用各自命名空间：`balloon.*`、`mova.*`、`airlines.*`、`teahouse.*`；禁止“全站统一绿”或通用紫色演出背景。
- 建一个独立预览，不接生产首页。组件范围仅为 `SiteHeader`、`WorldPortal`、`WorldCover`、`WorldInspector`、`BackToSpace`、`PublicationStatus`；状态真实可点。
- UI 演出场景应**复用源图的视觉构成**，不要自动生成节目日期、艺术家名字或票价。

**Track C / Product Vertical Slice（在 Track A/B 有可审核样板后启动）**
- 先完成 **SpacePort → Balloon（明确“视听展演空间”）→ 真实节目/展演档案 → 返回 SpacePort**。
- 导航可以用 2D/SVG/DOM；不强制 Three.js、R3F、高斯。真实链接需 HTTP 验证。
- 完成 375×812 / 768×1024 / 1440×900 的浏览器截图、键盘操作、双语、低性能/减少动效、加载与失败退路。
- 作为可独立审阅的 PR；在产品与视觉验收之前不得重定向主站 `/apps/` 或覆盖 Studio 首页。

## 四个品牌各自需要交付什么

每个品牌一个文件夹，格式固定，不得用设计系统之外的无效文案凑满画面：

```text
brand/{slug}/
  provenance.md              # 原图路径+SHA+作者及用途限制
  identity-candidate.svg      # 若可忠实提取；绝不自动标 APPROVED
  wordmark-candidate.svg      # 可追溯、可审查的文字母版候选
  design-tokens.json          # 采样色与拟议色，分别标记，不能冒充规范色
  lockups-black-white.png     # 正/反白示例
  world-cover-16x9.webp      # 原图/授权+人工审查后导出的用途版
  programme-poster-3x2.webp  # 确实适合该品牌时再做
  map-glyph.svg              # 24 / 32 / 48 逐尺寸检查
  world-ui-preview.png       # 真实 1440×900 设计构图
  review.md                   # 含拒绝项/版权检查/人工意见
```

缺少正式来源/授权可交付 audit+candidate，而不能假装完整。**只在获得制作使用授权并核对原始图片后才发布 web 封面。** 所有导出保持原始文件独立存储，不破坏原图画幅。

## 验收条件（不达标退回）

1. 评审者在移除品牌名字的情况下，能从球形/色带、VA 三角、MOVA 字体/展架、真实木构场景与林中茶屋字标识别出不同空间。
2. 不得把 RGB 采样值当正式 CMYK/品牌色；要分别保存色彩候选、色域与审核状态。
3. 设计师能在 24px glyph、宽版网站头图、竖版环境导视三种尺寸检查完整图形，而不是只看漂亮展示板。
4. 1440×900 站点入口主画面最多一个类别说明和一个主要动作；长篇世界观、作者、法律信息移到二级内容。
5. Balloon 首屏有明确 **“视听展演空间”**，身份与旧蓝/洋红/黄/白系统连续，禁止重画成通用紫色 EDM 海报。
6. 每张正式素材都标注来源/版本/使用范围和源文件 SHA；没有母版时必须标 `candidate-not-approved`。
7. 视觉稿与浏览器截图分开评分，CI 通过不能替代人工视觉批准。

## HiKu / OpenCode 任务指令（可复制）

```text
Work on ewanqian/VIRTURA-Website. Read AGENTS.md, docs/brand/VIRTURA-SPACE-VISUAL-DNA-2026-11-08.md, docs/brand/spaceport-brand-registry.v01.json, and docs/brand/SPRINT-01-IDENTITY-RECOVERY.md.

First run source archive verification using scripts/brand/verify_and_stage.py with the two ZIPs stored in ChatGPT Library /VIRTURA/Brand-Archive/2026-11-08/ (files must be explicitly copied locally; do not assume GitHub contains them).

Parallel READ-ONLY research: inspect original glyphs/wordmarks for Balloon Live Space, Virtual Airlines, MOVA and Tea House, and search local Figma/SVG/AI/PSD/vector original masters. Write source evidence with exact file hashes and uncertain details. Then pick ONE brand (Balloon) for a reversible candidate visual extraction PR and a clear side-by-side audit. Do not replace or fabricate the 2024 logos. Do not edit index.html or any production route.

Only after art-direction approval, derive shared reusable UI components from the signed-off visual reference. PR must contain candidate status, before/after, exact asset sources and visual QA. Do not auto-merge site UI.
```

**这轮只开放可证实的品牌提取工作；不同时启动四个 UI 重构。** 主线先 Balloon，其他三项可以并行核查原稿、建立证据。内容、创作工具、生活空间和未来商业服务待品牌基础通过后再依次接入。

## 任务成功的真正定义

不是“写出了四个品牌介绍”或“有七套颜色板”，而是**设计师可以从可验证的原稿制作出四套正确的标志/封面，Codex 可以用其中一套建立真实可用的界面，之后不必再次猜测官方应该长什么样。**
