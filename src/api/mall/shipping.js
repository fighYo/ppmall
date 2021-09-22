import request from '@/utils/request'

const api_name = '/mall/shipping'

export default {
  getShipping(id) {
    return request({
      url: `${api_name}/orderItems`,
      method: 'get',
      params: { id }
    })
  }
}
