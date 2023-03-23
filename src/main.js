import Vue from 'vue'
import App from './App.vue'

// 引入路由
import router from '@/router';

// Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 注册路由,写法是KV一致省略V
  router,

}).$mount('#app')
