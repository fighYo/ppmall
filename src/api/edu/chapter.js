import request from '@/utils/request'

const api_name = '/edu/chapter'

export default {
  // 1 根据课程id获取章节和小节数据列表
  getAllChapterVideo(courseId) {
    return request({
      url: `${api_name}/getChapterVideo/${courseId}`,
      method: 'get'
    })
  },
  // 添加章节
  addChapter(chapter) {
    return request({
      url: `${api_name}/addChapter`,
      method: 'post',
      data: chapter
    })
  },
  // 根据id查询章节
  getNestedTreeList(courseId) {
    return request({
      url: `${api_name}/getChapter/${courseId}`,
      method: 'get'
    })
  },
  // 修改章节
  updateChapter(chapter) {
    return request({
      url: `${api_name}/updateChapter`,
      method: 'post',
      data: chapter
    })
  },
  // 删除章节
  deleteChapter(id) {
    return request({
      url: `${api_name}/deleteChapter/${id}`,
      method: 'delete'
    })
  }
}
