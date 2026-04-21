/**
 * 管理员端子应用 Vite（qiankun）
 * 端口 5176，与主应用 src/micro/ports.ts MICRO_APP_DEV_PORTS.admin 一致
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import qiankun from 'vite-plugin-qiankun'
import { fileURLToPath, URL } from 'node:url'

export const MICRO_APP_NAME = 'micro-admin'
const DEV_PORT = 5176

export default defineConfig({
  plugins: [
    vue(),
    qiankun(MICRO_APP_NAME, {
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
