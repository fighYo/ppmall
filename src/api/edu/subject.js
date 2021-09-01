import request from '@/utils/request'
const api_name = '/edu/subject'
export default {
  // 1 课程分类列表
  getSubjectList() {
    return request({
      url: `${api_name}/getAllSubject`,
      method: 'get'
    })
  }
}
