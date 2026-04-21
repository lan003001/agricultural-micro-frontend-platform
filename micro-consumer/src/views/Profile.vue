<!--
  个人中心：展示子应用信息；若嵌入主应用则展示主应用下发的用户信息
-->
<script setup lang="ts">
import { computed } from 'vue'
import { getHostGlobalState } from '@/utils/hostBridge'

const host = computed(() => getHostGlobalState())
</script>

<template>
  <div class="page">
    <h2 class="h2">个人中心</h2>
    <el-descriptions title="账户信息" :column="1" border>
      <el-descriptions-item label="运行模式">
        {{ host ? '已嵌入主应用（qiankun）' : '独立运行（子应用 dev）' }}
      </el-descriptions-item>
      <el-descriptions-item label="主应用用户">
        <template v-if="host?.user">
          {{ host.user.displayName || host.user.username || '—' }}
        </template>
        <template v-else> 独立运行时无主应用下发，可在主应用登录后从菜单进入本应用查看 </template>
      </el-descriptions-item>
      <el-descriptions-item label="Token">
        {{ host?.token ? '已下发（已脱敏）' : '无' }}
      </el-descriptions-item>
    </el-descriptions>
    <el-alert
      class="mt"
      title="毕设说明"
      type="info"
      :closable="false"
      description="主应用通过 qiankun props.getGlobalState 将登录态传入子应用；子应用在 mount 时写入 hostBridge，供本页展示。"
    />
  </div>
</template>

<style scoped lang="scss">
.page {
  .h2 {
    margin: 0 0 12px;
    color: #14532d;
  }
}

.mt {
  margin-top: 16px;
}
</style>
