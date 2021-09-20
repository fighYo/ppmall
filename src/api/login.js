import request from '@/utils/request'

const api_name = '/mall/user'

export function login(username, password) {
  return request({
    url: `${api_name}/login`,
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: `${api_name}/info`,
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/edu/user/logout',
    method: 'post'
  })
}
