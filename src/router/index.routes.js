import Home from '@/views/Home'
import PopularTravel from '@/views/popular-travel/PopularTravel'

export default {
  path: '/',
  redirect: '/index',
  name: 'Home',
  component: Home,
  children: [
    {
      path: '/index',
      name: 'PopularTravel',
      component: PopularTravel
    },
    {
      path: '/index/article',
      name: 'Article',
      component: () => import('@/views/popular-travel/SingleArticle')
    },
    {
      path: '/scenic',
      name: 'Scenic',
      component: () => import('@/views/scenic/Scenic')
    },
    {
      path: '/my-home',
      name: 'MyHome',
      component: () => import('@/views/my-home/MyHome')
    },
    {
      path: '/create-travel',
      name: 'CreateTravel',
      component: () => import('@/views/my-home/CreateTravel')
    },
  ]
}
