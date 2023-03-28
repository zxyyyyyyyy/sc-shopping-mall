1.Search模块开发？
-先静态页面 + 静态组件拆分出来
-发送请求（API）
-vuex(三连环)
-组件获取仓库数据，动态展示数据

合并参数：把query，params参数与searchParams内 相同属性的属性值赋值给 searchParams
Object.assign(this.searchParams,this.$route.query,this.$route.params);

2.1 动态开发面包屑的分类名
编程式导航路由跳转[自己跳自己]

2.2 动态开发面包屑中的关键字
当面包屑中的关键字清除以后，需要让兄弟组件Header组件中的关键字清除

组件通信：
props:父子
自定义事件：子父
vuex：仓库数据，万能
插槽：父子
pubsub-js：万能，vue中基本不用
$bus:全局事件总线，万能

3.排序操作
  1：综合  2：价格  asc：升序  desc:降序

3.1 order属性的属性值有几种写法：4种
  1：asc  1：desc  2：asc  2：desc

3.2 谁有类名：
通过order属性值当中是包含1（综合） | 包含2（价格）

3.3 谁应该有箭头：
谁有类名，谁就有箭头

3.4 箭头制作：阿里图标库

4.电商平台(1万+)需要用分页？
ElementUI有相应的分类组件，使用起来超简单，但是前台项目目前不用[掌握最近本的分页器功能]

4.1 分页器展示，需要哪些数据（条件）？
-需要知道当前是第几页：pageNo字段代表当前页数
-需要知道每一页需要展示多少条数据：pageSize字段代表
-需要知道这个分页器一共有多少条数据：total字段代表---[获取另一条信息：一共多少页]
-需要知道连续的页面的个数： 5 | 7 [奇数]---对称好看

总结：对于分页器而言，自定义需要知道四个前提条件:
pageNo ： 当前第几页
pageSize : 每一页展示多少条数据
total : 整个分页器一共展示多少条数据
continues : 分页连续页码个数

4.3 自定义分页器，在开发的时候先自己传递的数据进行调试，调试成功以后再用服务器数据

4.4 对于分页器而言，很重要的一个地方即为[算出：连续页面起始数字和结束数字]******

4.5 分页器动态展示？ 分为：上中下三部分 [先中间部分]

5.开发摸一个产品的详情页面？

1-静态组件（详情页组件：还没有注册为路由组件）
滚动行为   vue-Router下的滚动行为，详见文档

2-api --->请求接口

3-vuex --->获取产品详情信息
   vuex中还需要新增一个模块detail;
   需要回到大仓库中合并;
   在模块中引入api接口;

4-动态展示组件

-----额外问题：
购物车添加成功，只是返回状态码，不会返回数据，组件派发后怎么获取成功还是失败的状态进行相应操作？
利用 使用async的返回值是一个Promise,判断状态码，成功返回一个ok标识，失败返回Promise.reject(new Error('faile'));组件等待拿状态也需要用 async/await 拿结果，同时是在try/catch (成功await请求跳转到相应路由，失败弹出错误信息)中进行，再进行相应操作。


6.浏览器存储功能：HTML5中新增的，本地存储和会话存储
本地存储：持久化的 --- 5M
会话存储：不持久化
// 跳转路由的时候还需要把产品的信息带给下一级路由组件
// 一些简单数据skuNum,通过query参数传过去
// 一些复杂数据[skuInfo],通过会话存储(不持久化，会话结束数据就消失)
// 本地存储 | 会话存储 ：一般存储的是字符串,不允许存对象，要转化成字符串 JSON.stringify(),再用取的时候转化会对象JSON.parse()

7.发请求的时候，获取不到你购物车里面数据，因为服务器不知道你是谁？
---UUID临时游客身份  node包里面有，就不用再安装了
每次调用都会生成新的值，所以得在本地存储localStorage里存储，持久存储
src/utils文件夹：放一些常用的功能模块(例如：正则，临时身份...)
在ajax.js 引入store 再在请求拦截器里进行进行拦截，每次发送请求就都带有临时id

    if(store.state.detail.uuid_token){
        // 把store仓库里的uuid_token通过请求头里的字段(userTempId:临时游客id):和后端商量好的
        config.headers.userTempId = store.state.detail.uuid_token;
    }

8.购物车全选按钮，计算属性里判断，用every遍历返回true,flase.

9.数量框分三种情况 switch 判断

10.数量框 - 框，用户操作(点击)过快，会出现负数情况，慢慢点则不会，使用 节流函数 解决
引入
import throttle from "lodash/throttle";

// 处理商品数量回调函数 : 注意async位置！！！！！
    handler: throttle(async function (type, disNum, cart) {
      // type:区分三个元素
      // disNum:变化量1，变化量-1，input最终的个数(不是变化的量)
      // cart:哪一个产品(里面有id)
      // 向服务器发请求，修改数量
      switch (type) {
        case "add":
          // 带给服务器变化的量
          disNum = 1;
          break;
        case "minus":
          // 判断产品的个数大于1，才给服务器传-1
          // if (cart.skuNum > 1) {
          //   disNum = -1;
          // }else{
          //   // 产品个数小于等于1
          //   disNum =0;
          // }
          disNum = cart.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0;
          } else {
            disNum = parseInt(disNum) - cart.skuNum;
          }
          // disNum = isNaN(disNum)||disNum<1?0:parseInt(disNum) - cart.skuNum;
          break;
      }
      // 派发action
      try {
        // 代表修改成功
        await this.$store.dispatch("addOrUpdateShopCart", {
          skuId: cart.skuId,
          skuNum: disNum,
        });
        // 再一次获取购物车列表数据进行展示
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    }, 800),

