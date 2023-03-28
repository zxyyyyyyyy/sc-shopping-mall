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

// 获取详情页数据  /api/item/{ skuId }  get请求
export const reqGetGoodInfo = (skuId)=>requests({url:`/item/${ skuId }`,method:"get"});

// 商品添加到购物车 | 更新某一个商品的个数   /api/cart/addToCart/{ skuId }/{ skuNum }   post请求
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>requests({url:`/cart/addToCart/${ skuId }/${ skuNum }`,method:'post'});

// 获取购物车列表  /api/cart/cartList   get请求
export const reqCartList = ()=>requests({url:"/cart/cartList",method:'get'});

// 删除购物车产品  /api/cart/deleteCart/{skuId}  delete请求
export const reqDeleteCartById = (skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'});
