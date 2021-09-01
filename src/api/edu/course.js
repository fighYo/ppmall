import request from '@/utils/request'
const api_name = '/edu/teacher'
export default {
  // 1 添加课程信息
  addCourseInfo(courseInfo) {
    return request({
      url: `${api_name}/course/addCourse`,
      method: 'post',
      data: courseInfo
    })
  },
  // 2 查询所有讲师
  getListTeacher() {
    return request({
      url: '/edu/teacher/getAllTeacher',
      method: 'get'
    })
  },
  // 根据课程id查询课程基本信息
  getCourseInfoId(id) {
    return request({
      url: `${api_name}/getCourse/${id}`,
      method: 'get'
    })
  },
  // 修改课程信息
  updateCourseInfo(courseInfo) {
    return request({
      url: '${api_name}/updateCourse',
      method: 'put',
      data: courseInfo
    })
  },
  // 课程确认信息显示
  getPublishCourseInfo(id) {
    return request({
      url: `${api_name}/getPublishCourseInfo/${id}`,
      method: 'get'
    })
  },
  // 课程最终发布
  publishCourse(id) {
    return request({
      url: `${api_name}/publishCourse/${id}`,
      method: 'put'
    })
  },
  // 课程列表
  getPageList(cur, limit, courseQuery) {
    return request({
      url: `${api_name}/getPageList/${cur}/${limit}`,
      method: 'get',
      params: courseQuery
    })
  },
  getListCourse() {
    return request({
      url: `${api_name}`,
      method: 'get'
    })
  }

}
