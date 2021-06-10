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
