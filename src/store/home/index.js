// state:仓库存储数据的地方
// mutations:修改state的唯一手段
// actions:处理action，可以书写自己的业务逻辑，让组件获取仓库的数据更加方便
// getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
import {reqCategoryList} from '@/api';

const state = {
    categoryList:[],
};
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList;
    }
};
const actions = {
    async categoryList({commit}){
        let result =await reqCategoryList();
        if(result.code == 200){
            commit("CATEGORYLIST",result.data);
        }
    }
};
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters,
}