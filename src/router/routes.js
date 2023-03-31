// 引入组件
// import Home from '@/pages/Home';
// import Search from '@/pages/Search';
// import Login from '@/pages/Login';
// import Register from '@/pages/Register';
// import Detail from '@/pages/Detail';
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart';
// import Trade from '@/pages/Trade';
// import Pay from '@/pages/Pay';
// import PaySuccess from '@/pages/PaySuccess';
// import Center from '@/pages/Center';
// 引入二级路由
// import MyOrder from '@/pages/Center/myOrder';
// import GroupOrder from '@/pages/Center/groupOrder';

/**路由懒加载：
 * 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
 * 如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。
 * 当访问的时候再进行加载相应组件
 */
// const foo = () => {
//     console.log(11111111);
//     return import('@/pages/Home');
// }

// const foo = ()=>import('@/pages/Home');


// 配置路由信息
export default [
    {
        path: "/center",
        component:()=>import('@/pages/Center'),
        meta: { show: false },
        name: 'center',
        // 二级路由组件
        children: [
            {
                path: "myorder",
                component: ()=>import('@/pages/Center/myOrder'),
            },
            {
                path: "grouporder",
                component:()=>import('@/pages/Center/groupOrder'),
            },
            {
                path: '/center',
                redirect: '/center/myorder',
            }
        ]
    },
    {
        path: "/paysuccess",
        component: ()=>import('@/pages/PaySuccess'),
        meta: { show: false },
        name: 'paysuccess',
        // 路由独享守卫
        // beforeEnter:(to,from,next)=>{
        //     // 去交易详情页面，必须从购物车而来
        //     if(from.path == '/pay'){
        //         next();
        //     }else{
        //         // 去其他路由，停在当前路由
        //         // false: 取消当前的导航。如果浏览器的 URL 改变了(可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。
        //         next(false);
        //     }
        // }
    },
    {
        path: "/pay",
        component: ()=>import('@/pages/Pay'),
        meta: { show: false },
        name: 'pay',
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 去交易详情页面，必须从购物车而来
            if (from.path == '/trade') {
                next();
            } else {
                // 去其他路由，停在当前路由
                // false: 取消当前的导航。如果浏览器的 URL 改变了(可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。
                next(false);
            }
        }
    },
    {
        path: "/trade",
        component: ()=>import('@/pages/Trade'),
        meta: { show: false },
        name: 'trade',
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 去交易详情页面，必须从购物车而来
            if (from.path == '/shopcart') {
                next();
            } else {
                // 去其他路由，停在当前路由
                // false: 取消当前的导航。如果浏览器的 URL 改变了(可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。
                next(false);
            }
        }
    },
    {
        path: "/shopcart",
        component: ()=>import('@/pages/ShopCart'),
        meta: { show: false },
        name: 'shopcart',
    },
    {
        path: "/addcartsuccess",
        component: ()=>import('@/pages/AddCartSuccess'),
        meta: { show: false },
        name: 'addcartsuccess',
    },
    {
        path: "/detail/:skuid",
        component: ()=>import('@/pages/Detail'),
        meta: { show: false },
        name: 'detail',
    },
    {
        path: "/home",
        // 路由懒加载
        // component: foo,
        component:()=>import('@/pages/Home'),
        meta: { show: true },
        name: 'home',
    },
    {
        name: 'search',
        path: "/search/:keyword?",
        component: ()=>import('@/pages/Search'),
        meta: { show: true },

    },
    {
        path: "/login",
        component: ()=>import('@/pages/Login'),
        meta: { show: false },
        name: 'login',
    },
    {
        path: "/register",
        component: ()=>import('@/pages/Register'),
        meta: { show: false },
        name: 'register',
    },
    // 重定向：当项目跑起来的时候，访问/,立即让它重定向到首页
    {
        path: "*",
        redirect: "/home",
    }
]