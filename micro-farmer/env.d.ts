/// <reference types="vite/client" />
import 'vue-router'

declare module 'element-plus/dist/index.css'
declare module '*.scss'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    icon?: string
  }
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_API_BASE: string
}
