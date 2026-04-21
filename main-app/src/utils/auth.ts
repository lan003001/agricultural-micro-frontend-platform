/**
 * 本地认证工具（毕设演示）
 *
 * 说明：
 * - 真实项目应配合后端 JWT / Session；此处用 localStorage 模拟登录态，
 *   便于展示路由守卫与布局切换。
 */

const TOKEN_KEY = 'main_app_token'
const USER_KEY = 'main_app_user'

export interface StoredUser {
  /** 用户名 */
  username: string
  /** 展示名称 */
  displayName: string
}

/** 读取 token */
export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

/** 写入 token */
export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

/** 清除 token */
export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

/** 读取用户信息 JSON */
export function getUser(): StoredUser | null {
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as StoredUser
  } catch {
    return null
  }
}

/** 写入用户信息 */
export function setUser(user: StoredUser): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

/** 清除用户信息 */
export function removeUser(): void {
  localStorage.removeItem(USER_KEY)
}

/** 是否已登录（有 token 即视为已登录） */
export function isLoggedIn(): boolean {
  return !!getToken()
}

/** 退出登录：清空本地态 */
export function clearAuth(): void {
  removeToken()
  removeUser()
}
