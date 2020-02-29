export default {
    path: '/',
    redirect: '/index',
    name: 'Home',
    component: () => import('@/views/Home'),
    children: [{
        path: '/index',
        name: 'PopularTravel',
        component: () => import('@/views/popular-travel/PopularTravel'),
    }, {
        path: '/scenic',
        name: 'Scenic',
        component: () => import('@/views/scenic/Scenic'),
    }, {
        path: '/my-home',
        name: 'MyHome',
        component: () => import('@/views/my-home/MyHome'),
    }]
}
