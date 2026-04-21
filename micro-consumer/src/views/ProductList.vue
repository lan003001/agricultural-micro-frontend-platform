<!--
  商品列表：展示 mock 农产品，支持跳转详情、加入购物车
-->
<script setup lang="ts">
import { mockProducts } from '@/mock/products'
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const cart = useCartStore()

function goDetail(id: string) {
  router.push({ name: 'ProductDetail', params: { id } })
}

function addCart(id: string) {
  const p = mockProducts.find((x) => x.id === id)
  if (!p) return
  cart.addToCart(p, 1)
  ElMessage.success(`已加入购物车：${p.name}`)
}
</script>

<template>
  <div class="page">
    <h2 class="h2">商品列表</h2>
    <p class="tip">以下为模拟数据，演示消费者端列表与购物车联动。</p>
    <el-row :gutter="16">
      <el-col v-for="p in mockProducts" :key="p.id" :xs="24" :sm="12" :md="8" :lg="6">
        <el-card class="card" shadow="hover" @click="goDetail(p.id)">
          <div class="cover-wrap">
            <img class="cover" :src="p.cover" :alt="p.name" />
          </div>
          <div class="meta">
            <div class="name">{{ p.name }}</div>
            <div class="sub">{{ p.origin }} · 库存 {{ p.stock }}{{ p.unit }}</div>
            <div class="price-row">
              <span class="price">¥{{ p.price.toFixed(2) }}</span>
              <span class="unit">/{{ p.unit }}</span>
            </div>
            <div class="actions" @click.stop>
              <el-button type="primary" size="small" @click="addCart(p.id)">加入购物车</el-button>
              <el-button size="small" @click="goDetail(p.id)">查看详情</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.page {
  .h2 {
    margin: 0 0 8px;
    color: #14532d;
  }
  .tip {
    color: #64748b;
    font-size: 13px;
    margin-bottom: 16px;
  }
}

.card {
  margin-bottom: 16px;
  cursor: pointer;
}

.cover-wrap {
  height: 140px;
  overflow: hidden;
  border-radius: 6px;
  background: #f1f5f9;
}

.cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.meta {
  padding-top: 10px;
}

.name {
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 4px;
}

.sub {
  font-size: 12px;
  color: #64748b;
  margin-bottom: 8px;
}

.price-row {
  margin-bottom: 10px;
}

.price {
  color: #dc2626;
  font-size: 18px;
  font-weight: 700;
}

.unit {
  font-size: 12px;
  color: #94a3b8;
}

.actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
</style>
