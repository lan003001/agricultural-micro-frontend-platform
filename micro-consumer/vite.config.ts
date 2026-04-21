/**
 * 消费者端子应用 Vite 配置（qiankun 子应用）
 *
 * 要点：
 * - vite-plugin-qiankun：第一个参数必须与主应用 registerMicroApps 的 name 一致（micro-consumer）
 * - server.cors：允许主应用跨域加载子应用脚本与资源
 * - server.origin：部分环境下需显式声明，保证动态脚本 URL 正确
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import qiankun from 'vite-plugin-qiankun'
import { fileURLToPath, URL } from 'node:url'

/** 与主应用 activeRule 一致的前缀（子应用路由 base） */
export const MICRO_APP_NAME = 'micro-consumer'

/** 与主应用 src/micro/ports.ts MICRO_APP_DEV_PORTS.consumer 一致 */
const DEV_PORT = 5174

export default defineConfig({
  plugins: [
    vue(),
    qiankun(MICRO_APP_NAME, {
      /** 开发模式下与 qiankun 联调 */
      useDevMode: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: DEV_PORT,
    host: true,
    cors: true,
    /** 保证资源以正确 origin 返回（利于主应用加载） */
    origin: `http://localhost:${DEV_PORT}`,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variables.scss" as *;`,
      },
    },
  },
})
