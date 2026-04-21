/**
 * Vite 主应用构建配置（毕设：微前端主应用）
 *
 * 说明：
 * - 主应用负责加载子应用（qiankun），需保证开发环境能跨域加载子应用资源。
 * - 端口固定为 5173（与 src/micro/ports.ts 中 MAIN_APP_PORT 一致）。
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { MAIN_APP_PORT } from './src/micro/ports'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    // 路径别名 @ -> src，便于 import '@/xxx'
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    /** 主应用开发端口（与 src/micro/ports.ts MAIN_APP_PORT 一致） */
    port: MAIN_APP_PORT,
    /** 允许被其他来源访问（子应用、局域网调试） */
    host: true,
    cors: true,
    headers: {
      // 部分场景下子应用资源加载需要更宽松的策略
      'Access-Control-Allow-Origin': '*',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 全局注入变量/混入（可在此扩展）
        additionalData: `@use "@/styles/variables.scss" as *;`,
      },
    },
  },
})
