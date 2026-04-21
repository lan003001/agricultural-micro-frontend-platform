/**
 * 管理员端入口（qiankun 子应用，端口 5176）
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
  app.use(createPinia())
  app.use(router)
  app.use(ElementPlus, { locale: zhCn })

  const mountEl = container ? container.querySelector('#app') : document.querySelector('#app')
  if (mountEl) {
    app.mount(mountEl as HTMLElement)
  }
}

renderWithQiankun({
  bootstrap() {
    console.log('[micro-admin] bootstrap')
    return Promise.resolve()
  },
  mount(props) {
    console.log('[micro-admin] mount', props)
    render(props)
  },
  unmount() {
    app?.unmount()
    app = null
  },
  update(props) {
    console.log('[micro-admin] update', props)
  },
})

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render()
}
