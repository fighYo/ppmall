import request from '@/utils/request'
const api_name = '/mall/category'
export default {
  // 1 课程分类列表
  getNestedTreeList() {
    return request({
      url: `${api_name}/categoryNestedList`,
      method: 'get'
    })
  },
  getCategoryById(id) {
    return request({
      url: `${api_name}/category`,
      method: 'get',
      params: { id }
    })
  },
  updateCategory(category) {
    return request({
      url: `${api_name}/category`,
      method: 'put',
      data: category
    })
  },
  addCategory(category) {
    return request({
      url: `${api_name}/category`,
      method: 'post',
      data: category
    })
  },
  deleteCategory(id) {
    return request({
      url: `${api_name}/category/${id}`,
      method: 'delete'
    })
  }

}
