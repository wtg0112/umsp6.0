import request from '@/utils/axios'
// 公用API
// 列表通用
export function getList (data) {
  return request({
    url: '/getlist',
    method: 'post',
    data
  })
}
// 学科通用
export function getxueke (data) {
  return request({
    url: '/getsubject',
    method: 'post',
    data
  })
}
// 专业通用
export function getzhuanye (data) {
  return request({
    url: '/getmajor',
    method: 'post',
    data
  })
}
// 城市通用
export function getcity (data) {
  return request({
    url: '/getregion',
    method: 'post',
    data
  })
}
// 日本列表统计
export function getTotal (data) {
  return request({
    url: '/casetotal',
    method: 'post',
    data
  })
}
// 获取项目通用
export function getproject (data) {
  return request({
    url: '/getproject',
    method: 'post',
    data
  })
}
