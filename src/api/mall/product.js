import request from '@/utils/request'
const api_name = '/mall/product'
export default {

  getProductListPage(current, limit, productQuery) {
    return request({
      url: `${api_name}/products/${current}/${limit}`,
      method: 'post',
      // teacherQuery条件对象，后端使用RequestBody获取数据
      // data表示把对象转换json进行传递到接口里面
      data: productQuery
    })
  },
  getProduct(id) {
    return request({
      url: `${api_name}/product`,
      method: 'get',
      params: { id }
    })
  },
  addProduct(product) {
    return request({
      url: `${api_name}/product`,
      method: 'post',
      data: product
    })
  },
  updateProduct(product) {
    return request({
      url: `${api_name}/product`,
      method: 'put',
      data: product
    })
  },
  deleteProduct(id) {
    return request({
      url: `${api_name}/product/${id}`,
      method: 'delete'
    })
  }
}
