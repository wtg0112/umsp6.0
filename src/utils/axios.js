import axios from 'axios'
import cookies from '@/utils/cookie'
import { Message, Loading } from 'element-ui'
// 创建一个错误
function errorCreate (msg) {
  const error = new Error(msg)
  throw error
}

// var api = 'http://www.hi-daas.com' // 张
// var api = 'http://192.168.20.71:83' // 樊
// var api = 'http://wk.hi-daas.com' // 王坤
var api = 'http://huang.hi-daas.com' // 黄文辉

// 创建一个 axios 实例
const service = axios.create({
  baseURL: process.env.NODE_ENV == 'development' ? api : 'http://newapi.hi-daas.com'
  // timeout: 5000  //请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在请求发送之前做一些处理
    const token = cookies.get('token')
    const source = cookies.get('source')
    const share = cookies.get('share')
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    config.headers.Sharecode = share
    config.headers.Authorization = token
    config.headers.Source = source
    return config
  },
  error => {
    // 发送失败
    console.log(error)
    Promise.reject(error)
  }
)
// 响应拦截器
service.interceptors.response.use(
  response => {
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data
    // 这个状态码是和后端约定的
    const code = dataAxios.code
    if (code == 200) {
      return dataAxios
    } else {
      switch (code) {
        case 201:
          // 登录失效||重新登录
          var doms = document.getElementsByClassName('el-message')[0]
          if (doms == undefined) {
            Message.error({
              message: dataAxios.msg
            })
          }
          window.location.href = '#/login?source=' + cookies.get('source')
          break
        case 203:
          // 登录失效||重新登录
          var doms2 = document.getElementsByClassName('el-message')[0]
          if (doms2 == undefined) {
            Message.error({
              message: dataAxios.msg
            })
          }
          window.location.href = '#/login?source=' + cookies.get('source')
          break
        default:
          // 其他错误
          Message.error({
            message: dataAxios.msg
          })
          errorCreate(`${dataAxios.msg}: ${response.config.url}`)
          break
      }
      errorCreate(`错误抛出[ code: ${code} ] ${dataAxios.msg}: ${response.config.url}`)
    }
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400: error.message = '请求错误'; break
        case 401: error.message = '未授权，请登录'; break
        case 403: error.message = '拒绝访问'; break
        case 404: error.message = `请求地址出错: ${error.response.config.url}`; break
        case 408: error.message = '请求超时'; break
        case 500: error.message = '服务器内部错误'; break
        case 501: error.message = '服务未实现'; break
        case 502: error.message = '网关错误'; break
        case 503: error.message = '服务不可用'; break
        case 504: error.message = '网关超时'; break
        case 505: error.message = 'HTTP版本不受支持'; break
        default: break
      }
    }
    return Promise.reject(error)
  }
)

export default service
