import request from '@/utils/axios'

// 扫码登录
export function AccountLogin (params) {
  return request({
    url: '/dingtalk',
    method: 'get',
    params
  })
}
// 账号密码登录
export function Login (data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}
