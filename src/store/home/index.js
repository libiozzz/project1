import { reqCategoryList,reqGetBannerList,reqGetFloorList } from '@/api'
export default ({
    namespaced:true, 
    //state:仓库存储数据
    state:{
        categoryList:[],   //由于服务器返回的是数组，所以state默认初始值为数组
        bannerList:[],
        floorList:[]
    },
    //actions:书写业务逻辑，处理异步
    actions:{
        //通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
        async categoryList({commit}){   //这里收到的参数是context，context是一个对象，我们需要里面的commit，所以直接把它解构出来
            let result = await reqCategoryList()
            //console.log(result);
            if(result.code === 200){
                commit("CATEGORYLIST",result.data)
            }
        },
        //通过API里面的接口函数调用，向服务器发请求，获取轮播图的数据
        async getBannerList({commit}){   //这里收到的参数是context，context是一个对象，我们需要里面的commit，所以直接把它解构出来
            let result = await reqGetBannerList()
            //console.log(result);
            if(result.code === 200){
                commit("GETBANNERLIST",result.data)
            }
        },
        //通过API里面的接口函数调用，向服务器发请求，获取floor的数据
        async getFloorList({commit}){   //这里收到的参数是context，context是一个对象，我们需要里面的commit，所以直接把它解构出来
            let result = await reqGetFloorList()
            //console.log(result);
            if(result.code === 200){
                commit("GETFLOORLIST",result.data)
            }
        }
    },
    //mutations：修改state
    mutations:{
        CATEGORYLIST(state,categoryList){
            state.categoryList = categoryList
        },
        GETBANNERLIST(state,bannerList){
            state.bannerList = bannerList
        },
        GETFLOORLIST(state,floorList){
            state.floorList = floorList
        }
    },
    //getters：可理解为计算属性，简化仓库数据，让组件获取仓库的数据更加方便
    getters:{},
})