import Vue from 'vue'
import App from './App.vue'

// 引入路由
import router from '@/router';
// 引入仓库
import store from '@/store';

// 三级联动组件---全局组件
import TypeNav from "@/components/TypeNav";
import Carousel from "@/components/Carousel"
// 第一个参数：全局组件名字  第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav);
Vue.component(Carousel.name,Carousel);

//引入mockServe.js----mock数据
import '@/mock/mockServe';
// 引入swiper样式
import 'swiper/css/swiper.css'

// Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 注册路由,写法是KV一致省略V
  // 注册路由信息：当这里书写router的时候，组件身上都拥有$route,$router属性
  router,
  // 注册仓库:组件实例升上会多一个属性 $store属性
  store
  
}).$mount('#app')
