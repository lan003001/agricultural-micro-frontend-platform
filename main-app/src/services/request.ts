/**
 * Axios 封装（毕设主应用）
 *
 * 功能：
 * - 统一 baseURL（来自环境变量）
 * - 请求/响应拦截：附带 token、统一错误提示（可接 Element Plus Message）
 */

import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'
import { getToken, clearAuth } from '@/utils/auth'
import { ElMessage } from 'element-plus'

/** 创建实例 */
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || '/api',
  timeout: 15000,
})

/** 请求拦截：附加 Authorization */
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken()
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

/** 响应拦截：处理 401 等 */
service.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status
    if (status === 401) {
      clearAuth()
      ElMessage.error('登录已过期，请重新登录')
      // 动态导入避免 request 与 router 循环依赖
      void import('@/router').then((m) => m.default.push({ name: 'Login' }))
    } else {
      ElMessage.error(error.message || '网络错误')
    }
    return Promise.reject(error)
  },
)

export default service
