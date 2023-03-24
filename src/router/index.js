import Vue from 'vue';
import VueRouter from 'vue-router';

// 使用 插件
Vue.use(VueRouter);

// 引入组件
import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Login from '@/pages/Login';
import Register from '@/pages/Register';

// 重写push | replace
// 先把VueRouter原型对象下的push方法保存一份，之后重写会调用
// 第一个参数：告诉原来的push方法，往哪里跳(传递哪些参数)
// 直接调用originPush()方法，指向window,所以需要改变this指向，指向调用该方法的对象
// apply | call 区别
// 相同点：都可以改变this指向，都可以调用函数一次
// 不同点：call、apply传递参数，call传参用逗号隔开，apply传参用数组形式
let originPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { });
    }
};

let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => { }, () => { });
    }
};

// 配置路由
export default new VueRouter({
    // 配置路由
    routes: [
        {
            path: "/home",
            component: Home,
            meta: { show: true },
            name: 'home',
        },
        {
            path: "/search",
            component: Search,
            meta: { show: true },
            name: 'search',
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
})