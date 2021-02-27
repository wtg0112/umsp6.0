import request from '@/utils/axios'

// 地一屏
export function gzindex (data) {
  return request({
    url: '/gzindex',
    method: 'post',
    data
  })
}

// 美国高中详情页
export function details(params) {
  return request({
    url: '/casedetails',
    method: 'post',
    params
  })
}
// 第二屏
export function apply(data) {
  return request({
    url: '/domesticApplication',
    method: 'post',
    data
  })
}

// 第三屏
export function anli(data) {
  return request({
    url: '/gwcaseregion',
    method: 'post',
    data
  })
}

// 第四屏
export function casetrend (data) {
  return request({
    url: '/casetrend',
    method: 'post',
    data
  })
}

// 根据省份获取院校
export function getInfo(data) {
  return request({
    url: '/stateschool',
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
