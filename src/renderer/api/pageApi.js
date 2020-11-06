import request from '@/utils/request.js'
// 登录
export const login = param => {
  return request({
    method: 'POST',
    url: '/user/auth',
    data: param
  })
}

// 游戏列表
export const appPaging = param => {
  return request({
    method: 'POST',
    url: '/app/paging',
    data: param
  })
}

// 渠道
export const channelPaging = param => {
  return request({
    method: 'POST',
    url: '/channel/paging',
    data: param
  })
}
