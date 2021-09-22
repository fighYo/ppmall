<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="商品名称">
        <el-input v-model="product.name"/>
      </el-form-item>

      <el-form-item label="商品描述">
        <el-input v-model="product.subtitle"/>
      </el-form-item>

      <el-form-item label="价格">
        <el-input-number v-model="product.price" :step="0.01" :max="99999999"/>
      </el-form-item>

      <el-form-item label="库存">
        <el-input-number v-model="product.stock" :step="1" :max="99999999" step-strictly/>
      </el-form-item>

      <el-form-item label="商品分类">
        <el-cascader v-model="categoryRoute" :props="{value:'id',label:'name'}" :options="options"/>
      </el-form-item>

      <el-form-item label="商品状态">
        <el-select
          v-model="product.status"
          placeholder="请选择">
          <el-option
            v-for="_status in status"
            :key="_status.value"
            :label="_status.label"
            :value="_status.value"/>
        </el-select>
      </el-form-item>

      <el-form-item label="商品封面">
        <el-upload
          :action="BASE_API+'/oss/upload'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          class="avatar-uploader">
          <img v-if="product.mainImage" :src="product.mainImage" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"/>
        </el-upload>
      </el-form-item>

      <el-form-item label="预览图片">
        <el-upload
          :action="BASE_API+'/oss/upload'"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="uploadSuccess"
          :show-file-list="true"
          :file-list="subImageList"
          list-type="picture-card">
          <i class="el-icon-plus"/>
        </el-upload>
      </el-form-item>
      <el-dialog :visible.sync="dialogVisible">
        <img :src="dialogImageUrl" width="100%" alt="">
      </el-dialog>

      <el-form-item label="商品简介">
        <tinymce :height="600" v-model="product.detail"/>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import category from '@/api/mall/category'
import product from '@/api/mall/product'
import Tinymce from '@/components/Tinymce'

export default {
  components: { Tinymce },
  data() {
    return {
      categoryRoute: [],
      product: {},
      options: {},
      BASE_API: process.env.BASE_API,
      saveBtnDisabled: false,
      dialogImageUrl: '',
      dialogVisible: false,
      subImageList: [],
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
        this.product = {}
        this.categoryRoute = []
      }
      this.initCategoryNestedList()
    },
    initCategoryNestedList() {
      category.getNestedTreeList()
        .then(response => {
          this.options = response.data.categoryNestedList
          if (this.product.id) {
            for (let i = 0; i < this.options.length; i++) {
              const nestedTwo = this.options[i].children
              for (let j = 0; j < nestedTwo.length; j++) {
                if (this.options[i].children[j].id === this.product.categoryId) {
                  this.categoryRoute.push(this.options[i].id, nestedTwo[j].id)
                  return
                }
              }
            }
          }
        })
    },
    getInfo(id) {
      product.getProduct(id)
        .then(response => {
          this.product = response.data.product
          this.initSubImageList(response.data.product.subImages.split(','))
        })
    },
    initSubImageList(subImages) {
      for (let i = 0; i < subImages.length; i++) {
        this.subImageList.push({ url: subImages[i] })
      }
    },
    saveOrUpdate() {
      this.product.categoryId = this.categoryRoute[1]
      if (!this.product.id) {
        this.saveProduct()
      } else {
        this.updateProduct()
      }
    },
    updateProduct() {
      product.updateProduct(this.product)
        .then(response => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.$router.push({ path: '/category/table' })
        })
    },
    saveProduct() {
      product.addProduct(this.product)
        .then(response => {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.$router.push({ path: '/category/table' })
        })
    },
    handleRemove(file, fileList) {
      this.changeSubImages(fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    uploadSuccess(res, file, fileList) {
      fileList[fileList.length - 1].url = res.data.url
      this.changeSubImages(fileList)
    },
    changeSubImages(fileList) {
      let temp_str = ''
      if (fileList.length > 0) {
        for (let i = 0; i < fileList.length; i++) {
          if (i === 0) {
            temp_str += fileList[i].url
          } else {
            temp_str += ',' + fileList[i].url
          }
        }
      }
      this.product.subImages = temp_str
    },
    handleAvatarSuccess(res, file) {
      this.product.mainImage = res.data.url
      this.$forceUpdate()
    }
  }
}
</script>

<style scoped>
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

.tinymce-container {
  line-height: 29px;
}
</style>
