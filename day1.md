1:vue-cli脚手架初始化项目。
node + webpack + 淘宝镜像（下一些依赖快一些）

node_modules文件夹：项目依赖文件夹

public文件夹：一般放置一些静态资源（图片），需要注意，放在public文件夹中的静态资源，webpack进行打包的时候，会原封不动打包到dist文件夹中。

src文件夹（程序员源代码文件夹）：
    assets文件夹：一般也是放置静态资源（一般放置多个组件共用的资源），需要注意，放置在assets文件夹里面的静态资源，在webpack打包的时候，webpack会把静态资源当做一个模块，打包JS文件里面。

    components文件夹：一般放置的是非路由组件（全局组件）

    App.vue:唯一的根组件，vue当中的组件(.vue)

    main.js:程序入口文件，也使整个程序当中最先执行的文件

    babel.config.js:配置文件（babel相关）

    package.json文件：认为项目的‘身份证’，记录项目叫做什么，项目当中有哪些依赖，项目怎么运行。

    package-lock.json文件：缓存性文件（记录依赖从哪里下的）

    README.md:说明性文件

    2:项目的其他配置

    2.1项目运行起来的时候，让浏览器自动打开(加 --open )
    ---package.json
      "scripts": {
        "serve": "vue-cli-service serve --open",
        "build": "vue-cli-service build",
        "lint": "vue-cli-service lint"
    },

    2.2 eslint校验功能关闭。
    ---在根目录下创建一个 vue.config.js文件
    lintOnSave:false,
    比如：声明变量但是没有使用eslint校验工具报错
    
    2.3 src文件夹简写方式，配置别名。 @
    在根目录下创建jsconfig.json文件配置别名@提示
    {
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
  }
  <!-- @符号不能在以下地方使用 -->
    "exclude":[
      "node_modules",
      "dist"
    ]
}

3：项目路由分析
vue-router
前端所谓路由：kv键值对。
key:URL(地址栏中的路径)
value:相应的路由组件
注意：项目是上中下结构

路由组件：
Home首页路由组件  Search路由组件  Login登录路由  Register注册路由
非路由组件：
Header  
Footer (在首页，搜索页)，但是在登录，注册页面没有

4.完成非路由组件Header和Footer业务
 在开发项目的时候：
 1：书写静态页面(HTML+CSS)
 2：拆分组件
 3：获取服务器的数据动态展示
 4：完成相应的动态业务逻辑

 注意1：创建组件的时候，组件结构+组件的样式+图片资源
 注意2：项目采用的less样式，浏览器不识别less样式，需要通过less,less-loader(安装5版本的 @5 ，高版本会报错)进行处理less，把less样式变为css样式，浏览器才可以识别。 npm安装
 注意3：如果想让组件识别less样式，需要在style标签身上加上lang=less

 4.1: 使用组建的步骤（非路由组件）
 -创建或定义
 -引入
 -注册
 -使用


 5.路由组件的搭建
 vue-router   (npm安装)   目前用的vue2，直接下载vue-router版本不匹配，因为版本4以后适用于Vue3，所以安装时@3，用3版本
 路由组件四个：Home，Search，Login,Register
 -components文件夹：经常放置的非路由组件(共用全局组件)
 -pages|views文件夹:经常放置路由组件

 5.1配置路由
 项目中配置的路由一般放置在router文件夹中

 5.2:总结
 路由组件和非路由组件的区别？
 1：路由组件一般放置在pages|views文件夹，非路由组件一般放置components文件夹中
 2：路由组件一般需要在router文件夹中进行注册(使用的即为组件的名字)，非路由组件在使用的时候，一般都是以标签的形式使用
 3：注册完路由，不管路由组件还是非路由组件身上都有$route和$router属性(这点与react不同)

 $route：一般获取路由信息【路径,query,params等等】
 $router:一般进行编程式导航进行路由跳转【push | rerplace】

 5.3路由的跳转？
 路由的跳转有两种形式：
 -声明式导航router-link，可以进行路由的跳转
 -编程式导航push | replace,可以进行路由跳转(区别能不能进历史记录)

 编程式导航：声明式导航能做的，编程式导航都能做，
 但是编程式导航除了可以进行路由跳转，还可以做一些其他的业务逻辑。

 6.Footer组件显示与隐藏
 v-if | v-show  (v-if频繁操作DOM)

 6.1 可以根据组件身上的$route获取当前路由的信息，通过路由的路径去判断Footer的显示和隐藏
 <Footer v-show="$route.path=='/home' || $route.path=='/search'"></Footer>
 上面方法可以实现，但是如果页面很多，条件很多，就很恶心，一直写下去

 6.2配置路由的时候，可以给路由添加路由元信息(meta),路由需要配置对象，它的key不能瞎写，胡写，乱写

7.路由传参

7.1路由跳转的几种方式？
比如A->B
声明式导航：router-link(务必要有to属性)，可是路由跳转
编程式导航：利用的是组件实例的$router.push|replace方法，可实现路由跳转。(可以书写一些自己的业务)

7.2:路由传参，参数有几种写法？
-params参数：属于路径当中的一部分，需要注意，在配置路由的时候，需要占位
-query参数：不属于路径当中的一部分，类似于ajax中的queryString  
  (/home?k=v&k=v),不需要占位

  第一种：字符串形式  传一个params参数(配置路由时'search/:keyword'占位),再传一个query参数
  this.$router.push("/search/" + this.keyword +"?k="+this.keyword.toUpperCase());
  第二种：模板字符串  
  this.$router.push(`/search/${this.keyword}?k=${this.keywork.toUpperCase()}`);
  以上两种不常用
  第三种：对象  如果需要传params参数并且是对象形式传参，前面不能用path写法,得用name="search"(这个是在配置路由的时候，给该路由起的名字)
  this.$router.push({name="search",params:{keyword:this.keyword},query:{k:this.keywork.toUpperCase()}})

8.路由传参相关面试题
1-路由传递参数(对象写法)path是否可以结合params参数一起使用？
    答：路由跳转传参的时候，对象的写法可以是name,path形式，但是需要注意的是，path这种写法是不可以与params参数一起使用。

2-如何指定params参数可传可不传？
    比如：配置路由的时候，占位了(params参数)，但是路由跳转的时候就不传递。------路径会出现问题
    答：如果路由要求传递params参数，但是你就不会传递params参数，发现一件事情，URL会有问题
    解决方法：在配置路由的时候，在占位的后面加上一个问号?(params参数可以传递或不传递)

3-params参数可以传递也可以不传递，但是如果传递是空串，如何解决？
    传的空串----路径会有问题     params:{keyword:''||undefined}
    答：使用undefined解决(params参数可以传递、不传递（空的字符串）)

4-路由组件能不能传递props数据？
    答：可以的，三种写法
    -布尔值写法:只能传递params
      props:true,
    -对象写法:额外的给路由组件传递一些props
      props:{a:1,b:2}
    -函数写法：可以params参数、query参数，通过props传递给路由组件
      props:(route)=>{
        return{
          keyword:$route.params.keyword,k:$route.query.k
        }
      },
      简化（加括号）
      props:(route)=>({keyword:$route.params.keyword,k:$route.query.k})


