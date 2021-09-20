<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="productQuery.detail" placeholder="轮播图详情"/>
      </el-form-item>

      <el-form-item label="起始时间">
        <el-date-picker
          v-model="productQuery.begin"
          type="datetime"
          placeholder="选择起始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="productQuery.end"
          type="datetime"
          placeholder="选择结束时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
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

      <el-table-column prop="detail" label="详情" width="250" />

      <el-table-column prop="productId" label="产品名" width="255"/>

      <el-table-column prop="beginTime" label="起始时间" width="160"/>

      <el-table-column prop="endTime" label="结束时间" width="160"/>

      <el-table-column prop="position" label="排序" width="60" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/advert/edit/'+scope.row.id">
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
      productQuery: {}
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
