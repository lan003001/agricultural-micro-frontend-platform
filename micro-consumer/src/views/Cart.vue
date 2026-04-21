<!--
  购物车：展示已加购商品，可修改数量、删除、去结算生成订单
-->
<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { useOrderStore } from '@/stores/orders'
import { ElMessage, ElMessageBox } from 'element-plus'

const cart = useCartStore()
const orders = useOrderStore()

async function checkout() {
  if (cart.lines.length === 0) {
    ElMessage.warning('购物车为空')
    return
  }
  try {
    await ElMessageBox.confirm(`确认下单？合计 ¥${cart.totalAmount.toFixed(2)}`, '结算', {
      type: 'warning',
    })
    orders.createFromCart(cart.lines, cart.totalAmount)
    cart.clear()
    ElMessage.success('下单成功，可在「我的订单」查看')
  } catch {
    /* 用户取消 */
  }
}
</script>

<template>
  <div class="page">
    <h2 class="h2">购物车</h2>
    <el-table v-if="cart.lines.length" :data="cart.lines" border stripe>
      <el-table-column label="商品" min-width="200">
        <template #default="{ row }">
          <div class="cell-name">
            <img class="thumb" :src="row.product.cover" alt="" />
            <span>{{ row.product.name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="单价" width="120">
        <template #default="{ row }">¥{{ row.product.price.toFixed(2) }}</template>
      </el-table-column>
      <el-table-column label="数量" width="160">
        <template #default="{ row }">
          <el-input-number
            :model-value="row.qty"
            :min="1"
            size="small"
            @update:model-value="(v: number) => cart.updateQty(row.product.id, v)"
          />
        </template>
      </el-table-column>
      <el-table-column label="小计" width="120">
        <template #default="{ row }">¥{{ (row.product.price * row.qty).toFixed(2) }}</template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button type="danger" link @click="cart.removeLine(row.product.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-empty v-else description="购物车还是空的，去逛逛商品列表吧" />

    <div v-if="cart.lines.length" class="footer">
      <div class="sum">合计：<strong>¥{{ cart.totalAmount.toFixed(2) }}</strong></div>
      <el-button type="primary" @click="checkout">去结算</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page {
  .h2 {
    margin: 0 0 12px;
    color: #14532d;
  }
}

.cell-name {
  display: flex;
  align-items: center;
  gap: 10px;
}

.thumb {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 4px;
}

.footer {
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
}

.sum {
  font-size: 15px;
  color: #0f172a;
}
</style>
