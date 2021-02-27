import request from '@/utils/axios'
// 美本
// 列表页图表
export function caseChart (data) {
  return request({
    url: '/casechart',
    method: 'post',
    data
  })
}
// 详情页信息接口
export function details (data) {
  return request({
    url: '/casedetails',
    method: 'post',
    data
  })
}
// 详情页添加精品案例
export function boutique (data) {
  return request({
    url: '/setboutique',
    method: 'post',
    data
  })
}
// 分享
export function getShareCode (data) {
  return request({
    url: '/getShareCode',
    method: 'post',
    data
  })
}
// 首页2
export function getHome2 (data) {
  return request({
    url: '/professionalData',
    method: 'post',
    data
  })
}
// 首页3
export function getHome3 (data) {
  return request({
    url: '/caseapply',
    method: 'post',
    data
  })
}
// 首页4
export function getHome4 (data) {
  return request({
    url: '/backgroundData',
    method: 'post',
    data
  })
}
// 首页5
export function getHome5 (data) {
  return request({
    url: '/casecollege',
    method: 'post',
    data
  })
}
// 首页6
export function getHome6 (data) {
  return request({
    url: '/casecollegeForeign',
    method: 'post',
    data
  })
}
// 首页7
export function getHome7 (data) {
  return request({
    url: '/caseregion',
    method: 'post',
    data
  })
}
// 首页8
export function getHome8 (data) {
  return request({
    url: '/areasAbroad',
    method: 'post',
    data
  })
}
