import axios from 'axios'
import { Message } from 'element-ui'
import { getCookie } from '@/utils/auth.js'

const fs = require('fs')
const path = require('path')

const configUrl = path.resolve('', 'config.json')
const config = JSON.parse(fs.readFileSync(configUrl))
const baseURL = config.BASE_URL
console.log('kk', process.env.VUE_APP_UPLOADURL)
console.log('kk', process.env.VUE_APP_IMGURL)
const service = axios.create({
  baseURL: baseURL, // api的base_url
  timeout: 10000 // request timeout
})

service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    let _token = getCookie('token')
    if (_token) {
      config.headers['jwt'] = _token
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    let data = response.data
    if (Number(data.code) !== 0) {
      message(data.msg)
      return Promise.reject(data)
    }
    return data
  },
  function (error) {
    // 对响应错误做点什么
    if (/Network Error/.test(error)) {
      message('网络错误')
    }
    if (
      error.code === 'ECONNABORTED' &&
      error.message.indexOf('timeout') !== -1
    ) {
      message('请求超时')
      return Promise.reject(error)
    }
    let response = error.response
    response && message(response.data.message)
    return Promise.reject(error)
  }
)

const message = (info, type = 'error', duration = 3.5 * 1000) =>
  Message({
    message: info,
    type,
    duration
  })

export default service
