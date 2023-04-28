import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vant, { Dialog } from 'vant'
import 'vant/lib/index.css'
import '@/styles/index.scss'
import api from '@/requset/api' // 将api挂载到vue的原型上

Vue.prototype.$trace = api.trace

Vue.use(Vant)
store.commit('setToken')
Dialog.setDefaultOptions({
  confirmButtonText: '确认',
  confirmButtonColor: '#576B95'
})
Vue.config.productionTip = false
Vue.config.ignoredElements = [
  'wx-open-launch-weapp'
]

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
