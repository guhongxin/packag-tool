import request from '@/utils/request.js'
// 登录
export const login = param => {
  return request({
    method: 'POST',
    url: '/user/auth',
    data: param
  })
}
