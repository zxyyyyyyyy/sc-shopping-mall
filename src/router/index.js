import Vue from 'vue';
import VueRouter from 'vue-router';

// 使用 插件
Vue.use(VueRouter);

import routes from "./routes";

//引入store 用于获取token 用于路由守卫判断
import store from '@/store';

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
let router = new VueRouter({
    // 配置路由
    // routes:routes,  KV一致省略V
    routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        // y:0代表滚动条在Y轴最上方
        return { y: 0 };
    },
})

// 全局守卫：前置守卫（在路由跳转之前进行判断）
router.beforeEach(async (to, from, next) => {
    let name = store.state.users.userInfo.name;
    let token = store.state.users.token;
    if (token) {
        // 有token就是用户登录了，不能去login 页面,停留在首页
        if (to.path == '/login') {
            next('/home');
        } else {
            // 登录了，去的不是login可能是[home,search,detail,shopcart],判断有没有用户信息,只获取userInfo的话，即使是空对象，返回也为真，无法判断用没有用户信息，所以得用userInfo里面的属性值,有则放行，没有则发请求获取userInfo信息,再放行
            if (name) {
                next();
            } else {
                try {
                    // 获取用户信息在首页展示
                    await store.dispatch('userInfo');
                    next();
                } catch (error) {
                    // token失效了，过期了，获取不到用户的信息，重新登录
                    // 清除token
                    await store.dispatch("logOut");
                    //去重新登录
                    next('/login');
                }
            }
        }
    } else {
        // 未登录，不能去交易相关，不能去支付相关[pay|paysuccess],不能去个人中心
        // 未登录去上面的这些路由---去登录页,去的其他路由，放行
        let toPath = to.path;
        if(toPath.indexOf('/trade')!=-1||toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1){
            // 把未登录的时候想去而没有去成的信息，存储于地址栏中,登录后直接跳转
            next('/login?redirect='+toPath);
        }else{
            // 去的其他路由
            next();
        }
    }
})


export default router;