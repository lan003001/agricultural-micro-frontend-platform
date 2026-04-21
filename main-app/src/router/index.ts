/**
 * Vue Router 配置（主应用）
 *
 * 功能：
 * - 登录页与业务布局分离
 * - 路由元信息 meta 用于菜单与权限展示（毕设可扩展 roles）
 * - 全局前置守卫：未登录跳转登录页
 */

import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'

/** 路由表 */
const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { title: '登录', public: true },
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layouts/MainLayout.vue'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: { title: '首页', icon: 'House' },
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/About.vue'),
        meta: { title: '关于平台', icon: 'InfoFilled' },
      },
      /**
       * 消费者端子应用：需匹配 /micro-consumer 及其子路径（如 /micro-consumer/products）
       * 否则主应用通配路由会把子应用路由误判并重定向到首页
       */
      {
        path: 'micro-consumer/:pathMatch(.*)*',
        name: 'MicroConsumer',
        component: () => import('@/views/MicroAppView.vue'),
        meta: { title: '消费者端', icon: 'ShoppingCart' },
      },
      {
        path: 'micro-farmer/:pathMatch(.*)*',
        name: 'MicroFarmer',
        component: () => import('@/views/MicroAppView.vue'),
        meta: { title: '农户端', icon: 'Orange' },
      },
      {
        path: 'micro-admin/:pathMatch(.*)*',
        name: 'MicroAdmin',
        component: () => import('@/views/MicroAppView.vue'),
        meta: { title: '管理员端', icon: 'Setting' },
      },
    ],
  },
  {
    /** 未匹配路由重定向首页 */
    path: '/:pathMatch(.*)*',
    redirect: '/home',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

/** 全局前置守卫 */
router.beforeEach((to, _from, next) => {
  const userStore = useUserStore()
  userStore.hydrateFromStorage()

  const isPublic = to.meta.public === true
  const loggedIn = userStore.isAuthenticated

  if (!isPublic && !loggedIn) {
    ElMessage.warning('请先登录')
    next({ name: 'Login', query: { redirect: to.fullPath } })
    return
  }
  if (to.name === 'Login' && loggedIn) {
    next({ name: 'Home' })
    return
  }
  next()
})

export default router
