/**
 * 主应用与子应用数据桥梁（毕设说明）
 *
 * qiankun 在 mount 钩子中传入 props（如主应用下发的 getGlobalState），
 * 子应用在独立运行时没有该数据，此处用可空状态兼容两种模式。
 */

export interface HostGlobalState {
  user?: { username?: string; displayName?: string } | null
  token?: string | null
}

let cachedHost: HostGlobalState | null = null

/** 在 qiankun mount 时由 main.ts 调用，写入主应用下发的状态 */
export function setHostGlobalState(state: HostGlobalState | null) {
  cachedHost = state
}

/** 页面（如个人中心）读取主应用用户信息 */
export function getHostGlobalState(): HostGlobalState | null {
  return cachedHost
}
