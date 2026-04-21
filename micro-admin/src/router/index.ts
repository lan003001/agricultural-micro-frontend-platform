/**
 * 管理员端路由：嵌入主应用时 base 为 /micro-admin
 */
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { qiankunWindow } from 'vite-plugin-qiankun/es/helper'

const BASE = qiankunWindow.__POWERED_BY_QIANKUN__ ? '/micro-admin' : '/'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/AdminLayout.vue'),
    redirect: { name: 'AdminHome' },
    children: [
      {
        path: '',
        name: 'AdminHome',
        component: () => import('@/views/AdminHome.vue'),
        meta: { title: '管理后台' },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(BASE),
  routes,
})

export default router
