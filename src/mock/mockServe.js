//引入mockjs模块
import  Mock  from "mockjs";
//把JSON数据格式引入进来(webpack默认对外暴露JSON数据结构、图片)
import banner from './banner.json'
import floor from './floor.json'

//模拟轮播图的数据
Mock.mock("/mock/banner",{code:200,data:banner}) //参数1：请求地址 参数2：请求数据
Mock.mock("/mock/floor",{code:200,data:floor}) 