/**
 * 消费者端入口（qiankun 子应用）
 *
 * 生命周期说明（与主应用 qiankun 约定一致）：
 * - bootstrap：应用初始化，仅调用一次
 * - mount：挂载到主应用传入的 container 内
 * - unmount：从主应用卸载时销毁 Vue 实例
 *
 * 独立运行时：直接 mount 到本页面 #app
 */

import { createApp, type App as VueApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/es/helper'

import { setHostGlobalState, type HostGlobalState } from '@/utils/hostBridge'
import '@/styles/global.scss'

let app: VueApp | null = null

function render(props: { container?: HTMLElement; getGlobalState?: () => unknown } = {}) {
  const { container, getGlobalState } = props

  /** 从主应用同步全局状态（如用户信息、token） */
  if (typeof getGlobalState === 'function') {
    try {
      setHostGlobalState(getGlobalState() as HostGlobalState)
    } catch {
      setHostGlobalState(null)
    }
  } else {
    setHostGlobalState(null)
  }

  app = createApp(App)
  const pinia = createPinia()
  app.use(pinia)
  app.use(router)
  app.use(ElementPlus, { locale: zhCn })

  const mountEl = container ? container.querySelector('#app') : document.querySelector('#app')
  if (mountEl) {
    app.mount(mountEl as HTMLElement)
  }
}

renderWithQiankun({
  bootstrap() {
    console.log('[micro-consumer] bootstrap')
    return Promise.resolve()
  },
  mount(props) {
    console.log('[micro-consumer] mount', props)
    render(props)
  },
  unmount() {
    console.log('[micro-consumer] unmount')
    app?.unmount()
    app = null
  },
  update(props) {
    console.log('[micro-consumer] update', props)
  },
})

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render()
}
