import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    user: null,
  },

  getters: {
    getUser(state) {
      state.user = localStorage.getItem("user")
      return state.user
    }
  },

  mutations: {
    setToken(state, value) {
      state.token = value
    },

    setUser(state, value) {
      state.user = value
    },

  },

  actions: {
  },

  modules: {
  }
})
