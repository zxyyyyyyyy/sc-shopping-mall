1.登录与注册静态组件-（处理共用图片资源问题）**
登录注册功能（git）：必须要会的技能

assets文件夹---放置全部组件共用静态资源

在样式当中也可以使用@符号[src别名]，切记在前面加上 ~

2.注册业务
2.1 注册业务|登录业务中表单验证先不处理[最后一天统一处理]

2.2 注册获取验证码接口，把验证码返回了，正常情况是把验证码发到用户手机上

3.登录业务
3.1注册----通过数据库存储数据信息（名字，密码）
3.2登录----登录成功的时候，后台为了区分你这个用户是谁--服务器下发token[令牌：唯一的标识]
登录接口：做的不完美，一般登录成功服务器会下发token，前台持久化存储token，[带着token找服务器要用户信息进行展示]

注意：vuex存储数据 --- 不是持久化

form表单有默认行为，点击登录按钮默认跳转--首页，阻止默认行为@click.prevent="userLogin"

带token 请求用户信息，需要在home组件的mounted中触发action
携带token是在ajax.js里面的请求拦截器里面，设置在头部把token带给服务器
请求的信息userInfo信息要在 header组件头部使用 用户名，通过v-if判断用户名是否存在，不存在显示用户登录|注册，存在显示用户名|退出登录

3.3登录过后首页用户信息展示
---当用户登录完成，点击登录按钮，用户登录[用户名+密码]向服务器请求（组件派发action:userLogin）
   请求成功返回数据token,存储在vuex仓库中，路由跳转到home首页
---在首页当中，在mounted中触发action:userInfo,获取用户信息,以及动态展示header组件内容。
---遇到问题：一刷新页面，显示的用户名 会变成 登录|注册，获取不到用户信息
---原因：vuex仓库存储数据不是持久化的，点击登录按钮，获取到token，但是请求只发一次，刷新home首页，即使触发userInfo,但是没有token拿不到用户信息
---解决方法：持久化存储token：在拿到token后进行本地永久存储。
---之后问题：home页面解决用户信息问题，但是跳转到search页面刷新，还是没有用户信息

存在的问题：
1.多个组件展示用户信息需要在每一个组件的mounted中触发this.$store.dispatch('getUserInfo'); [假如一百个，不行]
2.用户已经登录了，就不应该再回登录页
解决方法：路由守卫，下面用到了 路由全局前置守卫 ，不在home页发请求了，通过路由判断当前有没有用户信息，没有发请求，获取到了再放行当前路由页面

退出登录：
1.发请求通知服务器退出登录[服务器清楚一些数据：token]
2.前端清除项目中的数据[userInfo,token]


导航守卫：
导航：表示路由正在发生变化，进行路由跳转
守卫：当路由发生跳转的时候，守卫负责让不让跳转

全局守卫：项目中，只要发生路由变化就能监听到  分为：全局前置守卫（常用），全局后置守卫

路由独享守卫：
组件内守卫：

比如：用户已经登录，用户不应该还能会login页面？

router/index.js

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
        // 未登录，没处理完，后期处理
        next();
    }
})

4.获取交易页面用户信息？
用户的登录了才能获取到用户地址信息，不登录没办法获取到


注意！！！真实项目中，不要在生命周期函数中使用 async/await
解决方法：在methods里面定义一个函数发送请求获取数据，再在mounted里面调用这个方法

5.点击支付按钮，出现二维码支付，使用elementUI,按需引入完成，看文档，更改了配置项，项目需要重启

5.1生成二维码   qrcode

