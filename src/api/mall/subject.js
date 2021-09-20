import request from '@/utils/request'
const api_name = '/mall/subject'
export default {
  // 1 课程分类列表
  getNestedTreeList() {
    return request({
      url: `${api_name}/getAllSubject`,
      method: 'get'
    })
  }
}