<!--
  农户端首页（占位，可扩展上架、订单管理）
-->
<script setup lang="ts">
import { computed } from 'vue'
import { getHostGlobalState } from '@/utils/hostBridge'

const host = computed(() => getHostGlobalState())
</script>

<template>
  <el-card shadow="never">
    <h2>农户工作台</h2>
    <p class="muted">本应用独立端口 <strong>5175</strong>，主应用 qiankun 激活路径 <code>/micro-farmer</code>。</p>
    <el-descriptions v-if="host?.user" title="主应用用户信息" :column="1" border class="mt">
      <el-descriptions-item label="展示名">{{ host.user.displayName || host.user.username }}</el-descriptions-item>
    </el-descriptions>
    <el-alert v-else class="mt" type="info" :closable="false" title="独立运行时无主应用下发状态" />
  </el-card>
</template>

<style scoped lang="scss">
h2 {
  margin: 0 0 8px;
  color: #14532d;
}
.muted {
  color: #64748b;
  line-height: 1.6;
}
.mt {
  margin-top: 16px;
}
</style>
