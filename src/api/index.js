//API统一管理
import requests from "./request";
import mockRequests from './mockAjax'

//三级联动接口
// /api/product/getBaseCategoryList get 无参数
//对外暴露一个函数，只要外部调用这个函数，就向服务器发起ajax请求，获取三级列表数据
export const reqCategoryList = () => {
    //发送请求(axios发请求返回的结果是promise对象)
    return requests({
        url: '/product/getBaseCategoryList',
        method: 'get'
    })
}

//获取banner数据
export const reqGetBannerList = () => mockRequests.get('/banner')
//获取floor数据
export const reqGetFloorList = () => mockRequests.get('/floor')
//获取search数据（需要外部传参）
export const reqGetSearchInfo = (params) => requests({ //params至少是一个空对象
    url: '/list',
    method: 'post',
    data: params
})
//获取商品详情页数据
export const reqGoodInfo = (skuId) => requests({
    url: `/item/${skuId}`,
    method: 'get'
})
//将产品添加到购物车中，并获取更新产品的个数
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post'
})
//获取购物车列表数据接口
export const reqCartList = () => requests({
    url: `/cart/cartList`,
    method: 'get'
})
//删除购物车的接口
export const reqDeleteCartById = (skuId) => requests({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete'
})
//切换产品的选中状态
export const reqUpdateCheckedById = (skuId, isChecked) => requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get'
})
//获取验证码
export const reqGetCode = (phone) => requests({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get'
})
//用户注册
export const reqUserRegister = (data) => requests({
    url: '/user/passport/register',
    data: data, //是个对象
    method: 'post',
})
//登录
export const reqUserLogin = (data) => requests({
    url: '/user/passport/login',
    data: data, //是个对象
    method: 'post',
})
//获取用户信息 （带token向服务器要用户的信息）
export const reqUserInfo = () => requests({
    url: '/user/passport/auth/getUserInfo',
    method: 'get',
})
//退出登录
export const reqLogout = () => requests({
    url: '/user/passport/logout',
    method: 'get',
})
//获取用户地址信息
export const reqAddressInfo = () => requests({
    url: '/user/userAddress/auth/findUserAddressList',
    method: 'get'
})
//获取商品清单
export const reqOrderInfo = () => requests({
    url: '/order/auth/trade',
    method: 'get'
})
//提交订单的接口
//URL:/api/order/auth/submitOrder?tradeNo={tradeNo}  method:post

export const reqSubmitOrder = (tradeNo, data) => requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method: 'post'
});
//获取支付信息
//URL:/api/payment/weixin/createNative/{orderId}  GET
export const reqPayInfo = (orderId) => requests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: 'get'
});
//获取支付订单状态
export const reqPayStatus = (orderId) => requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: 'get'
});
//获取个人中心的数据
export const reqMyOrderList = (page,limit) => requests({
    url: `/order/auth/${page}/${limit}`,
    method: 'get'
});