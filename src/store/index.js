import Vue from 'vue'
import Vuex from 'vuex'
import storage from 'store2';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 默认读取storage里面的数据
    token: storage.get('token') || '',
    user: storage.get('user') || null,
  },

  mutations: {
    setUser(state, payload) {
      state.token = payload.token
      state.user = payload.user

      // 添加到localStorage
      for (const key in payload) {
        if (payload.hasOwnProperty(key)) {
          const item = payload[key]

          if (item) {
            // key值不为空添加
            storage.set(key, item);
          } else {
            // key值为空删除
            storage.remove(key)
          }
        }
      }
    },

  },
})
