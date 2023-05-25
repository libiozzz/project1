import { reqGetSearchInfo } from "@/api"
export default ({
    namespaced:true,
    //state:仓库存储数据
    state:{
        searchList : {}
    },
    //actions:书写业务逻辑，处理异步
    actions:{
        //获取search模块数据
        async getSearchList({commit},params={}){
            let result = await reqGetSearchInfo(params) 
            //console.log(result);
            if(result.code == 200){
                commit('GETSEARCHLIST',result.data)
            }
        }
    },
    //mutations：修改state
    mutations:{
        GETSEARCHLIST(state,searchList){
            state.searchList = searchList
        }
    },
    //getters：可理解为计算属性，简化仓库数据，让组件获取仓库的数据更加方便
    getters:{
        goodsList(state){  //state是当前仓库的，而不是大仓库的
            return state.searchList.goodsList || [] //若没有网络，为避免返回undefined，就这样写，则返回一个空数据，
        },
        trademarkList(state){  
            return state.searchList.trademarkList || [] 
        },
        attrsList(state){  
            return state.searchList.attrsList || [] 
        },
        total(state){
            return state.searchList.total || []
        }
    },
})