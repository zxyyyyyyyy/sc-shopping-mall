1.Search模块开发？
-先静态页面 + 静态组件拆分出来
-发送请求（API）
-vuex(三连环)
-组件获取仓库数据，动态展示数据

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
滚动行为

2-api --->请求接口

3-vuex --->获取产品详情信息
   vuex中还需要新增一个模块detail;
   需要回到大仓库中合并;
   在模块中引入api接口;

4-动态展示组件

6.浏览器存储功能：HTML5中新增的，本地存储和会话存储
本地存储：持久化的 --- 5M
会话存储：不持久化

7.发请求的时候，获取不到你购物车里面数据，因为服务器不知道你是谁？
---UUID临时游客身份
