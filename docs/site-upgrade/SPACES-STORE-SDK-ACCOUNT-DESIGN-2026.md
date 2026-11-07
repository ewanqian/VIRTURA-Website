# VIRTURA Spaces Store / App SDK 接入规范 v0.1

> 产品设计与实施说明。2026-11-07。当前已提交静态 Store、My Space 本地收藏、13 项精选应用登记；**没有真实会员登录、云同步、支付或后台开发者平台**。

## 产品定义

Spaces Store 不是普通电商，不需要先卖东西。它是“启动器 + 应用目录 + 作品集 + 服务入口”：
- **工具 Tool**：用户能完成一个实际操作，例如 SceneForge 选择场地、切换镜头、Cue、屏幕媒体；
- **体验 Experience**：有明确的进入/互动/退出流程，如《山海浮生》空间章节；
- **课程 Workshop**：讲述目标→实验→反馈→输出成果，如《场景铸造》30 秒 Opening；
- **档案 Archive**：可检索或沉浸式观看的作品、场景与合作记录，如 CNG；
- **Developer**：离线或本地安装工具、脚本、SDK/Bridge，比如 HyperFlow-SHM；**不能假装它们是浏览器应用**。

每个入口有一个外链源仓库，按身份和权利标记。用户创建/选择/收藏的是**入口**，不拥有应用的源代码或第三方媒体版权。

## 工具化优先级重新排序

### P0: SceneForge 预演器

源仓库 `ewanqian/SceneForge`。不只应作为工作坊内部子页，应该是 Store 重点工具。首个公开操作流程：
1. 选择演出空间示意场地；
2. 选择两个相机角度；
3. 在屏幕表面更换本地素材；
4. 切换 cue；
5. 截图 / 保存场景说明；
6. 返回 Store / 分享该场景入口。

当前 README 的 R3F、media mapping、Cue/WebXR 属于仓库自述；实际在线链接、不同浏览器/手机/头显运行和项目数据导出需独立验收。**BO Live / UFO Terminal 示例是 illustrative 场景，非真实工程测量模型**。

### P0: SceneForge Workshop / Opening Kit

对应源 `SceneForge/public/workshop/20261031`。课程地图、课前准备、Starter、Stage Replica 是**一个产品包中的多个模块**，不按 HTML 文件数量充当多件收费商品。与用户上传的《创作资产复利计划》一致，先验证完整免费练习，再测试付费增强包（教学录屏、原创模板、Cue 表、答疑范围）；不要重复销售已公开的 MIT 源码。

### P1: ENTROPY — Stage Lab

`SceneForge/public/entropy-stage/` 内有页面、主屏/顶屏映射模板；`atmospheric-escape-liveset` 保存了 Galaxy、Spacecraft、Energy Field 多版视觉源码和测试截图。建议拆为两个入口：

- **ENTROPY Stage / Projection Mapping**：在浏览器中检查舞台视觉与屏幕区域；工具属性优先。
- **ATMOSPHERIC ESCAPE / Visual Systems Archive**：视觉世界/演出版本和研究资产归档；目前不能标为通用播控软件。用户存档指出部分 Spacecraft 后期状态旋转过快，Editorial Galaxy 有运行变慢反馈。要明确版本选择。

### P2: HyperFlow-SHM

`ewanqian/HyperFlow-SHM` 为 Python/GStreamer 基于共享内存的视频传输原型，仅可在适当的本机依赖与访问权限下运行。其 README 中“零延迟”“跨设备串流”宣传属于待测主张；跨进程共享内存不等于跨网络设备协议。安装指引的 MSVC 下载 URL 实际包含 `/mingw/` 字段，需查清版本再宣传。商城中应当标签为 **Native Tool / Developer**，不是可在线试用或已证实的 SDK。

## 当前客户端与未来账号

**Phase 0 / 已提交**：
- `/apps/store.html` 载入 `/apps/store-registry.json`；
- `/apps/my-space.html` 使用 `localStorage` 保存应用 ID、排序和导出 JSON；
- 当前浏览器内不会要求用户注册/交出邮箱；也不把“加到我的空间”说成真正安装；
- 禁止保存 Token/账号密码/客户数据；不会同步其他设备；
- 默认不将外站嵌入 iframe，避免跨站登录、媒体播放和 XR 体验失效；选择在新页面打开应用。

**Phase 1 / 待实现 Cloudflare 服务端**：

```text
Visitor ──> Spaces Frontend (public)
                │
                ├── Browse static app registry (public)
                ├── Save / layout / recent (local-first)
                └── Sign in (optional)
                       │
                  Identity Provider (OIDC/OAuth)
                       │ verified server-side session
                Workers API ── D1 users / favorites / layouts / entitlements
                       │
                independent App URLs + scoped capabilities
```

建议 OAuth/OIDC 已经成熟的提供方管理身份；Worker 验证登录凭据/回调、CSRF、会话、授权，再把稳定匿名用户 ID 映射到 D1。应用之间**不能共享原始会话 Token、不能在 URL 查询串传凭据**。可使用 Cloudflare Workers/D1 的绑定来读取数据库，不能把 D1/管理密钥放在浏览器。不要误以为 Cloudflare Access 的企业工具准入功能就天然等于面向大众的玩家账号体系。

建议 D1：
```sql
CREATE TABLE users (id TEXT PRIMARY KEY, provider TEXT NOT NULL, provider_subject TEXT NOT NULL, created_at TEXT NOT NULL, UNIQUE(provider, provider_subject));
CREATE TABLE user_apps (user_id TEXT NOT NULL, app_id TEXT NOT NULL, position INTEGER NOT NULL DEFAULT 0, added_at TEXT NOT NULL, PRIMARY KEY(user_id,app_id), FOREIGN KEY(user_id) REFERENCES users(id));
CREATE TABLE user_preferences (user_id TEXT PRIMARY KEY, layout_json TEXT NOT NULL DEFAULT '{}', updated_at TEXT NOT NULL, FOREIGN KEY(user_id) REFERENCES users(id));
CREATE TABLE app_entitlements (user_id TEXT NOT NULL, app_id TEXT NOT NULL, source TEXT NOT NULL, expires_at TEXT, PRIMARY KEY(user_id,app_id));
```

不得创建未经授权的第三方个人账号，亦不将页面浏览记录直接用于广告或推荐画像。删除账户时需支持个人数据删除和导出。付费权益必须由服务端验证，**不能**用 localStorage 收藏当付费许可证。

## App SDK v0.1 合约（待后续实装，不宣称已有完整 SDK）

独立 App 在自己的仓库中附一个 `virtura.app.json`：
```json
{
  "schemaVersion": "0.1",
  "id": "sceneforge",
  "name": {"zh": "场景铸造", "en": "SceneForge"},
  "category": "tool",
  "publisher": "ewanqian",
  "launchUrl": "https://ewanqian.github.io/SceneForge/",
  "repository": "https://github.com/ewanqian/SceneForge",
  "runtime": "web",
  "capabilities": ["keyboard", "mouse", "local-media"],
  "minDevice": "desktop-web",
  "requiresLogin": false,
  "commerce": {"mode": "free"},
  "creditPolicy": "project-version-credits",
  "releaseStatus": "needs-user-facing-QA"
}
```

入库流程：
1. 创作者交 `virtura.app.json` 与实际线上 URL，明确授权、内容、外部依赖及运维人。
2. CI 根据 JSON Schema 验证 ID 唯一、分类/URL、状态/权利、图标、版本与设备模式。
3. 人工验收“打开→一次输入→结果→退出/重新进入”，附桌面/手机截图，XR 另行设备检查。
4. 通过后 Store PR 登记；更新只改源 App，不强行复制独立工程到大仓。
5. 应用可逐步提供可选 SDK 事件 `app:ready`、`app:open`、`app:close`、`result:export`；必须经用户同意才发送分析事件，不接受跨域任意 `postMessage` 命令，校验 `event.origin` 与能力 scope。
6. 只有付费/预约路径和实际完成交付后才公开购买入口。

### 独立部署策略
- `virtura.space/apps/`：商店和 My Space。
- 自有 App 继续独立 GitHub Pages / Cloudflare Pages URL；将来可自愿申请 `apps.virtura.space/<slug>/` 反向代理，但要先解决基础域名权限、CSP/CORS、缓存、服务工作线程 scope 等问题。
- PWA 安装只针对有正确 HTTPS、manifest、图标与运行验证的单个 App；**不能**仅因 Store 有应用图标就把它称为可安装的 PWA。
- Quest / AVP 采用浏览器能力检测和实际头显验收；不为宣传强行启动沉浸模式。

## 技术与商用边界

- Cloudflare Workers + D1 适合逐步提供公共账号数据库；Workers KV 可用于高读低写缓存/通用配置，不能替代设计良好的订单事务和权限规则。
- 公共项目通过签名下载、外部合规数字商品平台或独立许可授权发放付费资源；暂不承诺“自动收款/自动分账/基金会投资”。
- 第三方作者/作品/音乐/客户合同需授权且按版记录，公开演出影像不等于任意商业转授权。
- 加入新 App 不自动纳入 VIRTURA 团队自主商业案例；团队贡献、参与制作和“已接入 Space”的陈述须分开。

## 参考（2026-11 核对）
- Cloudflare D1 Worker API: https://developers.cloudflare.com/d1/worker-api/
- Cloudflare Worker bindings: https://developers.cloudflare.com/workers/runtime-apis/bindings/
- Cloudflare Workers KV: https://developers.cloudflare.com/kv/
- Cloudflare Access applications: https://developers.cloudflare.com/cloudflare-one/access-controls/applications/choose-application-type/
- MDN PWA manifest/install: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable

## QA 验收

### 本轮
- Store 登记册具有真实可追溯仓库源，并从各仓库 README 抽取入口；有部分源地址未由浏览器实测，不能宣称全部 Online。
- 分类筛选、搜索、收藏、本机 My Space、排序、JSON 导出均在代码中具备；待 Cloudflare 页面真正部署后，需在 375px、1280px、Chrome、Safari 等实际运行。
- 空状态可用；本机存储禁用时仍能打开外链；未出现付款/登录假按钮。

### 下一轮
- 驱动自动化验证 `store-registry.json` Schema / 全部 URL 状态 / 外部权限和来源日期；冻结 /live 的准入标准。
- 为 SceneForge / ENTROPY 做屏幕录制与完整任务测试，逐个制作高质量应用专属封面与图标。
- 核实账号供应商与运营条款后再启动 Workers/D1，避免先建用户表而没有真实用途。
