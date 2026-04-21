<!--
  主布局：顶栏 + 侧栏 + 内容区
  毕设说明：侧栏菜单由路由 meta 驱动，可扩展权限过滤
-->
<script setup lang="ts">
import { ref, computed, type Component } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { Fold, Expand, House, InfoFilled, ShoppingCart, Orange, Setting } from '@element-plus/icons-vue'

/** 路由 meta.icon 字符串到图标组件的映射 */
const iconMap: Record<string, Component> = {
  House,
  InfoFilled,
  ShoppingCart,
  Orange,
  Setting,
}

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

/** 侧栏是否折叠 */
const isCollapse = ref(false)

/** 当前激活菜单（与路由 name 对齐） */
const activeMenu = computed(() => route.name as string)

/** 从布局子路由生成菜单（排除无 meta.title 的） */
const menuRoutes = computed(() => {
  const layout = router.getRoutes().find((r) => r.name === 'Layout')
  return (layout?.children || []).filter((r) => r.meta?.title)
})

function toggleSide() {
  isCollapse.value = !isCollapse.value
}

function onLogout() {
  userStore.logout()
  router.push({ name: 'Login' })
}

function resolveIcon(name?: unknown): Component | undefined {
  if (typeof name !== 'string') return undefined
  return iconMap[name]
}
</script>

<template>
  <el-container class="layout-root">
    <!-- 顶栏 -->
    <el-header class="layout-header">
      <div class="brand">
        <span class="brand-title">农产品直供平台</span>
        <span class="brand-sub">主应用 · 微前端</span>
      </div>
      <div class="header-actions">
        <span class="welcome">您好，{{ userStore.user?.displayName || '用户' }}</span>
        <el-button type="danger" link @click="onLogout">退出</el-button>
      </div>
    </el-header>

    <el-container class="layout-body">
      <!-- 侧栏 -->
      <el-aside :width="isCollapse ? '64px' : '220px'" class="layout-aside">
        <div class="aside-toggle" @click="toggleSide">
          <el-icon v-if="isCollapse"><Expand /></el-icon>
          <el-icon v-else><Fold /></el-icon>
        </div>
        <el-menu
          :default-active="activeMenu"
          :collapse="isCollapse"
          router
          background-color="#1f2937"
          text-color="#e5e7eb"
          active-text-color="#86efac"
        >
          <el-menu-item v-for="r in menuRoutes" :key="r.name as string" :index="r.name as string" :route="{ name: r.name }">
            <el-icon v-if="resolveIcon(r.meta?.icon)">
              <component :is="resolveIcon(r.meta?.icon)" />
            </el-icon>
            <span>{{ r.meta?.title }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 主内容 -->
      <el-main class="layout-main">
        <el-breadcrumb separator="/" class="breadcrumb">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-if="route.meta?.title">{{ route.meta.title }}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="main-inner">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.layout-root {
  height: 100vh;
  flex-direction: column;
}

.layout-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background: linear-gradient(90deg, #14532d 0%, #166534 100%);
  color: #fff;
  height: $header-height;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
}

.brand {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.brand-title {
  font-size: 18px;
  font-weight: 700;
}

.brand-sub {
  font-size: 12px;
  opacity: 0.85;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.welcome {
  font-size: 14px;
}

.layout-body {
  flex: 1;
  overflow: hidden;
}

.layout-aside {
  background: $sidebar-bg;
  display: flex;
  flex-direction: column;
  transition: width 0.2s;
}

.aside-toggle {
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  cursor: pointer;
  border-bottom: 1px solid #374151;
  &:hover {
    color: #fff;
  }
}

.el-menu {
  border-right: none;
  flex: 1;
}

.layout-main {
  background: #f3f4f6;
  padding: 16px 20px;
  overflow: auto;
}

.breadcrumb {
  margin-bottom: 12px;
}

.main-inner {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  min-height: calc(100vh - 56px - 32px - 40px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
