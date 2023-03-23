import Vue from 'vue';
import VueRouter from 'vue-router';

// 使用 插件
Vue.use(VueRouter);

// 引入组件
import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Login from '@/pages/Login';
import Register from '@/pages/Register';

// 配置路由
export default new VueRouter({
    // 配置路由
    routes:[
        {
            path:"/home",
            component:Home,
            meta:{show:true},
            name:'home',
        },
        {
            path:"/search",
            component:Search,
            meta:{show:true},
            name:'search',
        },
        {
            path:"/login",
            component:Login,
            meta:{show:false},
            name:'login',
        },
        {
            path:"/register",
            component:Register,
            meta:{show:false},
            name:'register',
        },
        // 重定向：当项目跑起来的时候，访问/,立即让它重定向到首页
        {
            path:"*",
            redirect:"/home",
        }
    ]
})