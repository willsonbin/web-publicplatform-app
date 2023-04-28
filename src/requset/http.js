/**
  * axios封装
  * 请求拦截、响应拦截、错误统一处理
  */
import axios from 'axios'
import store from '../store/index'
import { Notify } from 'vant'
import Cookies from 'js-cookie'
/**
   * 提示函数
   * 禁止点击蒙层、显示一秒后关闭
   */
const tip = msg => {
  Notify({
    message: msg,
    duration: 1500,
    type: 'danger'
  })
}
const TOKEN = 'app_token'

/**
   * 请求失败后的错误统一处理
   * @param {Number} status 请求失败的状态码
   */
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    case 401:
      tip('用户未登录，请先登录后再试')
      break
    case 404:
      tip('请求的资源不存在')
      break
    case 500:
      tip('服务器错误，请稍侯重试')
      break
    default:
      tip('网络错误，请稍候重试')
  }
}

// 创建axios实例
var instance = axios.create({timeout: 1000 * 50})
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
/**
   * 请求拦截器
   * 每次请求前，如果存在token则在请求头中携带token
   */
instance.interceptors.request.use(
  config => {
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
    const token = store.state.Token.token || Cookies.get(TOKEN)
    config.headers.Token = token || ''
    // config.headers.Token = '60df9364-3676-44c5-8ce3-522eda83ac8b' || token
    config.headers.Lang = 'CHNS'
    return config
  },
  error => Promise.error(error))

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => res.status === 200 ? Promise.resolve(res.data) : Promise.reject(res),
  // 请求失败
  error => {
    const { response } = error
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.message)
      return Promise.reject(response)
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      store.commit('changeNetwork', false)
    }
  })

export default instance
