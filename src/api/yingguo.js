import request from '@/utils/axios'
// 第1屏
export function getHome1 (data) {
  return request({
    url: '/getdata',
    method: 'post',
    data
  })
}
// 第2屏
export function getHome2 (data) {
  return request({
    url: '/professionalData',
    method: 'post',
    data
  })
}
// 第3屏
export function getHome3 (data) {
  return request({
    url: '/casecollegeForeign',
    method: 'post',
    data
  })
}
// 第4屏
export function getHome4 (data) {
  return request({
    url: '/caseregion',
    method: 'post',
    data
  })
}
// 第5屏
export function getHome5 (data) {
  return request({
    url: '/casecollege',
    method: 'post',
    data
  })
}
// 第6屏
export function getHome6 (data) {
  return request({
    url: '/caseapply',
    method: 'post',
    data
  })
}
// 第7屏
export function getHome7 (data) {
  return request({
    url: '/backgroundData',
    method: 'post',
    data
  })
}
