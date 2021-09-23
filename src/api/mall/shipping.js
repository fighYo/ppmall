import request from '@/utils/request'

const api_name = '/mall/shipping'

export default {
  getShipping(id) {
    return request({
      url: `${api_name}/shipping`,
      method: 'get',
      params: { id }
    })
  }
}
