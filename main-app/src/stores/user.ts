/**
 * 用户全局状态（Pinia）
 *
 * 职责：
 * - 保存当前登录用户信息
 * - 提供 login / logout 动作，与 localStorage、路由联动
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { StoredUser } from '@/utils/auth'
import { setToken, setUser, clearAuth, getToken, getUser } from '@/utils/auth'

export const useUserStore = defineStore('user', () => {
  /** 内存中的 token（与 localStorage 同步） */
  const token = ref<string | null>(getToken())
  /** 用户信息 */
  const user = ref<StoredUser | null>(getUser())

  /** 是否已登录 */
  const isAuthenticated = computed(() => !!token.value)

  /**
   * 登录成功后的统一写入
   * @param t JWT 或模拟 token
   * @param u 用户信息
   */
  function loginSuccess(t: string, u: StoredUser) {
    token.value = t
    user.value = u
    setToken(t)
    setUser(u)
  }

  /** 退出登录 */
  function logout() {
    token.value = null
    user.value = null
    clearAuth()
  }

  /** 从本地存储恢复（页面刷新） */
  function hydrateFromStorage() {
    token.value = getToken()
    user.value = getUser()
  }

  return {
    token,
    user,
    isAuthenticated,
    loginSuccess,
    logout,
    hydrateFromStorage,
  }
})
