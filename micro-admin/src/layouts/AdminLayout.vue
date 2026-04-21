<!--
  管理员端布局
-->
<script setup lang="ts">
import { Setting } from '@element-plus/icons-vue'
</script>

<template>
  <div class="admin-layout">
    <header class="top">
      <el-icon class="ico"><Setting /></el-icon>
      <span class="title">管理员端</span>
      <span class="sub">micro-admin · 端口 5176</span>
    </header>
    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<style scoped lang="scss">
.admin-layout {
  min-height: 100vh;
  background: #f8fafc;
}
.top {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  background: linear-gradient(90deg, #1e3a8a, #1d4ed8);
  color: #fff;
}
.ico {
  font-size: 22px;
}
.title {
  font-weight: 700;
  font-size: 17px;
}
.sub {
  font-size: 12px;
  opacity: 0.9;
}
.main {
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
}
</style>
