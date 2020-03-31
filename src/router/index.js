import Vue from 'vue'
import VueRouter from 'vue-router'

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
  let token = sessionStorage.getItem('token') || localStorage.getItem('token')
  if (token === null && to.name !== "Login") {
    // 刷新页面时，如果没有token，就返回登录页面
    next({
      name: 'Login',
      params: {
        toName: to.name
      },
      replace: true
    })
  } else {
    next();
  }
})

export default router
