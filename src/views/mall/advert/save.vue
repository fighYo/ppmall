<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="轮播图详情">
        <el-input v-model="advert.detail"/>
      </el-form-item>
      <el-form-item label="轮播图排序">
        <el-input-number v-model="advert.position" controls-position="right" min="0.5"/>
      </el-form-item>

      <el-form-item label="产品名称">
        <el-cascader v-model="productRoute" :props="{value:'id',label:'name'}" :options="options" :show-all-levels="false"/>
      </el-form-item>

      <el-form-item label="起始时间">
        <el-date-picker
          v-model="advert.beginTime"
          type="datetime"
          placeholder="选择起始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="advert.endTime"
          type="datetime"
          placeholder="选择结束时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-form-item label="轮播图图像">
        <el-upload
          :action="BASE_API+'/oss/upload'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          class="avatar-uploader">
          <img v-if="advert.image" :src="advert.image" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"/>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import advert from '@/api/mall/advert'
import category from '@/api/mall/category'
export default {
  data() {
    return {
      productRoute: [],
      advert: {
        image: '',
        sort: 1 },
      options: {},
      BASE_API: process.env.BASE_API,
      saveBtnDisabled: false
    }
  },
  watch: {
    $route(to, from) {
      console.log('watch $route')
      this.init()
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        this.getInfo(id)
      } else {
        this.advert = {}
        this.productRoute = []
      }
      this.initCategoryNestedList()
    },
    initCategoryNestedList() {
      category.getNestedTreeListWithProduct()
        .then(response => {
          this.options = response.data.categoryNestedList
          if (this.advert.productId) {
            for (var i = 0; i < this.options.length; i++) {
              var nestedTwo = this.options[i].children
              for (var j = 0; j < nestedTwo.length; j++) {
                var nestedThree = nestedTwo[j].children
                for (var k = 0; k < nestedThree.length; k++) {
                  if (this.options[i].children[j].children[k].id === this.advert.productId) {
                    this.productRoute.push(this.options[i].id, nestedTwo[j].id, nestedThree[k].id)
                    return
                  }
                }
              }
            }
          }
        })
    },
    getInfo(id) {
      advert.getAdvert(id)
        .then(response => {
          this.advert = response.data.advert
        })
    },
    saveOrUpdate() {
      this.advert.productId = this.productRoute[2]
      if (!this.advert.id) {
        this.saveAdvert()
      } else {
        this.updateAdvert()
      }
    },
    updateAdvert() {
      advert.updateAdvert(this.advert)
        .then(response => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.$router.push({ path: '/advert/table' })
        })
    },
    saveAdvert() {
      advert.addAdvert(this.advert)
        .then(response => {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.$router.push({ path: '/advert/table' })
        })
    },
    handleAvatarSuccess(res, file) {
      this.advert.image = res.data.url
      this.$forceUpdate()
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 300px;
  height: 200px;
  line-height: 200px;
  text-align: center;
}
.avatar {
  width: 300px;
  height: 200px;
  display: block;
}
</style>
