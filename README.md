# Xi Zhang — 完整作品集源文件

包含首页、Work、About 骑行经历、Contact、简历和五个项目详情页：MCP Apps、ERP Agent Lifecycle、Traceability、Urge Delivery in IM、Data Onboarding。

## 本地运行

1. 安装 Node.js（建议当前 LTS）。
2. 在解压后的目录运行 `npm ci`。
3. 创建本地 `.env.local`，设置以下两个公开连接配置（不是管理员密钥）：
   - `VITE_SUPABASE_URL`：你的 Lovable Cloud 项目服务地址。
   - `VITE_SUPABASE_PUBLISHABLE_KEY`：该项目的公开 publishable key。
4. 运行 `npm run dev`，打开 `http://localhost:8080/ride`。
5. `npm test` 运行测试；`npm run build` 生成部署文件。

## 媒体

115 个托管媒体资源均已下载到 `public/export-media/`，原 `.asset.json` 文件的 URL 已改为本地路径；原本位于源码及 public 中的图片、插图和独立演示也包含在内。无需 Lovable 的媒体代理即可读取这些资源。Sora 字体仍通过 Google Fonts 在线加载。

## 访问验证

此文件包是源文件交付，不是双击即用的离线网站。作品页保留原有密码验证保护。

`supabase/functions/portfolio-access/` 包含 Cloud 验证函数源码。继续连接当前 Cloud 服务，或将函数部署到你自己的兼容服务。服务端需要单独配置 `PORTFOLIO_PASSCODE` 和 `PORTFOLIO_SESSION_SECRET`；它们从未包含在此文件包中。首页和简历保持公开，作品页面需要正常连接验证服务。

## 导出范围

包含本地 Fluent 设计系统副本、源码、测试、配置和锁文件。未包含 Git 元数据、node_modules、生成的构建文件、环境密钥、Lovable 内部工作区资料或 Cloud 服务端秘密。现有网站未被修改。
