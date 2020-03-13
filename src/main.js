import 'babel-polyfill'
import Vue from 'vue'
import 'normalize.css/normalize.css' // 格式化css
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import './components'
import router from './router'
import store from './store'
import './styles/iconfont/iconfont.css'
import './styles/index.scss'
import lodash from 'lodash'
import dayjs from 'dayjs'

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.prototype.$dayjs = dayjs
Vue.prototype.$_ = lodash

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
