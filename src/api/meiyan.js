import request from '@/utils/axios'
// 美研
// 详情页
export function details (data) {
  return request({
    url: '/casedetails',
    method: 'post',
    data
  })
}
// 第一屏
export function home1 (data) {
  return request({
    url: '/getdata',
    method: 'post',
    data
  })
}
// 第二屏
export function getHome2 (data) {
  return request({
    url: '/casecollegeForeign',
    method: 'post',
    data
  })
}
// 第三屏
export function getHome3 (data) {
  return request({
    url: '/caseapply',
    method: 'post',
    data
  })
}
// 第四屏
export function getHome4 (data) {
  return request({
    url: '/backgroundData',
    method: 'post',
    data
  })
}
// 第五屏奖学金
export function getHome5 (data) {
  return request({
    url: '/scholarship',
    method: 'post',
    data
  })
}
// 第六屏
export function getHome6 (data) {
  return request({
    url: '/casecollege',
    method: 'post',
    data
  })
}
// 第七屏
export function getHome7 (data) {
  return request({
    url: '/caseregion',
    method: 'post',
    data
  })
}
// 第55屏(暂时废弃)
export function getHome55 (data) {
  return request({
    url: '/professionalData',
    method: 'post',
    data
  })
}
