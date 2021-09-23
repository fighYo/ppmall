<template>
  <div class="app-container">
    <el-descriptions :column="2" class="margin-top" title="订单详情" border>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-shopping-cart-2"/>
          订单编号
        </template>
        {{ item.orderNo }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"/>
          用户ID
        </template>
        <router-link :to="'/order/shipping/'+item.shippingId">
          {{ item.userId }}
        </router-link>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-wallet"/>
          支付金额
        </template>
        ￥{{ item.payment }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-bank-card"/>
          支付方式
        </template>
        <div v-if="item.status === 0">
          未付款
        </div>
        <div v-else-if="item.paymentType === 1">
          在线付款
        </div>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-date"/>
          创建时间
        </template>
        <div v-if="item.createTime === undefined || item.createTime === null || item.createTime === ''">
          暂未
        </div>
        <div v-else>
          {{ item.createTime }}
        </div>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-date"/>
          支付时间
        </template>
        <div v-if="item.paymentTime === undefined || item.paymentTime === null || item.paymentTime === ''">
          暂未
        </div>
        <div v-else>
          {{ item.paymentTime }}
        </div>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-date"/>
          发货时间
        </template>
        <div v-if="item.sendTime === undefined || item.sendTime === null || item.sendTime === ''">
          暂未
        </div>
        <div v-else>
          {{ item.sendTime }}
        </div>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-date"/>
          交易完成时间
        </template>
        <div v-if="item.endTime === undefined || item.endTime === null || item.endTime === ''">
          暂未
        </div>
        <div v-else>
          {{ item.endTime }}
        </div>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-date"/>
          交易关闭时间
        </template>
        <div v-if="item.closeTime === undefined || item.closeTime === null || item.closeTime === ''">
          暂未
        </div>
        <div v-else>
          {{ item.closeTime }}
        </div>
      </el-descriptions-item>

    </el-descriptions>

    <el-table
      v-loading="listLoading"
      :data="item.orderItems"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row
      row-class-name="myClassList">

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column label="商品编号" width="250" >
        <template slot-scope="scope">
          <router-link :to="'/category/detail/'+scope.row.productId">
            {{ scope.row.productId }}
          </router-link>
        </template>
      </el-table-column>

      <el-table-column label="商品名" width="250" >
        <template slot-scope="scope">
          <router-link :to="'/category/detail/'+scope.row.productId">
            {{ scope.row.productName }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="单价" width="200">
        <template slot-scope="scope">
          ￥{{ scope.row.currentUnitPrice }}
        </template>
      </el-table-column>
      <el-table-column prop="quantity" label="数量" width="199" />
      <el-table-column label="合计" width="200">
        <template slot-scope="scope">
          ￥{{ scope.row.totalPrice }}
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>
<script>

import order from '@/api/mall/order'
export default {
  data() {
    return {
      orderId: '',
      listLoading: false,
      item: ''
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.orderId = this.$route.params.id
      // 根据id获取课程基本信息
      this.getOrderDetail(this.orderId)
    }
  },
  methods: {
    getOrderDetail(id) {
      order.getDetail(id)
        .then(response => {
          this.item = response.data.detail
          // console.log(response)
        }).catch(response => {
          console.log('error')
        })
    }
  }
}
</script>
