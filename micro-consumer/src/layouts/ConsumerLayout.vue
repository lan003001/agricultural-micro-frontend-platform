<!--
  消费者端布局：顶栏导航 + 内容区
  嵌入主应用时仍保持独立导航，便于毕设展示子应用完整功能
-->
<script setup lang="ts">
import { computed, type Component } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Goods, ShoppingCart, List, User } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()

const iconMap: Record<string, Component> = {
  Goods,
  ShoppingCart,
  List,
  User,
}

const navItems = computed(() => {
  return [
    { name: 'ProductList', title: '商品列表', icon: 'Goods' },
    { name: 'Cart', title: '购物车', icon: 'ShoppingCart' },
    { name: 'Orders', title: '我的订单', icon: 'List' },
    { name: 'Profile', title: '个人中心', icon: 'User' },
  ]
})

const active = computed(() => route.name as string)

function go(name: string) {
  router.push({ name })
}

function icon(name: string) {
  return iconMap[name] || Goods
}
</script>

<template>
  <div class="consumer-layout">
    <header class="top-bar">
      <div class="brand">
        <span class="title">消费者端</span>
        <span class="sub">农产品直供 · micro-consumer</span>
      </div>
      <nav class="nav">
        <el-button
          v-for="item in navItems"
          :key="item.name"
          :type="active === item.name ? 'primary' : 'default'"
          link
          @click="go(item.name)"
        >
          <el-icon class="nav-icon"><component :is="icon(item.icon)" /></el-icon>
          {{ item.title }}
        </el-button>
      </nav>
    </header>
    <main class="main">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style scoped lang="scss">
.consumer-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f8fafc;
}

.top-bar {
  height: $header-height;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background: linear-gradient(90deg, #14532d, #166534);
  color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
}

.brand {
  display: flex;
  align-items: baseline;
  gap: 10px;
}

.title {
  font-weight: 700;
  font-size: 17px;
}

.sub {
  font-size: 12px;
  opacity: 0.85;
}

.nav {
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-icon {
  margin-right: 4px;
}

.main {
  flex: 1;
  padding: 16px;
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
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
