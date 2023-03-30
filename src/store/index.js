import Vue from 'vue';
import Vuex from 'vuex';
// 需要使用插件一次
Vue.use(Vuex);
Vue.config.devtools = true;

import home from './home';
import search from './search';
import detail from './detail';
import shopcart from './shopcart';
import users from './users';
import trade from './trade';

// 对外暴露store类的一个实例
export default new Vuex.Store({
    // 实现vuex仓库模块式开发存储数据
    modules:{
        home,
        search,
        detail,
        shopcart,
        users,
        trade,
        
    }

});