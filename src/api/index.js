// 对所有的api接口进行统一的管理
import requests from "./ajax";
import mockRequests from "./mockAjax";

//三级联动接口   /api/product/getBaseCategoryList   get  无参数
// export const reqCategoryList = ()=>{
//     // 发请求:axios发请求返回的结果是promise对象
//     return requests({url:'/product/getBaseCategoryList',method:'get'});
// }
export const reqCategoryList = ()=> requests({url:'/product/getBaseCategoryList',method:'get'});

// 获取banner(Home首页轮播图接口) mock数据，用mockRequests请求
export const reqBannerList = ()=>mockRequests.get('/banner');

// 获取floor数据
export const reqFloorList = ()=>mockRequests.get('/floor');

// 获取搜索页面数据 /api/list post请求  参数params至少是一个空对象
export const reqGetSearchInfo = (params)=>requests({url:'/list',method:'post',data:params});

// 获取详情页数据  




