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

// 签名证书列表
export const certPaging = param => {
  return request({
    method: 'POST',
    url: '/cert/paging',
    data: param
  })
}

// 渠道
export const bundlePaging = param => {
  return request({
    method: 'POST',
    url: '/bundle/paging',
    data: param
  })
}

// 打包
export const bundleMake = param => {
  return request({
    method: 'POST',
    url: '/bundle/make',
    data: param
  })
}
