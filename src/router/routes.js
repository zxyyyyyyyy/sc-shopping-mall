// 引入组件
import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Detail from '@/pages/Detail';
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart';
import Trade from '@/pages/Trade';
import Pay from '@/pages/Pay';

// 配置路由信息
export default [
    {
        path: "/pay",
        component: Pay,
        meta: { show: false },
        name: 'pay',
    },
    {
        path: "/trade",
        component: Trade,
        meta: { show: false },
        name: 'trade',
    },
    {
        path: "/shopcart",
        component: ShopCart,
        meta: { show: false },
        name: 'shopcart',
    },
    {
        path: "/addcartsuccess",
        component: AddCartSuccess,
        meta: { show: false },
        name: 'addcartsuccess',
    },
    {
        path: "/detail/:skuid",
        component: Detail,
        meta: { show: false },
        name: 'detail',
    },
    {
        path: "/home",
        component: Home,
        meta: { show: true },
        name: 'home',
    },
    {
        name: 'search',
        path: "/search/:keyword?",
        component: Search,
        meta: { show: true },
        
    },
    {
        path: "/login",
        component: Login,
        meta: { show: false },
        name: 'login',
    },
    {
        path: "/register",
        component: Register,
        meta: { show: false },
        name: 'register',
    },
    // 重定向：当项目跑起来的时候，访问/,立即让它重定向到首页
    {
        path: "*",
        redirect: "/home",
    }
]