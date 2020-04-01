import Vue from 'vue';
import axios from 'axios'
import router from '@/router'

let token = localStorage.getItem('token')

let axiosInstance = axios.create({
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Authorization': 'Bearer ' + token
  }
});

// 发起请求后
axiosInstance.interceptors.response.use(
  response => {
    if (response.data.code !== 0) {
      Vue.prototype.$message({
        message: response.data.message,
        type: 'warning'
      });
    }
    return Promise.resolve(response)
  },

  error => {
    const status = error.response.status;
    
    // 登录过期
    if (status === 401) {
      localStorage.removeItem('token')
      this.$store.commit('setToken', '')
      router.replace({ name: 'Login' })
    }

    return Promise.reject(error);
  }
);

export default axiosInstance