import request from '@/utils/request'
const api_name = '/edu/video'

export default {

  // 添加小节
  addVideo(videoVo) {
    return request({
      url: `${api_name}/saveVideo`,
      method: 'post',
      data: videoVo
    })
  },

  // 删除小节
  deleteVideo(id) {
    return request({
      url: `${api_name}/deleteVideo/${id}`,
      method: 'delete'
    })
  }
}
