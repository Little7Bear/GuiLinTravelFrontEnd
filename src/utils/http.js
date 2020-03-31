import Vue from 'vue';
import axios from 'axios'
import router from '@/router'

let token = localStorage.getItem('token') || sessionStorage.getItem('token') // 获取token

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
    // 错误状态处理
    if (status === 401) {
      localStorage.removeItem('token')
      router.replace({ name: 'Login' })
    } else if (status >= 404 && status < 422) {
      router.replace('/404')
    }
    return Promise.reject(error);
  }
);

export default axiosInstance