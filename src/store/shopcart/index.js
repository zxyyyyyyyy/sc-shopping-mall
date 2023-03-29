import {reqCartList,reqDeleteCartById,reqUpdateChecked} from '@/api';

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
    },
    // 修改商品选中状态
    async updateChecked({commit},{skuId,isChecked}){
        let result = await reqUpdateChecked(skuId,isChecked);
        if(result.code == 200){
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }
    },
    // 删除全部多选的产品
    deleteAllCheckedCart({dispatch,getters}){
        // context:小仓库，commit[提交mutations修改state] getters[计算属性] diapatch[派发actions] state[当前仓库的数据]
        // getters.cartList.cartInfoList:购物车当中全部商品，是一个数组
        let PromiseAll = [];
        getters.cartList.cartInfoList.forEach(item => {
          let promise = item.isChecked==1?dispatch("deleteCart",item.skuId):'';
          PromiseAll.push(promise);
        });
        // 只要全部的p1|p2...都成功，返回结果即为成功
        // 如果有一个失败，返回即为失败
        return Promise.all(PromiseAll);
    },
    // 修改全部商品的选中状态
    updateAllCartIsChecked({dispatch,getters},isChecked){
        let PromiseAll = [];
        getters.cartList.cartInfoList.forEach(item=>{
          let promise =dispatch("updateChecked",{skuId:item.skuId,isChecked});
          PromiseAll.push(promise);
        })
        return Promise.all(PromiseAll);
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