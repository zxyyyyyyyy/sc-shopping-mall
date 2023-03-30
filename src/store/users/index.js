import { reqGetCode, reqUserRegister,reqUserLogin,reqUserInfo,reqLogout } from '@/api';
import {setToken,getToken,removeToken} from "@/utils/token";

const state = {
    code: '',
    token:getToken(),
    userInfo:{},
};
const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },
    USERLOGIN(state,token){
        state.token = token;
    },
    USERINFO(state,userInfo){
        state.userInfo = userInfo;
    },
    CLEAR(state){
        // 数据 置空
        state.token="";
        state.userInfo={};
        // 移出本地存储
        removeToken();
    }
};
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone);
        if (result.code == 200) {
            commit("GETCODE", result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    // 用户注册
    async userRegister({ commit },user) {
        let result = await reqUserRegister(user);
        if(result.code == 200){
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }
    },
    // 用户登录
    async userLogin({commit},user){
        let result = await reqUserLogin(user);
        // 服务器下发的token,用户唯一标识符(uuid)
        // 将来经常带token来找服务器要用户信息进行展示
        if(result.code == 200){
            commit("USERLOGIN",result.data.token);
            // 本地持久化存储token
           setToken(result.data.token);
            return "ok";
        }else{
            return Promise.reject(new Error("faile"));
        }
    },
    // 带token获取用户信息 
    async userInfo({commit}){
        let result = await reqUserInfo();
        if(result.code == 200){
            commit("USERINFO",result.data);
            return 'ok';
        }else{
            return Promise.reject(new Error("faile"));
        }
    },
    // 退出登录
    async logOut({commit}){
        let result = await reqLogout();
        if(result.code == 200){
            commit("CLEAR");
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
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