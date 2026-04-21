<!--
  登录页（毕设演示）
  说明：未接后端时使用本地模拟登录，写入 token 后进入主布局
-->
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { User, Lock } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const username = ref('admin')
const password = ref('123456')
const loading = ref(false)

async function onSubmit() {
  if (!username.value || !password.value) {
    return
  }
  loading.value = true
  try {
    // 毕设演示：模拟登录延迟与成功（对接后端时改为调用 loginApi）
    await new Promise((r) => setTimeout(r, 400))
    const token = `mock-token-${Date.now()}`
    userStore.loginSuccess(token, {
      username: username.value,
      displayName: username.value === 'admin' ? '管理员' : '农户用户',
    })
    const redirect = (route.query.redirect as string) || '/home'
    router.replace(redirect)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-card">
      <h1 class="title">农产品直供平台</h1>
      <p class="subtitle">主应用登录（Vue3 + qiankun + Element Plus）</p>
      <el-form label-position="top" @submit.prevent="onSubmit">
        <el-form-item label="用户名">
          <el-input v-model="username" placeholder="请输入用户名" :prefix-icon="User" clearable />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="password" type="password" placeholder="请输入密码" :prefix-icon="Lock" show-password />
        </el-form-item>
        <el-button type="primary" class="submit-btn" native-type="submit" :loading="loading" round>登录</el-button>
      </el-form>
      <p class="hint">演示账号：admin / 123456</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 40%, #bbf7d0 100%);
}

.login-card {
  width: 400px;
  padding: 36px 32px 28px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(22, 101, 52, 0.12);
}

.title {
  margin: 0 0 8px;
  font-size: 22px;
  color: #14532d;
  text-align: center;
}

.subtitle {
  margin: 0 0 24px;
  font-size: 13px;
  color: #6b7280;
  text-align: center;
}

.submit-btn {
  width: 100%;
  margin-top: 8px;
}

.hint {
  margin: 16px 0 0;
  font-size: 12px;
  color: #9ca3af;
  text-align: center;
}
</style>
