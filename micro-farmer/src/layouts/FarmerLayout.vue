<!--
  农户端布局
-->
<script setup lang="ts">
import { OfficeBuilding } from '@element-plus/icons-vue'
</script>

<template>
  <div class="farmer-layout">
    <header class="top">
      <el-icon class="ico"><OfficeBuilding /></el-icon>
      <span class="title">农户端</span>
      <span class="sub">micro-farmer · 端口 5175</span>
    </header>
    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<style scoped lang="scss">
.farmer-layout {
  min-height: 100vh;
  background: #f0fdf4;
}
.top {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  background: linear-gradient(90deg, #166534, #15803d);
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
