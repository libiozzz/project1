//登陆与注册模块
import { reqAddressInfo,reqOrderInfo } from "@/api"
export default ({
    namespaced: true,
    //state:仓库存储数据
    state: {
        //用户地址信息
        address:[],
        //商品清单数据
        orderInfo:{}
    },
    //actions:书写业务逻辑，处理异步
    actions: {
        //获取用户地址信息
        async getUserAddress({commit}){
            let result = await reqAddressInfo()
            console.log(result);
            if(result.code == 200){
                commit('GETUSERADDRESS',result.data)
            }
        },
        //获取商品清单数据
        async getOrderInfo({commit}){
            let result = await reqOrderInfo()
            console.log(result);
            if(result.code == 200){
                commit('GETORDERINFO',result.data)
            }
        }
    },
    //mutations：修改state
    mutations: {
        GETUSERADDRESS(state,address){
            state.address = address
        },
        GETORDERINFO(state,orderInfo){
            state.orderInfo = orderInfo
        }
    },
    //getters：可理解为计算属性，简化仓库数据，让组件获取仓库的数据更加方便
    getters: {

    },
})