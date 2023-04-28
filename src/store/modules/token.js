import Cookies from 'js-cookie'
const TOKEN = 'app_token'

export default {
  state: {
    token: '' || Cookies.get(TOKEN)
  },
  mutations: {
    setToken (state) {
      let url = window.location.href
      if (url.indexOf('?') !== -1) {
        let augrment = url.split('?')[1].split('&')
        const INDEX = augrment.findIndex(item => {
          return item.indexOf('token') !== -1 || item.indexOf('Token') !== -1
        })
        state.token = (INDEX === -1 ? '' : augrment[INDEX].split('=')[1])
        console.log(state.token)
        if (state.token !== '') {
          Cookies.set(TOKEN, state.token)
        }
      }
    }
  },
  actions: {
    getToken ({ commit }) {
      commit('setToken')
    }
  }
}
