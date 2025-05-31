# Vue 3 项目模板

下边内容均是生成的

这是一个基于 Vue 3 + Vite 的现代化前端项目模板，预先配置了常用工具和最佳实践，可以直接克隆使用，省去繁琐的配置过程。

## 📋 主要特性

- **Vue 3.5+**：采用最新的 Vue 3 Composition API
- **Vite 6+**：极速的开发服务器和构建工具
- **Vue Router 4**：使用 unplugin-vue-router 自动生成路由
- **Pinia 3**：Vue 官方推荐的状态管理库，配置了持久化插件
- **Element Plus**：集成流行的 UI 组件库
- **UnoCSS**：原子化 CSS 引擎，提供高效的样式开发体验
- **TypeScript 支持**：通过 JSConfig 提供类型提示
- **自动导入**：组件和 API 的自动导入，减少重复代码
- **代码规范**：集成 ESLint + Prettier + EditorConfig
- **OxLint**：快速的 JavaScript/TypeScript linter
- **Sass 支持**：预处理器支持和全局变量

## 🚀 快速开始

```bash
# 克隆项目
git clone https://github.com/jiu-u/vue_demo_templ.git my-project
cd my-project

# 安装依赖
bun install
# 或 npm install
# 或 yarn

# 启动开发服务器
bun dev
# 或 npm run dev
# 或 yarn dev
```

## 📁 项目结构

```
├── public/               # 静态资源
├── src/
│   ├── api/              # API 请求
│   ├── assets/           # 项目资源
│   ├── components/       # 全局组件
│   ├── constant/         # 常量定义
│   ├── pages/            # 页面组件 (自动路由)
│   ├── router/           # 路由配置
│   ├── stores/           # Pinia 状态
│   ├── styles/           # 全局样式
│   ├── App.vue           # 根组件
│   └── main.js           # 应用入口
├── .editorconfig         # 编辑器配置
├── .eslintrc-auto-import.json # ESLint 自动导入配置
├── .gitattributes        # Git 属性配置
├── .gitignore            # Git 忽略文件
├── .prettierrc.json      # Prettier 配置
├── eslint.config.js      # ESLint 配置
├── index.html            # HTML 模板
├── jsconfig.json         # JavaScript 配置
├── package.json          # 项目依赖
├── uno.config.ts         # UnoCSS 配置
└── vite.config.js        # Vite 配置
```

## 🛠️ 开发工具

### 推荐的 IDE 设置

- [VSCode](https://code.visualstudio.com/) + [Volar 扩展](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- 已预配置 VSCode 推荐扩展，包括：
  - Vue Volar
  - ESLint
  - EditorConfig
  - OXC
  - Prettier

### 可用的命令

```bash
# 开发
bun dev             # 启动开发服务器

# 构建
bun run build       # 构建生产版本
bun run preview     # 预览构建版本

# 代码质量
bun run lint        # 运行所有 lint 工具
bun run lint:oxlint # 仅运行 OxLint
bun run lint:eslint # 仅运行 ESLint
bun run format      # 格式化代码
```

## 🔄 环境变量

项目使用 Vite 的环境变量系统，可在 `.env` 文件中配置：

- `.env` - 所有环境通用配置
- `.env.development` - 开发环境配置
- `.env.production` - 生产环境配置

## 🔌 依赖管理

项目使用 Bun 作为推荐的包管理器，但也支持 npm/yarn/pnpm。

## 🧩 其他说明

- 自动导入：Vue API 和组件已配置自动导入
- UI 组件库：Element Plus 已配置按需导入
- CSS 工具：配置了 UnoCSS 和 Sass
- 状态持久化：Pinia 已配置持久化存储
- 代理配置：已配置 API 代理，可在 vite.config.js 中修改

## 📚 相关文档

- [Vue 3 文档](https://vuejs.org/)
- [Vite 文档](https://vitejs.dev/)
- [Vue Router 文档](https://router.vuejs.org/)
- [Pinia 文档](https://pinia.vuejs.org/)
- [Element Plus 文档](https://element-plus.org/)
- [UnoCSS 文档](https://unocss.dev/)
