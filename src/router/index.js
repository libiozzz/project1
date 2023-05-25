//引入
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import routes from './routes'

//使用插件
Vue.use(VueRouter)

//解决<多次执行会抛出NavigationDuplicate的警告错误>的问题：
//1.把VueRouter原型对象上的push方法先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//2.重写push和replace方法
VueRouter.prototype.push = function (location, resolve, reject) { //第一个参数：告诉原来的push方法，你往哪里跳转以及传递哪些参数
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject); //this是VueRouter
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) { //第一个参数：告诉原来的push方法，你往哪里跳转以及传递哪些参数
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject); //this是VueRouter
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

// 配置路由
let router = new VueRouter({
    routes,
    // 滚动行为
    scrollBehavior (to, from, savedPosition) {
        // 返回的y：0代表滚动条在最上方
        return {y:0}
    }
})

//全局守卫：前置守卫（在路由跳转之前进行判断）
//to:获取到要跳转到的路由信息
//from:获取到从哪个路由跳转而来的信息
//next: next() 放行 next(path) 放行
router.beforeEach(async (to, from, next) => {
    let token = store.state.user.token
    let name = store.state.user.userInfo.name //空对象用if判断也是真，所以在这里用name进行判断
    if (token) {  //用户已经登陆了
        if (to.path == '/login') {
            next('/home')  //若用户已经登陆，就不能再去login页面
        } else {
            //登陆了，但去的不是login
            if (name) {
                next()
            } else {
                //若没有用户信息，就派发action让仓库存储用户信息，再跳转
                //获取用户信息
                try {
                       await store.dispatch('user/getUserInfo')
                    next()
                }
                catch (error) {
                    //token失效了
                    //清除token
                    await store.dispatch('user/userLogout')
                    next('/login')
                }
            }
        }
    } else {
        //未登录 不能去交易、支付、支付成功、个人中心页面 直接去登陆页面
        let toPath = to.path
        if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1){
            //把未登陆时想去但没有去成的信息，存储域地址栏中（路由中）
            next('/login?redirect='+toPath)
        }else{
            next()
        }
    }
})
export default router