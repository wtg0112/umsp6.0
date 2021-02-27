import request from '@/utils/axios'
// 日本
// 详情页
export function details (data) {
  return request({
    url: '/casedetails',
    method: 'post',
    data
  })
}
// 首页第一屏幕
export function getHome (data) {
  return request({
    url: '/getdata',
    method: 'post',
    data
  })
}
// 首页第二屏幕
export function getHome2 (data) {
  return request({
    url: '/caseprofessor',
    method: 'post',
    data
  })
}
// 首页第三屏幕
export function getHome3 (data) {
  return request({
    url: '/caseapply',
    method: 'post',
    data
  })
}
// 首页第三占比
export function getProportion (data) {
  return request({
    url: '/proportion',
    method: 'post',
    data
  })
}
// 首页第四屏幕
export function getHome4 (data) {
  return request({
    url: '/caseregion',
    method: 'post',
    data
  })
}
// 首页第五屏幕
export function getHome5 (data) {
  return request({
    url: '/casecollege',
    method: 'post',
    data
  })
}
