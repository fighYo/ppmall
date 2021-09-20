import request from '@/utils/request'
const api_name = '/mall/course'
export default {
  saveCourseInfo(courseInfo) {
    return request({
      url: `${api_name}/addCourse`,
      method: 'post',
      data: courseInfo
    })
  },
  getCourseInfoById(id) {
    return request({
      url: `${api_name}/getCourse/${id}`,
      method: 'get'
    })
  },
  updateCourseInfoById(courseInfo) {
    return request({
      url: `${api_name}/updateCourse`,
      method: 'put',
      data: courseInfo
    })
  },
  getCoursePublishInfoById(id) {
    return request({
      url: `${api_name}/getPublishCourseInfo/${id}`,
      method: 'get'
    })
  },
  publishCourse(id) {
    return request({
      url: `${api_name}/publishCourse/${id}`,
      method: 'put'
    })
  },
  getPageList(cur, limit, courseQuery) {
    return request({
      url: `${api_name}/getPageList/${cur}/${limit}`,
      method: 'get',
      params: courseQuery
    })
  },
  removeById(id) {
    return request({
      url: `${api_name}removeCourse/${id}`,
      method: 'delete'
    })
  }
}
