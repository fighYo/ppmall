<template>
  <div class="app-container">
    <el-descriptions :column="1" class="margin-top" title="订单详情" border>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-shopping-cart-2"/>
          用户ID
        </template>
        {{ shipping.userId }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-shopping-cart-2"/>
          收货姓名
        </template>
        {{ shipping.receiverName }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-shopping-cart-2"/>
          固定电话
        </template>
        {{ shipping.receiverPhone }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-shopping-cart-2"/>
          手机
        </template>
        {{ shipping.receiverMobile }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-shopping-cart-2"/>
          收货地址
        </template>
        {{ shipping.receiverProvince + shipping.receiverCity + shipping.receiverDistrict + shipping.receiverAddress }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-shopping-cart-2"/>
          邮编
        </template>
        {{ shipping.receiverZip }}
      </el-descriptions-item>

    </el-descriptions>

  </div>
</template>
<script>

import shipping from '@/api/mall/shipping'
export default {
  data() {
    return {
      shippingId: '',
      listLoading: false,
      shipping: {}
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.shippingId = this.$route.params.id
      // 根据id获取课程基本信息
      this.getShipping(this.shippingId)
    }
  },
  methods: {
    getShipping(id) {
      shipping.getShipping(id)
        .then(response => {
          this.shipping = response.data.shipping
          // console.log(response)
        }).catch(response => {
          this.$router.push({ path: '/order/list' })
        })
    }
  }
}
</script>
