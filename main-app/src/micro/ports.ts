/**
 * 各应用开发端口约定（与 Vite server.port 保持一致）
 *
 * - 主应用：5173
 * - 消费者端：5174
 * - 农户端：5175
 * - 管理员端：5176
 */

/** 子应用注册项（与 qiankun registerMicroApps 一致） */
export interface MicroAppItem {
  name: string
  entry: string
  container: string
  activeRule: string
}

/** 主应用 Vite 端口 */
export const MAIN_APP_PORT = 5173

/** 子应用 Vite 端口（qiankun entry 使用） */
export const MICRO_APP_DEV_PORTS = {
  consumer: 5174,
  farmer: 5175,
  admin: 5176,
} as const

/** 根据端口拼子应用 entry（开发环境，随当前 hostname 变化） */
export function microEntryUrl(port: number): string {
  const g = globalThis as unknown as { location?: { protocol: string; hostname: string } }
  const loc = g.location
  if (loc?.protocol && loc.hostname) {
    return `${loc.protocol}//${loc.hostname}:${port}`
  }
  return `http://localhost:${port}`
}
