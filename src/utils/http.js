import Vue from 'vue';
import axios from 'axios'
import router from '@/router'
import store2 from 'store2';


let axiosInstance = axios.create({
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
});

// 拦截请求
axiosInstance.interceptors.request.use(
  config => {
    if (store2('token')) {
      config.headers.Authorization = 'Bearer ' + store2('token');
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
)

// 拦截响应
axiosInstance.interceptors.response.use(
  response => {
    if (response.data.code !== 0) {
      Vue.prototype.$message({
        message: response.data.message,
        type: 'warning'
      });
    }
    return Promise.resolve(response.data)
  },

  error => {
    const status = error.response.status;

    // 登录过期
    if (status === 401) {
      store.commit({
        type: 'setUser',
        token: null,
        user: null
      })

      Vue.prototype.$message({
        message: '请登录',
        type: 'warning'
      });

      router.replace({ name: 'Login' })
    }

    return Promise.reject(error);
  }
);

export default axiosInstance