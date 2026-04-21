/**
 * qiankun 微前端注册与启动（毕设主应用核心）
 *
 * 说明：
 * - registerMicroApps：注册子应用列表（name、入口 entry、激活规则 activeRule）。
 * - 子应用端口见 ./ports.ts，需与各子应用 vite.config server.port 一致。
 */

import { registerMicroApps, start } from 'qiankun'
import { useUserStore } from '@/stores/user'
import { MICRO_APP_DEV_PORTS, microEntryUrl, type MicroAppItem } from './ports'

export type { MicroAppItem } from './ports'

/**
 * 子应用列表（name / activeRule 须与子应用 vite-plugin-qiankun 名称、路由 base 一致）
 */
const microApps: MicroAppItem[] = [
  {
    name: 'micro-consumer',
    entry: microEntryUrl(MICRO_APP_DEV_PORTS.consumer),
    container: '#subapp-container',
    activeRule: '/micro-consumer',
  },
  {
    name: 'micro-farmer',
    entry: microEntryUrl(MICRO_APP_DEV_PORTS.farmer),
    container: '#subapp-container',
    activeRule: '/micro-farmer',
  },
  {
    name: 'micro-admin',
    entry: microEntryUrl(MICRO_APP_DEV_PORTS.admin),
    container: '#subapp-container',
    activeRule: '/micro-admin',
  },
]

/**
 * 注册并启动 qiankun
 */
export function setupQiankun() {
  registerMicroApps(
    microApps.map((app) => ({
      ...app,
      props: {
        getGlobalState: () => {
          const userStore = useUserStore()
          return {
            user: userStore.user,
            token: userStore.token,
          }
        },
      },
    })),
    {
      beforeLoad: [
        async (app) => {
          console.log('[qiankun] before load', app.name)
        },
      ],
      afterMount: [
        async (app) => {
          console.log('[qiankun] after mount', app.name)
        },
      ],
    },
  )

  start({
    prefetch: true,
    sandbox: {
      experimentalStyleIsolation: true,
    },
    singular: false,
  })
}
