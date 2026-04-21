/**
 * 农户端路由：嵌入主应用时 base 为 /micro-farmer
 */
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { qiankunWindow } from 'vite-plugin-qiankun/es/helper'

const BASE = qiankunWindow.__POWERED_BY_QIANKUN__ ? '/micro-farmer' : '/'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/FarmerLayout.vue'),
    redirect: { name: 'FarmerHome' },
    children: [
      {
        path: '',
        name: 'FarmerHome',
        component: () => import('@/views/FarmerHome.vue'),
        meta: { title: '农户工作台' },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(BASE),
  routes,
})

export default router
