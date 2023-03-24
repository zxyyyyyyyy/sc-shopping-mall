1.编程式路由跳转到当前路由(参数不变)，多次执行会抛出NavigationDuplicated的警告错误？
--路由跳转有两种形式：声明式导航、编程式导航
--声明式导航没有这类问题，因为vue-router底层已经处理好了
1.1为什么编程式导航进行路由跳转的时候，就有这种警告错误？
   'vue-router': '^3.5.4':vue-router引入promise
1.2通过给push方法传递相应的成功、失败的回调函数，可以捕获当前错误，可以解决。
1.3通过底部的代码，可以实现解决错误
   this.$router.push({name:"search",params:{keyword:this.keyword},query:{k:this.keyword.toUpperCase()}},()=>{},()=>{});
这种写法：治标不治本，将来在别的组件当中push|replace，编程式导航还是有类似的错误。
解决方法：在引入VueRouter的路由index.js组件中，重写一下push | replace方法，底层原理还是调用原来的方法，但是包装一下，这样在其他组件中继续使用push | replace方法没有问题

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

1.4
this:当前组件实例(search)
this.$router属性：当前的这个属性，属性值VueRouter类的一个实例，当在入口文件注册路由的时候，给组件实例添加$router|$route属性
push：VueRouter类的一个实例

2.Home模块组件拆分
--先把静态页面完成
--拆分出静态组件
--后区服务器的数据进行展示
--动态业务(js)

3.三级联动组件完成
---由于三级联动，在Home、Search、Detail 都有用到，把三级联动注册为全局组件。
好处：只需要注册一次，就可以在项目任意地方使用

4.其余静态组件
HTML + CSS + 图片资源----[结构，样式，图片资源]

5.POSTMAN测试接口

6.axios二次封装
向服务器发请求方法：XMLHttpRequest、fetch、JQ、axios
6.1为什么需要进行二次封装axios？
请求拦截器、响应拦截器：请求拦截器，可以在发请求之前处理一些业务、响应拦截器，当服务器数据返回以后，可以处理一些事情
npm 安装axios

6.2在项目当中经常API文件夹[里面是关于axios请求]
接口当中：路径都带有/api
baseURL:"/api"

6.3如果记不住，可以参考git|npm关于axios文档

7.接口统一管理
项目很小：完全可以在组件的生命周期中发请求
项目大：axios.get('xxx')

7.1跨域问题
什么事跨域：协议、域名、端口号不同的请求，称之为跨域。
http://localhost:8082/#/home   ---前端项目的本地服务器
http://39.98.123.211:8510   ---需要获取的后台服务器

解决跨域：JSONP、CROS、代理(proxy)

8.nprogress（插件）进度条的使用
安装：npm i --save nprogress 
进度条在响应拦截器里使用
--引入进度条和进度条样式
--请求拦截器里 start：进度条开始
--响应拦截器里 done：进度条结束
--进度条颜色可以修改，去依赖包里面改样式颜色

9.vuex状态管理库

9.1 vuex是什么？  npm 安装
vuex是官方提供一个插件，状态管理库，集中式管理项目中组件共用的数据。

切记：并不是全部项目都需要vuex，如果项目很小，完全不需要vuex，如果项目很大，组件很多，数据很多，数据维护很费劲，vuex

state:仓库存储数据的地方
mutations：修改state唯一手段
actions
getters
modules

9.2 vuex基本使用
安装：npm i --save vuex

9.3 vuex实现模块式开发
如果项目过大，组件过多，接口也很多，数据也很多，可以让vuex实现模块式开发

10.完成TypeNavicat三级联动展示数据业务


