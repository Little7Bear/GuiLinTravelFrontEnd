import Vue from "vue";
import axios from 'axios'
import router from '@/router'

let token = sessionStorage.getItem('token')  // 获取token

let axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Authorization': 'Bearer ' + token
  }
});

// 发起请求前
axiosInstance.interceptors.request.use(
  error => {
    Vue.prototype.$message({
      message: "加载超时",
      type: "warning"
    });
    return Promise.reject(error);
  }
);

// 发起请求后
axiosInstance.interceptors.response.use(
  error => {
    if (error) {
      // 获取状态码
      const status = error.response.status;

      // 错误状态处理
      if (status === 401) {
        sessionStorage.removeItem('token')
        router.replace('/login')
      } else if (status >= 404 && status < 422) {
        router.replace('/404')
      }

    }
    return Promise.reject(error);
  }
);

export default axiosInstance