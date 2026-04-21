<!--
  首页：展示主应用说明与微前端入口提示
-->
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { MICRO_APP_DEV_PORTS } from '@/micro/ports'

const router = useRouter()

function go(name: 'MicroConsumer' | 'MicroFarmer' | 'MicroAdmin') {
  router.push({ name })
}
</script>

<template>
  <div class="home">
    <h2>欢迎使用主应用</h2>
    <p class="desc">
      本工程为「农产品直供平台」<strong>微前端主应用</strong>，技术栈为 Vue3、Vite、qiankun、Element Plus、Pinia、Vue Router、Axios、Sass。
    </p>
    <el-alert title="子应用端口约定" type="success" show-icon :closable="false">
      主应用 5173；消费者端 {{ MICRO_APP_DEV_PORTS.consumer }}；农户端 {{ MICRO_APP_DEV_PORTS.farmer }}；管理员端
      {{ MICRO_APP_DEV_PORTS.admin }}。请同时启动需访问的子应用，否则 qiankun 加载会失败。
    </el-alert>
    <div class="actions">
      <el-button type="primary" @click="go('MicroConsumer')">进入消费者端</el-button>
      <el-button type="success" @click="go('MicroFarmer')">进入农户端</el-button>
      <el-button type="warning" @click="go('MicroAdmin')">进入管理员端</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  h2 {
    margin-top: 0;
    color: #14532d;
  }
  .desc {
    line-height: 1.7;
    color: #374151;
    margin-bottom: 16px;
  }
  .actions {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
}
</style>
