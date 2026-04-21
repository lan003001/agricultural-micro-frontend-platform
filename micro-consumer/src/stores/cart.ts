/**
 * 购物车状态（Pinia）
 * 使用 localStorage 持久化，便于刷新后仍保留（毕设演示）
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product } from '@/mock/products'

const STORAGE_KEY = 'micro_consumer_cart'

export interface CartLine {
  product: Product
  qty: number
}

function loadFromStorage(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as CartLine[]
  } catch {
    return []
  }
}

function saveToStorage(lines: CartLine[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
}

export const useCartStore = defineStore('cart', () => {
  const lines = ref<CartLine[]>(loadFromStorage())

  const totalCount = computed(() => lines.value.reduce((n, l) => n + l.qty, 0))

  const totalAmount = computed(() =>
    lines.value.reduce((sum, l) => sum + l.product.price * l.qty, 0),
  )

  function persist() {
    saveToStorage(lines.value)
  }

  function addToCart(product: Product, qty = 1) {
    const exist = lines.value.find((l) => l.product.id === product.id)
    if (exist) {
      exist.qty += qty
    } else {
      lines.value.push({ product: { ...product }, qty })
    }
    persist()
  }

  function updateQty(productId: string, qty: number) {
    const line = lines.value.find((l) => l.product.id === productId)
    if (!line) return
    line.qty = Math.max(1, qty)
    persist()
  }

  function removeLine(productId: string) {
    lines.value = lines.value.filter((l) => l.product.id !== productId)
    persist()
  }

  function clear() {
    lines.value = []
    persist()
  }

  return {
    lines,
    totalCount,
    totalAmount,
    addToCart,
    updateQty,
    removeLine,
    clear,
  }
})
