import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history', // 去掉url中的#
  routes: [
    /* 追溯码查询 */
    // {
    //   path: '/app/scan',
    //   name: 'scan',
    //   component: () => import('@/view/scan.vue')
    // },
    {
      path: '/app/scanInfo',
      name: 'scanInfo',
      component: () => import('@/view/scanInfo.vue')
    },
    {
      path: '/app/feedBack',
      name: 'feedBack',
      component: () => import('@/view/feedback')
    },
    {
      path: '/',
      redirect: '/app/scanInfo'
    },
    {
      path: '/app',
      redirect: '/app/scanInfo'
    }
  ]
})
