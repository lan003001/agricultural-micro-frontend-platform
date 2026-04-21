/**
 * 消费者端路由
 *
 * 说明：
 * - 独立运行：history base 为 `/`
 * - 嵌入主应用（qiankun）：base 为 `/micro-consumer`，与主应用 activeRule 一致
 */

import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { qiankunWindow } from 'vite-plugin-qiankun/es/helper'

/** 与主应用 registerMicroApps 的 activeRule、vite-plugin-qiankun 名称保持一致 */
const BASE = qiankunWindow.__POWERED_BY_QIANKUN__ ? '/micro-consumer' : '/'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/ConsumerLayout.vue'),
    /** 使用 name 重定向，避免在 qiankun base 下绝对路径错误 */
    redirect: { name: 'ProductList' },
    children: [
      {
        path: 'products',
        name: 'ProductList',
        component: () => import('@/views/ProductList.vue'),
        meta: { title: '商品列表', icon: 'Goods' },
      },
      {
        path: 'products/:id',
        name: 'ProductDetail',
        component: () => import('@/views/ProductDetail.vue'),
        meta: { title: '商品详情', icon: 'Goods' },
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('@/views/Cart.vue'),
        meta: { title: '购物车', icon: 'ShoppingCart' },
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('@/views/Orders.vue'),
        meta: { title: '我的订单', icon: 'List' },
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/Profile.vue'),
        meta: { title: '个人中心', icon: 'User' },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(BASE),
  routes,
})

export default router
