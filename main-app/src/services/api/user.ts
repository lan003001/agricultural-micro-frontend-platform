/**
 * 用户相关 API（毕设演示）
 *
 * 说明：后端未接时，登录在 views 内直接模拟成功；
 * 此处保留接口形态，便于后续对接真实后端。
 */

import request from '@/services/request'
import type { StoredUser } from '@/utils/auth'

/** 登录请求体 */
export interface LoginPayload {
  username: string
  password: string
}

/** 登录响应（示例结构） */
export interface LoginResult {
  token: string
  user: StoredUser
}

/** 模拟登录接口路径（无后端时可不调用） */
export function loginApi(data: LoginPayload) {
  return request.post<LoginResult>('/auth/login', data)
}
