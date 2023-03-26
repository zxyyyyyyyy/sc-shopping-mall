// state:仓库存储数据的地方
// mutations:修改state的唯一手段
// actions:处理action，可以书写自己的业务逻辑，让组件获取仓库的数据更加方便
// getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
import {reqCategoryList,reqBannerList,reqFloorList} from '@/api';

const state = {
    categoryList:[],
    bannerList:[],
    floorList:[],
};
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList;
    },
    BANNERLIST(state,bannerList){
        state.bannerList = bannerList;
    },
    FLOORLIST(state,floorList){
        state.floorList = floorList;
    }
};
const actions = {
    // 获取三级联动数据
    async categoryList({commit}){
        let result =await reqCategoryList();
        if(result.code == 200){
            commit("CATEGORYLIST",result.data);
        }
    },
    // 获取轮播图banner数据
    async getBannerList({commit}){
        let result = await reqBannerList();
        if(result.code == 200){
            commit('BANNERLIST',result.data);
        }
    },

    // 获取floor数据
    async getFloorList({commit}){
        let result = await reqFloorList();
        if(result.code == 200){
            commit('FLOORLIST',result.data);
        }
    },

};
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters,
}