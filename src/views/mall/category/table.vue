<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="productQuery.name" placeholder="商品名称"/>
      </el-form-item>
      <el-form-item label="最低价格">
        <el-input-number v-model="productQuery.minPrice" :step="0.01" :max="99999999"/>
      </el-form-item>
      <el-form-item label="最高价格">
        <el-input-number v-model="productQuery.maxPrice" :step="0.01" :max="99999999"/>
      </el-form-item>
      <el-form-item style="width: 150px">
        <el-select
          v-model="productQuery.status"
          placeholder="商品状态">
          <el-option
            v-for="_status in status"
            :key="_status.value"
            :label="_status.label"
            :value="_status.value"/>
        </el-select>
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

      <el-table-column label="产品名" width="250" >
        <template slot-scope="scope">
          <router-link :to="'/category/detail/'+scope.row.id">
            {{ scope.row.name }}
          </router-link>
        </template>
      </el-table-column>

      <el-table-column prop="subtitle" label="商品描述" width="255"/>

      <el-table-column label="价格" width="125">
        <template slot-scope="scope">
          ￥{{ scope.row.price }}
        </template>
      </el-table-column>

      <el-table-column prop="stock" label="库存数量" width="125"/>

      <el-table-column label="商品状态" width="80">
        <template slot-scope="scope">
          <div v-if="scope.row.status === 1">
            <el-tag type="success" effect="dark">
              在售
            </el-tag>
          </div>
          <div v-else-if="scope.row.status === 2">
            <el-tag type="info" effect="dark">
              下架
            </el-tag>
          </div>
          <div v-else>
            <el-tag type="danger" effect="dark">
              删除
            </el-tag>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="264" align="center">
        <template slot-scope="scope">
          <router-link :to="'/category/detail/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-search">查看</el-button>
          </router-link>
          <router-link :to="'/category/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>

          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
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

import product from '@/api/mall/product'
export default {
  data() {
    return {
      listLoading: false,
      list: [],
      current: 1,
      limit: 5,
      total: 10,
      productQuery: {},
      status: [{
        value: 1,
        label: '在售'
      },
      {
        value: 2,
        label: '下架'
      },
      {
        value: 3,
        label: '删除'
      }]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList(current = 1) {
      this.current = current
      product.getProductListPage(this.current, this.limit, this.productQuery)
        .then(response => {
          // console.log(response)
          this.list = response.data.rows
          this.total = response.data.total
        }).catch(response => {
          console.log('error')
        })
    },
    resetData() {
      this.productQuery = {}
      this.getList()
    },
    removeDataById(id) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return product.deleteProduct(id)
      }).then(() => {
        this.getList()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch((response) => { // 失败
        if (response === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        } else {
          this.$message({
            type: 'error',
            message: '删除失败'
          })
        }
      })
    }
  }
}
</script>
