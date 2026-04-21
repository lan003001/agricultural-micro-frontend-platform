<!--
  根组件：仅提供路由出口
  全局布局由 MainLayout 路由组件承担
-->
<script setup lang="ts">
// 根组件无需额外逻辑
</script>

<template>
  <router-view />
</template>

<style scoped lang="scss">
/* 根级样式在 global.scss 中统一处理 */
</style>
