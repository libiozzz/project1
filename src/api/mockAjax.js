//对于axios进行二次封装
import axios from 'axios'

//引入进度条
import nprogress from 'nprogress';
//引入进度条的样式
import 'nprogress/nprogress.css'

// 1.利用axios对象的方法create 去创建一个axios实例
const mockRequests = axios.create({  //mockRequests就是配置后的axios
    baseURL: '/mock',  //接口当中，路径都带有/mock
    timeout: 5000     //请求超时的时间：请求在5s之内没有响应，就失败
})
// 2.请求拦截器：在请求发出去之前做一些事情
mockRequests.interceptors.request.use((config) => {
    //进度条开始
    nprogress.start()
    //config是配置对象，里面的header请求头属性很重要
    return config;
})
// 3.响应拦截器：服务器响应数据回来以后，可以做一些事情
mockRequests.interceptors.response.use(
    //响应成功的回调函数
    (res) => {
        //进度条结束
        nprogress.done()
        return res.data
    },
    //响应失败的回调函数
    (err) => {
        return Promise.reject(new Error('faile'))
    })
//对外暴露
export default mockRequests;