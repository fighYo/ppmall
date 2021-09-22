import request from '@/utils/request'

const api_name = '/mall/orderItem'

export default {
  getOrderItemsByOrderNo(orderNo) {
    return request({
      url: `${api_name}/orderItems/${orderNo}`,
      method: 'get'
    })
  }
}
