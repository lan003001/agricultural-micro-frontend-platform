<!--
  我的订单：读取本地模拟订单列表
-->
<script setup lang="ts">
import { useOrderStore } from '@/stores/orders'

const orders = useOrderStore()

function formatTime(iso: string) {
  try {
    return new Date(iso).toLocaleString()
  } catch {
    return iso
  }
}
</script>

<template>
  <div class="page">
    <h2 class="h2">我的订单</h2>
    <el-timeline v-if="orders.orders.length">
      <el-timeline-item
        v-for="o in orders.orders"
        :key="o.id"
        :timestamp="formatTime(o.createdAt)"
        placement="top"
      >
        <el-card>
          <div class="order-head">
            <span class="oid">订单号：{{ o.id }}</span>
            <el-tag size="small">{{ o.status }}</el-tag>
            <span class="amount">¥{{ o.amount.toFixed(2) }}</span>
          </div>
          <el-table :data="o.lines" size="small" class="mt">
            <el-table-column prop="product.name" label="商品" />
            <el-table-column label="单价" width="100">
              <template #default="{ row }">¥{{ row.product.price.toFixed(2) }}</template>
            </el-table-column>
            <el-table-column prop="qty" label="数量" width="80" />
          </el-table>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <el-empty v-else description="暂无订单，先在购物车结算一单吧" />
  </div>
</template>

<style scoped lang="scss">
.page {
  .h2 {
    margin: 0 0 12px;
    color: #14532d;
  }
}

.order-head {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.oid {
  font-weight: 600;
}

.amount {
  margin-left: auto;
  color: #dc2626;
  font-weight: 700;
}

.mt {
  margin-top: 10px;
}
</style>
