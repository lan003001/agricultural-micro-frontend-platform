/**
 * 应用入口（毕设主应用）
 *
 * 顺序说明：
 * 1. 创建 Vue 应用实例
 * 2. 注册 Pinia、Vue Router、Element Plus
 * 3. 挂载 DOM
 * 4. 启动 qiankun（须在主应用挂载后，保证路由与容器可访问）
 */

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { setupQiankun } from './micro'

import '@/styles/global.scss'

const app = createApp(App)

const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(ElementPlus, { locale: zhCn })

app.mount('#app')

// qiankun 启动：注册子应用并开启沙箱与预加载
setupQiankun()
