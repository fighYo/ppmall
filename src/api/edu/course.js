import request from '@/utils/request'
const api_name = '/edu/course'
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
  }
}
