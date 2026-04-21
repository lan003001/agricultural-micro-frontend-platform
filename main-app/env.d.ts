/// <reference types="vite/client" />
import 'vue-router'

/** Element Plus 全局样式（无类型声明时在此兜底） */
declare module 'element-plus/dist/index.css'

/** SCSS 模块 */
declare module '*.scss'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}

/** 扩展路由 meta 类型，便于 TypeScript 推断 */
declare module 'vue-router' {
  interface RouteMeta {
    /** 菜单与面包屑标题 */
    title?: string
    /** 侧栏图标名，对应 MainLayout 中 iconMap */
    icon?: string
    /** 是否公开页面（无需登录） */
    public?: boolean
  }
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_API_BASE: string
}

// ImportMeta 由 vite/client 提供；此处仅扩展 env 变量类型
