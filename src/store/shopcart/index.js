import {reqCartList,reqDeleteCartById} from '@/api';

const state ={
    cartList:[],
};
const mutations = {
    GETCARTLIST(state,cartList){
        state.cartList = cartList;
    }
};
const actions = {
    // 获取购物车列表
    async getCartList({commit}){
        let result = await reqCartList();
        if(result.code == 200){
            commit("GETCARTLIST",result.data);
        }

    },
    // 删除购物车产品
    async deleteCart({commit},skuId){
        let result = await reqDeleteCartById(skuId);
        if(result.code == 200){
            return "ok"
        }else{
            return Promise.reject(new Error("faile"));
        }
    }
};
const getters = {
    cartList(state){
        return state.cartList[0] || {};
    },
    
};

export default{
    state,
    mutations,
    actions,
    getters,
}