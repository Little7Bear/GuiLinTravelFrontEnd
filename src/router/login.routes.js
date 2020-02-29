export default {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login'),  // 懒加载式引入，当跳转到时才进行引入chunk
    // children: [...]
}
