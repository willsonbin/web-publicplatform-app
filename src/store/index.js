import Vue from 'vue'
import Vuex from 'vuex'
import Token from './modules/token.js'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Token
  },
  getters
})
