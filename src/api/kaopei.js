import request from '@/utils/axios'
// 列表页
export function getCaseList (data) {
  return request({
    url: '/getexamlist',
    method: 'post',
    data
  })
}
export function getHome1 (data) {
  return request({
    url: '/examIndex',
    method: 'post',
    data
  })
}
export function getHome2 (data) {
  return request({
    url: '/admissionCollege',
    method: 'post',
    data
  })
}
export function getHome3 (data) {
  return request({
    url: '/admissionList',
    method: 'post',
    data
  })
}
export function getHome4 (data) {
  return request({
    url: '/subjectResult',
    method: 'post',
    data
  })
}
