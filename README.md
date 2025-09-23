# Vue 3 + TypeScript + Vite + Element Plus + Pinia + Vue Router + Axios + Eslint + Prettier + uno-css

### 环境安装

```bash
# npm install
# yarn install
```

### 运行

```bash
# npm run dev
```

### lint

```bash
# npm run lint
```

### 打包

```bash
# npm run build
```

### format

```bash
# npm run format
```

### 目录结构

```
demo
├─ .env.development 开发环境配置
├─ .eslintrc.cjs eslint 配置
├─ .prettierrc.cjs prettier 配置
├─ index.html
├─ package-lock.json
├─ package.json
├─ public     公共静态资源
│  └─ vite.svg
├─ README.md
├─ src
│  ├─ App.vue
│  ├─ assets  静态资源
│  │  ├─ styles
│  │  │  ├─ element  element-ui 主题样式（还待完善）
│  │  │  │  ├─ dark.scss
│  │  │  │  └─ index.scss
│  │  │  ├─ global.scss   全局样式
│  │  │  ├─ index.scss
│  │  │  ├─ _mixins.scss  混入样式
│  │  │  ├─ _utilities.scss   样式工具类
│  │  │  └─ _variables.scss   全局变量
│  │  └─ vue.svg
│  ├─ auto-imports.d.ts   自动导入
│  ├─ components    组件
│  │  ├─ layouts   布局
│  │  │  ├─ BaseHeader.vue
│  │  │  ├─ BaseSide.vue  侧边栏菜单
│  │  │  └─ index.vue
│  │  └─ PaginationTable.vue  表格分页组件
│  ├─ components.d.ts   组件类型声明
│  ├─ composables   组合式API
│  │  ├─ dark.ts
│  │  └─ index.ts
│  ├─ main.ts
│  ├─ router   路由
│  │  └─ index.ts
│  ├─ services
│  │  ├─ api.ts  接口
│  │  └─ request.ts 请求封装
│  ├─ stores   状态管理
│  │  ├─ counterStore.ts count测试
│  │  ├─ index.ts 状态管理入口
│  │  └─ userStore.ts 用户状态信息管理
│  ├─ types   类型定义
│  │  ├─ global.d.ts  全局类型定义
│  │  └─ user.d.ts   用户类型定义
│  ├─ utils       工具类
│  │  ├─ debounce.ts    节流
│  │  ├─ index.ts   工具类入口
│  │  └─ throttle.ts    防抖
│  ├─ views     业务视图页面
│  │  ├─ AboutView.vue
│  │  ├─ CounterView.vue
│  │  ├─ ExampleView    示例页面
│  │  │  └─ index.vue
│  │  ├─ HomeView.vue
│  │  └─ LoginView.vue 登录页面
│  └─ vite-env.d.ts   vite类型声明文件
├─ tsconfig.app.json ts配置文件
├─ tsconfig.json   ts配置文件入口
├─ tsconfig.node.json
├─ uno.config.ts UnoCSS 配置文件
└─ vite.config.ts vite配置文件

```

### 项目统一代码格式配置

```
 .vscode
```

### 未解决问题

在scss文件中，使用 “@import”会报错

```ruby
Deprecation Warning [import]: Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.
```

sass1.8版本后弃了 @import改为使用@use(目前使用最新版本1.90.0)，但是改用@use后，会因为定义的全局样式在多个scss文件引用（报错为同一个样式变量在多个文件中定义，导致重复）

### unoCSS

```
https://unocss.nodejs.cn/
```

### 工具库引入

1 原生 + 自建工具函数
2 lodash（lodash-es）
3 现代 TS 优先工具库: radash，remeda，radashi
