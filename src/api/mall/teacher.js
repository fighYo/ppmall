import request from '@/utils/request'
const api_name = '/mall/teacher'
export default {
  // 1 讲师列表（条件查询分页）
  // current当前页 limit每页记录数 teacherQuery条件对象
  getTeacherListPage(current, limit, teacherQuery) {
    return request({
      // url: '${api_name}/pageTeacherCondition/'+current+"/"+limit,
      url: `${api_name}/getTeacher/${current}/${limit}`,
      method: 'post',
      // teacherQuery条件对象，后端使用RequestBody获取数据
      // data表示把对象转换json进行传递到接口里面
      data: teacherQuery
    })
  },
  // 删除讲师
  deleteTeacherId(id) {
    return request({
      url: `${api_name}/removeTeacher/${id}`,
      method: 'delete'
    })
  },
  // 添加讲师
  addTeacher(teacher) {
    return request({
      url: `${api_name}/addTeacher`,
      method: 'post',
      data: teacher
    })
  },
  // 根据id查询讲师
  getTeacherInfo(id) {
    return request({
      url: `${api_name}/getTeacherById/${id}`,
      method: 'get'
    })
  },
  // 修改讲师
  updateTeacher(teacher) {
    return request({
      url: `${api_name}/updateTeacher`,
      method: 'put',
      data: teacher
    })
  },
  getList() {
    return request({
      url: `${api_name}/getAllTeacher`,
      method: 'get'
    })
  }
}
