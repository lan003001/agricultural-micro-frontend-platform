<!--
  微应用承载页
  必须与 qiankun 注册时的 container 选择器一致（#subapp-container）
-->
<template>
  <div class="micro-page">
    <el-alert
      title="子应用挂载区域"
      type="info"
      show-icon
      :closable="false"
      description="下方 #subapp-container 为 qiankun 子应用挂载点（消费者 5174 / 农户 5175 / 管理 5176，见 src/micro/ports.ts）。对应子应用未启动时会加载失败。"
    />
    <!-- qiankun 子应用容器：id 与 registerMicroApps 中 container 一致 -->
    <div id="subapp-container" class="subapp-container" />
  </div>
</template>

<style scoped lang="scss">
.micro-page {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.subapp-container {
  min-height: 420px;
  border: 1px dashed #d1d5db;
  border-radius: 8px;
  background: #fafafa;
}
</style>
