// 对所有的api接口进行统一的管理
import requests from "./request";
import request from "./request";

//三级联动接口   /api/product/getBaseCategoryList   get  无参数
// export const reqCategoryList = ()=>{
//     // 发请求:axios发请求返回的结果是promise对象
//     return requests({url:'/product/getBaseCategoryList',method:'get'});
// }
export const reqCategoryList = ()=> requests({url:'/product/getBaseCategoryList',method:'get'});
