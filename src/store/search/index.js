import { reqGetSearchInfo } from "@/api";
const state = {
    searchList: {},
};
const mutations = {
    GETSEARCHINFO(state, searchList) {
        state.searchList = searchList;
    },
};
const actions = {
    async getSearchInfo({ commit }, params = {}) {
        // params形参：是当用户派发action第二个参数传递过来的，至少是一个空对象
        let result = await reqGetSearchInfo(params);
        if (result.code == 200) {
            commit("GETSEARCHINFO", result.data);
        }
    },

};
// 简化仓库中的数据
const getters = {
    // state为当前仓库中的state
    attrsList(state) {
        return state.searchList.attrsList || [];
    },
    goodsList(state) {
        return state.searchList.goodsList || [];
    },
    trademarkList(state) {
        return state.searchList.trademarkList || [];
    },
};

export default {
    state,
    mutations,
    actions,
    getters,
}