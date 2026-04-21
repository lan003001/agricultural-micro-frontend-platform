<!--
  商品详情：根据路由 id 展示 mock 商品，可加购
-->
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { findProductById } from '@/mock/products'
import { useCartStore } from '@/stores/cart'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const cart = useCartStore()

const product = computed(() => findProductById(route.params.id as string))

function back() {
  router.push({ name: 'ProductList' })
}

function add() {
  const p = product.value
  if (!p) return
  cart.addToCart(p, 1)
  ElMessage.success('已加入购物车')
}
</script>

<template>
  <div v-if="product" class="page">
    <el-page-header @back="back">
      <template #content>
        <span class="title">{{ product.name }}</span>
      </template>
    </el-page-header>
    <div class="detail">
      <img class="cover" :src="product.cover" :alt="product.name" />
      <div class="info">
        <p class="desc">{{ product.desc }}</p>
        <ul class="facts">
          <li>产地：{{ product.origin }}</li>
          <li>库存：{{ product.stock }} {{ product.unit }}</li>
          <li>单价：¥{{ product.price.toFixed(2) }} / {{ product.unit }}</li>
        </ul>
        <el-button type="primary" @click="add">加入购物车</el-button>
      </div>
    </div>
  </div>
  <el-empty v-else description="未找到该商品" />
</template>

<style scoped lang="scss">
.page {
  .title {
    font-weight: 600;
  }
}

.detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 16px;
}

@media (max-width: 768px) {
  .detail {
    grid-template-columns: 1fr;
  }
}

.cover {
  width: 100%;
  max-height: 320px;
  object-fit: cover;
  border-radius: 8px;
  background: #f1f5f9;
}

.desc {
  line-height: 1.7;
  color: #334155;
}

.facts {
  padding-left: 18px;
  color: #475569;
  line-height: 1.8;
}
</style>
