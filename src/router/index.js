import Vue from 'vue';
import VueRouter from 'vue-router';

// 使用 插件
Vue.use(VueRouter);

import routes from "./routes";

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
    // routes:routes,  KV一致省略V
    routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        // y:0代表滚动条在Y轴最上方
        return { y: 0 };
      },
})