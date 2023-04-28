/**
  * article模块接口列表
  */

import axios from '@/requset/http' // 导入http中创建的axios实例
const TRACE = window.base.trace
const trace = {
  // 测试接口
  importFood () {
    return axios.get(`${TRACE}/home/metrics/import-food`)
  },
  // 查询码值是否存在
  checkTraceCodeInfo (params) {
    return axios.get(`${TRACE}/codeInfo/check?tpid=${params.tpid}`)
  },
  // 根据码值查询信息
  getTraceCodeInfo (params) {
    return axios.post(`${TRACE}/scanCode/selectCodeInfo`, params)
  },
  // 上传图片
  uploadFile (params) {
    return axios({
      url: `${TRACE}/file/upload`,
      method: 'post',
      data: jsToFormData(params),
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  // 提交反馈
  submitFeedBack (params) {
    return axios.post(`${TRACE}/scanCode/saveFeedBack`, params)
  }
}
// 对象转FormData格式
function jsToFormData (obj) {
  let formData = new FormData()
  for (let key in obj) {
    if (obj[key] !== null && obj[key] !== undefined) formData.append(key, obj[key])
  }
  return formData
}

export default trace
