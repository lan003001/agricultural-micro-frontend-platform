<!--
  关于页：毕设项目说明
-->
<template>
  <div class="about">
    <h2>关于平台</h2>
    <el-descriptions title="主应用信息" :column="1" border>
      <el-descriptions-item label="项目名称">农产品直供平台 · 主应用</el-descriptions-item>
      <el-descriptions-item label="微前端框架">qiankun（阿里开源）</el-descriptions-item>
      <el-descriptions-item label="子应用入口配置">见 src/micro/index.ts</el-descriptions-item>
      <el-descriptions-item label="开发端口">5173（Vite）</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<style scoped lang="scss">
.about h2 {
  margin-top: 0;
  color: #14532d;
}
</style>
