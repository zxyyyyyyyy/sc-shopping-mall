import {reqGetGoodInfo,reqAddOrUpdateShopCart} from '@/api';

// 引入封装的临时游客身份的uuid模块:生成一个随机的字符串
import {getUUID} from '@/utils/uuid_token';

const state = {
    goodInfo:{},
    // 临时身份存储
    uuid_token:getUUID(),
};
const mutations = {
    GETGOODINFO(state,goodInfo){
        state.goodInfo=goodInfo;
    }
};
const actions = {
    // 获取商品详情
    async getGoodInfo({commit},skuId){
        let result = await reqGetGoodInfo(skuId);
        if(result.code == 200){
            commit("GETGOODINFO",result.data);
        }
    },
    // 加入购物车|更新某商品数量
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        // 请求并不会返回数据，只会返回状态码代表加入成功|失败，不用commit
        let result = await reqAddOrUpdateShopCart(skuId,skuNum);  
        // 给派发的组件一个返回值  成功 | 失败
        if(result.code == 200){
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }      
    },

};
const getters = {
    categoryView(state){
        return state.goodInfo.categoryView ||{};
    },
    skuInfo(state){
        return state.goodInfo.skuInfo||{};
    },
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList||[];
    },
};

export default{
    state,
    mutations,
    actions,
    getters
}