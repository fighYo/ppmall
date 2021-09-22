<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="订单编号">
        <el-input v-model="orderQuery.orderNo" placeholder="订单编号"/>
      </el-form-item>

      <el-form-item label="用户ID">
        <el-input v-model="orderQuery.userId" placeholder="用户ID"/>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (current - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="orderNo" label="订单编号" width="250" />

      <el-table-column prop="userId" label="用户ID" width="255"/>
      <el-table-column label="订单状态" width="100">
        <template slot-scope="scope">
          <div v-if="scope.row.status === 0">
            已取消
          </div>
          <div v-else-if="scope.row.status === 10">
            未付款
          </div>
          <div v-else-if="scope.row.status === 20">
            已付款
          </div>
          <div v-else-if="scope.row.status === 40">
            已发货
          </div>
          <div v-else-if="scope.row.status === 50">
            交易成功
          </div>
          <div v-else-if="scope.row.status === 60">
            交易关闭
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="payment" label="支付金额" width="160"/>

      <el-table-column prop="createTime" label="创建时间" width="160"/>

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/order/detail/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">查看</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="current"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>
<script>

import order from '@/api/mall/order'
import product from '@/api/mall/product'
export default {
  data() {
    return {
      listLoading: false,
      list: [],
      current: 1,
      limit: 5,
      total: 10,
      orderQuery: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList(current = 1) {
      this.current = current
      order.getOrderListPage(this.current, this.limit, this.orderQuery)
        .then(response => {
          // console.log(response)
          this.list = response.data.rows
          this.total = response.data.total
        }).catch(response => {
          console.log('error')
        })
    },
    getProductName(i, id) {
      product.getProduct(id)
        .then(response => {
          this.list[i].productId = response.data.product.name
          this.$forceUpdate()
        })
    },
    resetData() {
      this.orderQuery = {}
      this.getList()
    }
  }
}
</script>
