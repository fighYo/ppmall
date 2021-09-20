import request from '@/utils/request'
const api_name = '/mall/video'

export default {
  saveVideoInfo(videoInfo) {
    return request({
      url: `${api_name}/saveVideo`,
      method: 'post',
      data: videoInfo
    })
  },
  getVideoInfoById(id) {
    return request({
      url: `${api_name}/getVideo/${id}`,
      method: 'get'
    })
  },
  updateVideoInfoById(videoInfo) {
    return request({
      url: `${api_name}/updateVideo`,
      method: 'put',
      data: videoInfo
    })
  },
  removeById(id) {
    return request({
      url: `${api_name}/deleteVideo/${id}`,
      method: 'delete'
    })
  }
}
