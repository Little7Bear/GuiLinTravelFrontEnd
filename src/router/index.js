import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routerList = []  // 路由数组 - 存放所有路由
function importAll(routerArr) {
  // 该函数用于将所有分区路由中的路由添加到路由数组
  routerArr.keys().forEach(key => {
    routerList.push(routerArr(key).default)
  })
}
importAll(require.context('.', true, /\.routes\.js/))

const routes = [
  ...routerList
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  localStorage.getItem('token')

  next()
})

export default router
