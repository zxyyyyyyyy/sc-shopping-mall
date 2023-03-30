import Vue from 'vue'
import App from './App.vue'

// 引入路由
import router from '@/router';
// 引入仓库
import store from '@/store';

// 三级联动组件---全局组件
import TypeNav from "@/components/TypeNav";
import Carousel from "@/components/Carousel";
import Pagination from "@/components/Pagination";
// 第一个参数：全局组件名字  第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav);
Vue.component(Carousel.name,Carousel);
Vue.component(Pagination.name,Pagination);

// 统一接口api文件夹里面全部请求函数
import * as API from "@/api";

//引入mockServe.js----mock数据
import '@/mock/mockServe';
// 引入swiper样式
import 'swiper/css/swiper.css'

// 全局按需引入elementUI
import {MessageBox} from 'element-ui';
// Vue.component(Button.name,Button);
// elementUI注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 全局事件总线$bus配置
  beforeCreate(){
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  // 注册路由,写法是KV一致省略V
  // 注册路由信息：当这里书写router的时候，组件身上都拥有$route,$router属性
  router,
  // 注册仓库:组件实例升上会多一个属性 $store属性
  store
  
}).$mount('#app')
