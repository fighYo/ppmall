<template>
  <div class="app-container">
    <el-descriptions :column="1" class="margin-top" title="商品详情" border>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-shopping-cart-2"/>
          商品名称
        </template>
        {{ product.name }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-shopping-cart-2"/>
          商品描述
        </template>
        {{ product.subtitle }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-shopping-cart-2"/>
          价格
        </template>
        ￥{{ product.price }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-shopping-cart-2"/>
          库存
        </template>
        {{ product.stock }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-shopping-cart-2"/>
          商品分类
        </template>
        {{ categoryName }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-shopping-cart-2"/>
          商品状态
        </template>
        <div v-if="product.status === 1">
          在售
        </div>
        <div v-else-if="product.status === 2">
          下架
        </div>
        <div v-else>
          删除
        </div>
      </el-descriptions-item>

      <el-descriptions-item label="商品封面">
        <template slot="label">
          <i class="el-icon-shopping-cart-2"/>
          商品封面
        </template>
        <img :src="product.mainImage" :alt="product.name" style="width: 400px; height: 300px; margin: auto;">
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-shopping-cart-2"/>
          预览图片
        </template>
        <template>
          <el-carousel :interval="5000" arrow="always" style="width: 400px; height: 300px; margin: auto;">
            <el-carousel-item v-for="item in subImageList" :key="item">
              <img :src="item.url" :alt="product.name" style="width: 400px; height: 300px;">
            </el-carousel-item>
          </el-carousel>
        </template>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-shopping-cart-2"/>
          商品简介
        </template>
        <template>
          <el-button type="primary" style="margin-left: 16px;" @click="drawer = true">
            点我打开
          </el-button>
        </template>
      </el-descriptions-item>

    </el-descriptions>

    <el-drawer
      :visible.sync="drawer"
      :direction="direction"
      size="60%"
      title="商品简介">
      <span v-html="product.detail"/>
    </el-drawer>

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
      drawer: false,
      direction: 'ltr',
      categoryName: '',
      product: {},
      subImageList: [],
      options: {},
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
    this.init()
  },
  methods: {
    init() {
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        this.getInfo(id)
      } else {
        this.product = {}
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
                  this.categoryName = this.options[i].name + '/' + nestedTwo[j].name
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
    }
  }
}
</script>
