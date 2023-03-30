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

// 修改商品选中状态   /api/cart/checkCart/{skuId}/{isChecked}  get请求
export const reqUpdateChecked = (skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'});

// 获取验证码   /api/user/passport/sendCode/{phone}  get请求
export const reqGetCode = (phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'});

// 用户注册   /api/user/passport/register  post请求
export const reqUserRegister = (data)=>requests({url:"/user/passport/register",data,method:"post"});

// 用户登录   /api/user/passport/login    post请求
export const reqUserLogin = (data)=>requests({url:"/user/passport/login",data,method:"post"});

// 获取用户信息[需要带着用户的token向服务器要用户信息]  /api/user/passport/auth/getUserInfo   get请求
export const reqUserInfo = ()=>requests({url:"/user/passport/auth/getUserInfo",method:"get"});

// 退出登录  /api/user/passport/logout   get请求
export const reqLogout = ()=>requests({url:"/user/passport/logout",method:'get'});

// 获取用户地址信息   /api/user/userAddress/auth/findUserAddressList   get请求
export const reqAddressInfo = ()=>requests({url:"/user/userAddress/auth/findUserAddressList",method:'get'});

// 获取订单交易页信息   /api/order/auth/trade  get请求
export const reqOrderInfo = ()=>requests({url:"/order/auth/trade",method:'get'});

// 提交订单  /api/order/auth/submitOrder?tradeNo={tradeNo}  post请求
export const reqSubmitOrder = (tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'});

// 获取支付信息  /api/payment/weixin/createNative/{orderId}   get请求
export const reqPayInfo = (orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'});


