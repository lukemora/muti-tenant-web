// TODO: liujun 待删除 通过插件写入的
/// <reference types="vite/client" />
// 声明 Vue 文件模块
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

// 声明路径别名
declare module '@/*' {
    const value: any
    export default value
}
// 声明环境变量
interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string
}

// 声明全局变量
interface ImportMeta {
    readonly env: ImportMetaEnv
}
