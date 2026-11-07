# Spaces Atlas｜2026-11-07 数字资产“国库盘点”

> **决策文件，不是全部线上实测报告。** 建议把这份登记册作为网站和独立 App 接入的第一个事实来源。公开可查的归档保留，源码和概念分开标状态。

## 范围与方法

对 `ewanqian` 可访问的 GitHub 仓库进行树状目录检查，优先分析了 `shanhaifusheng-2026`、`SceneForge`、`new-media-artist-simulator`、`Greenhouse-in-Transit`、`cng-design-archive`、`VIRTURA-SpacePort`、`VIRTURA2114`、`performable-music`、`atmospheric-escape-liveset` 等项目及其入口、README、部署/测试线索。部分仓库为空或不可用，未将 GitHub 权限、README“Live”字样或 `index.html` 存在当成实际线上验证。

- **33 项候选**，机器可读版本：[space-asset-inventory-2026.json](../../data/space-asset-inventory-2026.json)
- **7 类**：团队与合作、空间档案、空间叙事、工具与工作坊、叙事与游戏、虚拟世界 IP、周边与产品
- **浏览入口**：[Spaces Atlas](../../apps/catalog.html)；首页频道仍保持少量精选项目

## 评级说明

| 等级 | 证明程度 | 进入 Space 的方式 |
|---|---|---|
| A / A− | 仓库明确提供线上版本、入口与部署线索，源码也存在 | 可作为重点接入候选，但上线前必须从访客视角测试 |
| B+ / B | 可运行代码或实验模块存在，但线上体验、完整操作或设备仍待验证 | 先标 Preview / Research，实测通过后再开放 |
| C+ / C | 文本、视频、部分素材、世界观或老项目片段 | 先入 Atlas / Archive，不伪装为可玩应用 |
| D | 缺关键资产、访问或权利说明 | 暂不公开；作为缺口追踪 |

本轮**没有**完整跑通 Chrome/Quest 3/Vision Pro 的设备验证。所有记录 `liveVerified=false`，评级不宣称实际 URL 在此刻稳定可用。尤其 GitHub Pages 链接在公开网页检索工具里出现读取失败，故不据此认定网站损坏或正常。

## 发现与项目排序

### 先作为 Space 产品试运行

1. **山海浮生 III｜炁 QI**：README 提供 v0.3.2 的网页、VR/MR、项目专题、0.3.1/0.3.0 回退入口；明确写导演程雨阳、出品旁观实验剧场 SET。应在独立作品卡标注 `Ewan Qian participated in digital spatial/WebXR preview`（具体分工以项目文档为准），绝不能标为 VIRTURA 全项目主创。实际 Quest MR 未通过实机验收。
2. **CNG Spatial Archive**：公共全景与站点 JSON；个人 Portfolio PR #110 记录 Pages 发布和公共视点索引，私人/内部资产与外部授权隔离。用于“企业空间归档/策展 Viewer”可售示范，而不是把 CNG 全部设计权属转给团队。
3. **SceneForge Workshop**：公开课程地图、Starter、Stage Replica 多子项目、Needle Room、Entropy Stage。最适合拆成可体验课程/工具/下载的产品路径。
4. **Greenhouse in Transit**：既有故事入口又有源页面，能以“手机了解→查看旅行档案→可选头显”形成真正的访问循环。
5. **Performable Music / NINE / Hand-OSC**：多个确切网页源码及 Pages 线索；音频、外部 Strudel 服务与 WebXR/OSC 需单独设备验证。
6. **新媒体艺术家模拟器**：已经有真实 HTML 和大量世界观数据，但作品网页能否完成一局是验收门槛；不因 README 的设计系统内容庞大就认为可上线。
7. **太空气球 / Balloon Live Space**：公开站点及节目资料存在，但真实回放授权、播放可用性、日历更新机制未证实。

### 暂时作为世界观和策展档案

- **塞尼亚岛**：Minecraft 地图/传送点是世界观与旧作品的重要资产；README 提到内网转发和管理员访问，不要公开服务器/连接信息。先做网页路线图、单张展览空间与 60–90 秒体验，再申请 Playable。
- **VIRTURA2114**：区域、委员会、航空公司与银行等为叙事性“经济/组织世界”，不能被公开当成真实金融、资助或投资产品。
- **新媒体艺术家模拟器 / 众生之门**：注意纯原创 IP 与同人世界观的商业权利界限；后者 README 明示粉丝创作非商业用途。
- **商店**：Collective Merch 是 T 恤图形/图片编辑器，不是支付商城。Merge Store 需要订单、售后、版权、授权和实物生产验证。

## 工作坊的正确分组法

`Workshop` 是一级产品集，但每门课包含独立模块，不应将十几份 HTML 都变成官网一级菜单。推荐：

```
Workshops
├─ SceneForge / 场景铸造
│  ├─ 数字课程地图 / 课前准备
│  ├─ Starter / 一键体验
│  ├─ Stage Replica / 摄像机-屏幕-视频映射
│  ├─ Entropy Stage / 舞台视觉
│  └─ Needle Room / WebXR 媒体输入
├─ Spatial Input Lab
│  ├─ Hand / Space / OSC
│  └─ CRITICAL FIELD XR playground
└─ Performable Music
   ├─ Strudel preset lab
   └─ NINE visual runtime
```

定义课程一次完成单位：**开始→一个输入操作→可观察反馈→导出截图/录屏或保存参数→重访**。缺任何一环，都只能写“演示/研究资料”。

## PDF 交叉核对｜VIRTURA Collective Overview 2026 lite

用户提供 15 页 PDF，采用其本来措辞和展示层级：

- **p.2**：「作品、结构与空间体验」的共同创作定位。
- **p.3**：分布式协作创作网络，不代表所有名字都是固定受雇人员；主站不需要一次加入整页艺术家。
- **p.4**：主能力：沉浸式空间视觉、多屏 / LED / 展览内容、现场音画与实时预演。
- **p.7 Murphy / p.9 Sihui**：分别是**成员独立作品**，不是 VIRTURA 集体独占版权；保留个人页面和合作描述。
- **p.8 TITAN**：Kashiwa Daisuke × Yuki Murata × 钱誉文现场合作；视觉系统作者有具体边界。
- **p.10 Observation and Symbiosis**：沈轩、钱誉文合作项目，应按实际项目核对专业分工。
- **p.11 TIMER / p.12 Drop Flow**：团队项目、活动及奖项简介；须按 edition 记录参与者及版本级功劳。
- **p.13 Tools / Systems / Network**：PDF 明确说明“并非独立产品”，不能直接把这些做成已销售 SaaS。
- **p.14 XUAN / TZONE / Collective / SpacePort**：合作和组织基础有层级边界；官网的交付责任也应对应。
- **p.15**：以团队页面与活动入口完成引导，不应把全部内容硬压进首页。

已将公开介绍和精选作品整理为原生 Google Doc；最终公开分享权限由所有者决定，未经确认不在仓库公开编辑 URL。

## 主站人物肖像核验

- 当前 `VIRTURA-Website/assets/people/sihui-xu-square.jpg` 与 `VIRTURA-Collective/prototype/assets/people/sihui-xu-2026-square.jpg` SHA 相同，是从已有团队归档复制的方形照片。
- `xusihui.com/about` 是本人官方主页，提供简历及工作方向，但本轮抓取没有得到可直接下载与验证的官方头像原图。**不能声称当前图片就是她官网使用的最终版本**；后续取得本人确认的官方像素文件后再替换头像，不猜 CDN 路径，也不长期依赖热链。

## 产品收尾关卡

1. 原始资料准确：项目/人/版本/组织关系。
2. 功能准确：URL、具体步骤、视觉与声音反馈、状态。
3. 设备准确：Desktop/Mobile 必达；Quest/AVP 如声明支持则真实设备测试。
4. 版权准确：授权、照片、视频、外部音源、合作分工。
5. 可分享：独立 URL、预览卡、应用图标、合适的描述。
6. 可追踪：维护负责人、最小更新日期、用户转化 CTA。

每次只取 2–3 个项目通过全部关卡，**不把新增 repo 数量当进度**。每月内容更新要有实际的“本月开放/更新”，没有更新就不制造动态。

## Cloudflare 与部署

`docs/site-upgrade/DEPLOYMENT-OWNERSHIP.md` 记载 `ewanqian/VIRTURA-Website` `main` 会触发 Cloudflare Pages `virtura-website`。本轮仅能经 GitHub connector 修改仓库、PR 与 merge；**没有可用的 Cloudflare 账号/DNS/部署管理连接或凭据**，不能在这里直接手动点 Cloudflare 重新发布，也不能查阅 Cloudflare 部署日志。

建议维护者在 Cloudflare Pages 打开项目 Deployments 检查 `main` 的 Production 构建、关联 SHA、404、预览和域名。网站成功与否以生产站实际资源和部署结果为准。

## 已知信息差

- 有些仓库因 Git 树为空、默认分支不同或权限而未列入；没有把缺失当作空项目。
- 许多经验来自个人/其他组织，只有公开协作事实可进入团队案例，用户作品不自动变成 VIRTURA 的自主制作。
- `shanhaifusheng-2026` 完整 MR 设备指标、线上访问连续性与授权需要一次独立验证。
