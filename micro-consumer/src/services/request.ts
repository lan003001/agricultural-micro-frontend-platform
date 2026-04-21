/**
 * Axios 封装（消费者端子应用）
 * 说明：毕设演示以本地 mock 为主，此处保留拦截器结构便于对接后端。
 */

import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || '/api',
  timeout: 15000,
})

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => config,
  (error) => Promise.reject(error),
)

service.interceptors.response.use(
  (response) => response.data,
  (error) => {
    ElMessage.error(error.message || '请求失败')
    return Promise.reject(error)
  },
)

export default service
