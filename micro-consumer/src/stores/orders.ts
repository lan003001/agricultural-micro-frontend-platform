/**
 * 我的订单（本地模拟）
 * 下单时将购物车快照写入订单列表，便于「我的订单」页展示
 */

import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { CartLine } from './cart'

const ORDER_KEY = 'micro_consumer_orders'

export interface OrderItem {
  id: string
  createdAt: string
  amount: number
  /** 下单时购物车快照 */
  lines: CartLine[]
  status: '待发货' | '已发货' | '已完成'
}

function load(): OrderItem[] {
  try {
    const raw = localStorage.getItem(ORDER_KEY)
    if (!raw) return []
    return JSON.parse(raw) as OrderItem[]
  } catch {
    return []
  }
}

function save(list: OrderItem[]) {
  localStorage.setItem(ORDER_KEY, JSON.stringify(list))
}

export const useOrderStore = defineStore('orders', () => {
  const orders = ref<OrderItem[]>(load())

  function persist() {
    save(orders.value)
  }

  /** 从购物车创建订单（演示） */
  function createFromCart(lines: CartLine[], amount: number) {
    const order: OrderItem = {
      id: `ORD-${Date.now()}`,
      createdAt: new Date().toISOString(),
      amount,
      lines: JSON.parse(JSON.stringify(lines)) as CartLine[],
      status: '待发货',
    }
    orders.value.unshift(order)
    persist()
    return order
  }

  return {
    orders,
    createFromCart,
    persist,
  }
})
