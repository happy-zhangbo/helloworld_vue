const IndexComponent = import('@/components/HelloWorld.vue')

const routes = [
    {
        path: '/',
        name: 'index',
        title: '首页',
        component: () => IndexComponent, //.vue不能省略
    },
    {
        path: '/signWith/steam',
        name: 'steamLogin',
        title: 'Steam Login',
        component: () => import('@/components/index.vue'), //.vue不能省略
    },
    {
        path: '/steam',
        name: 'steam',
        title: 'SteamIn',
        component: () => import('@/components/steam.vue'), //.vue不能省略
    }
]
export default routes
