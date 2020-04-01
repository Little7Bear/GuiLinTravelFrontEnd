import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    userID: '',
  },
  mutations: {
    setToken(state, value) {
      state.token = value
    },

    setUserID(state, value) {
      state.userID = value
    },

  },
  actions: {
  },
  modules: {
  }
})
