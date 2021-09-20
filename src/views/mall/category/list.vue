<template>
  <div class="app-container">
    <h2 style="text-align: center;">商品分类</h2>
    <el-button
      type="text"
      @click="dialogCategoryOneFormVisible = true
              category = {name: ''}
              categoryId = ''"
    >添加一级分类</el-button>
    <!-- 章节 -->
    <ul class="levelOneList">
      <li
        v-for="categoryOne in categoryNestedList"
        :key="categoryOne.id">
        <p>
          {{ categoryOne.name }}
          <span class="acts">
            <el-button
              type="text"
              @click="dialogCategoryTwoFormVisible = true;
                      categoryId = '';
                      category= {}">添加二级分类</el-button>
            <el-button type="text" @click="editCategoryOne(categoryOne.id)">编辑</el-button>
            <el-button type="text" @click="removeCategory(categoryOne.id)">删除</el-button>
          </span>
        </p>
        <!-- 视频 -->
        <ul class="levelOneList videoList">
          <li
            v-for="categoryTwo in categoryOne.children"
            :key="categoryTwo.id">
            <p>{{ categoryTwo.name }}
              <span class="acts">
                <el-button type="text" @click="editCategoryTwo(categoryTwo.id)">编辑</el-button>
                <el-button type="text" @click="removeCategory(categoryTwo.id)">删除</el-button>
              </span>
            </p>
          </li>
        </ul>
      </li>
    </ul>

    <!-- 添加和修改章节表单 -->
    <el-dialog :visible.sync="dialogCategoryOneFormVisible" title="编辑一级分类">
      <el-form :model="category" label-width="120px">
        <el-form-item label="分类标题">
          <el-input v-model="category.name"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCategoryOneFormVisible = false">取 消</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加和修改课时表单 -->
    <el-dialog :visible.sync="dialogCategoryTwoFormVisible" title="编辑二级分类">

      <el-form :model="category" label-width="120px">

        <el-form-item label="一级分类">
          <el-select
            v-model="category.parentId"
            placeholder="请选择">
            <el-option
              v-for="category in categoryNestedList"
              :key="category.id"
              :label="category.name"
              :value="category.id"/>
          </el-select>
        </el-form-item>

        <el-form-item label="分类标题">
          <el-input v-model="category.name"/>
        </el-form-item>

        <el-form-item label="分类图像">
          <el-upload
            :action="BASE_API+'/oss/upload'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            class="avatar-uploader">
            <img v-if="category.mainImage" :src="category.mainImage" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"/>
          </el-upload>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCategoryTwoFormVisible = false">取 消</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>
<script>
import category from '@/api/mall/category'

export default {
  data() {
    return {
      categoryId: '',
      categoryNestedList: [],
      saveBtnDisabled: false,
      dialogCategoryOneFormVisible: false,
      category: { // 一级分类对象
        name: ''
      },
      saveVideoBtnDisabled: false,
      dialogCategoryTwoFormVisible: false,
      BASE_API: process.env.BASE_API
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getCategorys()
    },
    getCategorys() {
      category.getNestedTreeList().then(response => {
        this.categoryNestedList = response.data.categoryNestedList
      })
    },

    saveOrUpdate() {
      this.saveBtnDisabled = true
      if (!this.categoryId) {
        this.saveCategory()
      } else {
        this.updateCategory()
      }
    },
    saveCategory() {
      category.addCategory(this.category).then(response => {
        this.$message({
          type: 'success',
          message: '保存成功!'
        })
        this.helpSave()
      }).catch((response) => {
        this.$message({
          type: 'error',
          message: response.message
        })
      })
    },
    updateCategory() {
      this.category.categoryId = this.categoryId
      category.updateCategory(this.category).then(response => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.helpSave()
      }).catch((response) => {
        // console.log(response)
        this.$message({
          type: 'error',
          message: response.message
        })
      })
    },

    helpSave() {
      this.dialogCategoryOneFormVisible = false// 如果保存成功则关闭对话框
      this.dialogCategoryTwoFormVisible = false// 如果保存成功则关闭对话框
      this.getCategorys()// 刷新列表
      this.category = {}
      this.saveBtnDisabled = false
    },
    editCategoryOne(id) {
      this.categoryId = id
      this.dialogCategoryOneFormVisible = true
      category.getCategoryById(id).then(response => { this.category = response.data.category })
    },
    removeCategory(id) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return category.deleteCategory(id)
      }).then(() => {
        this.getCategorys()
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
            message: response.message
          })
        }
      })
    },
    editCategoryTwo(id) {
      this.categoryId = id
      this.dialogCategoryTwoFormVisible = true
      category.getCategoryById(id).then(response => { this.category = response.data.category })
    },
    handleAvatarSuccess(res, file) {
      this.category.mainImage = res.data.url
      this.$forceUpdate()
    }
  }
}
</script>

<style scoped>
.levelOneList{
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}
.levelOneList li{
  position: relative;
}
.levelOneList p{
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #DDD;
}
.levelOneList .acts {
  float: right;
  font-size: 14px;
}
.videoList{
  padding-left: 50px;
}
.videoList p{
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #DDD;
}
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
