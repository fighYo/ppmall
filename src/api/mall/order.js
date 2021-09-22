import request from '@/utils/request'

const api_name = '/mall/order'

export default {
  getOrderListPage(current, limit, orderQuery) {
    return request({
      // url: '${api_name}/pageTeacherCondition/'+current+"/"+limit,
      url: `${api_name}/orders/${current}/${limit}`,
      method: 'post',
      // teacherQuery条件对象，后端使用RequestBody获取数据
      // data表示把对象转换json进行传递到接口里面
      data: orderQuery
    })
  },
  getOrder(id) {
    return request({
      url: `${api_name}/order`,
      method: 'get',
      params: { id }
    })
  },
  addOrder(order) {
    return request({
      url: `${api_name}/order`,
      method: 'post',
      data: order
    })
  },
  updateOrder(order) {
    return request({
      url: `${api_name}/order`,
      method: 'put',
      data: order
    })
  },
  deleteOrder(id) {
    return request({
      url: `${api_name}/order/${id}`,
      method: 'delete'
    })
  },
  getDetail(id) {
    return request({
      url: `${api_name}/detail`,
      method: 'get',
      params: { id }
    })
  }

}
