import request from '@/utils/request'

const api_name = '/mall/advert'

export default {
  getAdvertListPage(current, limit, advertQuery) {
    return request({
      // url: '${api_name}/pageTeacherCondition/'+current+"/"+limit,
      url: `${api_name}/adverts/${current}/${limit}`,
      method: 'post',
      // teacherQuery条件对象，后端使用RequestBody获取数据
      // data表示把对象转换json进行传递到接口里面
      data: advertQuery
    })
  },
  getAdvert(id) {
    return request({
      url: `${api_name}/advert`,
      method: 'get',
      params: { id }
    })
  },
  addAdvert(advert) {
    return request({
      url: `${api_name}/advert`,
      method: 'post',
      data: advert
    })
  },
  updateAdvert(advert) {
    return request({
      url: `${api_name}/advert`,
      method: 'put',
      data: advert
    })
  },
  deleteAdvert(id) {
    return request({
      url: `${api_name}/advert/${id}`,
      method: 'delete'
    })
  }

}
