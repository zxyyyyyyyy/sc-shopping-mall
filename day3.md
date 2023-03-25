1.完成分类动态添加背景颜色
第一种解决方案：采用样式完成（可以的） :hover
第二种解决方案：通过JS控制

2.通过Js控制二三级商品分类的显示与隐藏
最开始的时候，通过CSS样式，display：none|block;控制显示与隐藏

3.演示卡顿显现
正常情况（用户慢慢操作）：鼠标进入，每一个一级分类h3，都会触发鼠标进入事件。
非正常情况（用户操作很快）：本身全部的一级分类都应该触发鼠标进入事件，但是经过测试，只有部分h3触发了。就是由于用户行为过快，导致浏览器反应不过来，如果当前回调函数中有大量业务，有可能出现卡顿现象。

4.函数的防抖与节流
 防抖：前面的所有触发都被取消，最后一次执行在规定的时间之后才会触发，也就是说如果连续快速触发，只会执行一次（最后一次）。

 节流：在规定的间隔时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量出发（第一次）。

 lodash插件：里面封装函数的防抖与节流业务 [闭包+延迟器]
 -lodash函数库对外暴露_函数

 5.完成三级联动节流操作
 // 这种引入方式：是把lodash全部的功能函数引入
// 最好的引入方法：按需引入
// import _ from 'lodash';
// 按需引用lodash的节流函数throttle,因为是默认暴露，所以可以不加{throttle}
   import throttle from 'lodash/throttle';
    // 鼠标移入：节流函数版
    // throttle:里边函数不要出现箭头函数，可能会出现上下文this指向问题
    changeIndex:throttle(function(index){
        this.currentIndex = index;
    },100),

6.三级联动组件的路由跳转与传参
三级联动用户是可以点击的：当你点击的时候，会从Home模块跳转到Search模块，一级会把用户选中的产品（产品的名字、产品的ID）有路由跳转的时候，进行传递。

路由跳转：
声明式导航：router-link
编程式导航：push|replace

三级联动：如果使用声明式导航router-link,可以实现路由的跳转与传递参数
但是出现卡顿现象。

router-link:可是一个组件，当服务器的数据返回之后，循环很多的router-link组件[创建组件实例的] 1000+

创建组件实例的时候，一瞬间创建1000+很耗内存，因此出现了卡顿现象

在每个 a 标签上绑点击事件，也不好，循环出来将会绑1000+的点击事件

最优方法：利用事件委托，把点击事件绑在上面父元素身上，那个时候还没有进入到循环  (事件委托+编程式导航)
存在一些问题：事件委托，是把全部的子节点h3,dt,dl,em,a的事件委托给父元素，怎么识别点击a标签的时候，才会进行路由跳转[怎么确定点击的一定是a标签]。
存在的另一个问题：即使确定点击的是a标签，又怎么确定是一级、二级、三级分类的标签。
goSearch(event) {
      // 解决问题一：把子节点中a标签，加上自定义属性data-categoryname，这样的节点一定是a标签
      // 节点有一个dataset属性，可以获取节点的自定义属性与属性值
      // 获取到当前触发这个事件的节点，需要带有data-categoryname的一定是a标签
      let element = event.target;
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      if (categoryname) {
        // 整理路由跳转的参数
        let location = { name: "search" };
        let query = { categoryname: categoryname };
        if (category1id) {
          query.category1id = category1id;
        } else if (category2id) {
          query.category2id = category2id;
        } else {
          query.category3id = category3id;
        }
        // 整理完参数
        location.query = query;
        // 路由跳转
        this.$router.push(location);
      }
    },
----------------------------------------------------------

1.开发Search模块中的TypeNavi商品分类菜单（过渡动画）
过渡动画：前提组件|元素务必要有v-if|v-show指令才可以进行过渡动画

2.现在三级联动列表的优化？
在三级联动列表里面请求数据，因为home和search都用到三级联动，会又发送那个请求，所以把请求放在根组件App.vue里面，只执行一次

3.合并params和query参数
两种情况：一种先搜索再三级，在三级联动里面判断加上params参数一起传
另一种，先三级再搜索，在头部判断加上query参数一起传
两种都加上

4.开发Home首页当中ListContainer组件与Floor组件
服务器目前返回的数据（接口）只有商品分类菜单分类数据，对于ListContainer组件与Floor组件数据，服务器没有提供

用mock.js模拟数据

使用步骤：
1-在项目当中的src文件夹创建一个mock文件夹
2-准备JSON数据(在mock文件夹中创建相应的JSON文件)----格式化一下，别留有空格（跑不起来）
3-把mock数据需要的图片放置到public文件夹中[public文件夹在打包的时候，会把相应的资源原封不动打包到dist文件夹中]
4-创建mockServe.js文件，通过mockjs插件来实现模拟数据
---首先引入mock
---再引入json文件(JSON数据格式根本，没有对外暴露，但是可以引入：因为webpack默认对外暴露：图片、JSON数据格式)
5-mockServe.js文件在入口文件中引入（至少需要执行一次，才能模拟数据）

5.ListContainer组件开发重点？
安装Swiper插件：最新6，安装5版本
npm i --save swiper@5 

使用swiper步骤：
1-引包（相应JS|CSS）
2-页面中结构务必要有
3-在页面中有结构前提下,new Swiper实例[轮播图添加动态效果]

最完美的解决方案，解决轮播图问题：
watch + nextTick：

$nextTick：在下次DOM更新 循环结束之后 执行延迟回调。在 修改数据之后 立即使用这个方法，获取更新后的DOM。

$nextTick：可以保证页面中的结构一定是有的，经常和很多插件一起使用[都需要DOM存在]

6.开发floor组件
getFloorList这个歌action在哪里触发：是需要在Home路由组件中发的，不能在Floor组件内部发action,因为我们需要v-for遍历floor组件

V-for:也可以在自定义标签中使用

6.1组件通信的方式有哪些？
props:用于父子组件通信
自定义事件：@on @emit 可以实现子给父通信
全局事件总线：$bus  全能（任何组件）
pubsub-js: vue当中几乎不用，react当中用  全能（任何组件）
插槽
vuex

7.把首页当中的轮播图拆分为一个共用的全局组件
好处：入口文件注册一次，可以在任意地方使用







