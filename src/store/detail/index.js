import {reqAddOrUpdateShopCart, reqGoodInfo} from '@/api'
//封装临时游客模块uuid，生成一个随机字符串（生成一次就不再改变）
import {getUUID} from '@/utils/uuid_token'

export default ({
    namespaced:true, 
    state:{
        goodInfo:{},
        //游客的临时身份
        uuid_token:getUUID()
    },
    actions:{
        //获取产品信息
        async getGoodInfo({commit},skuid){
           let result = await reqGoodInfo(skuid)
           if(result.code == 200){
            commit('GETGOODINFO',result.data)
           }
        },
        //将产品添加到购物车中
        async addOrUpdateShopCart({commit},{skuId,skuNum}){
           let result = await reqAddOrUpdateShopCart(skuId,skuNum) //这里服务器返回的data为dull,所以不需要后续操作
           //当前这个函数返回的结果是Promise
           if(result.code = 200){
            return 'ok' //成功·
           }else{
            return Promise.reject(new Error('faile')) //失败
           }
        }
    },
    mutations:{
        GETGOODINFO(state,goodInfo){
            state.goodInfo = goodInfo
        },
        
    },
    getters:{
        categoryView(state){
            return state.goodInfo.categoryView || {} //服务器数据没得到之前 这里返回空对象
        },
        skuInfo(state){
            return state.goodInfo.skuInfo || {}
        },
        spuSaleAttrList(state){
            return state.goodInfo.spuSaleAttrList || []
        }
    },
})