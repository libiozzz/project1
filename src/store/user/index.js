//登陆与注册模块
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from "@/api"
export default ({
    namespaced: true,
    //state:仓库存储数据
    state: {
        code: '',
        token: localStorage.getItem('TOKEN'),
        userInfo: {} || {}
    },
    //actions:书写业务逻辑，处理异步
    actions: {
        //获取验证码
        async getCode({ commit }, phone) {
            let result = await reqGetCode(phone)
            if (result.code == 200) {
                commit('GETCODE', result.data)
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        //用户注册
        async userRegister({ commit }, user) {
            let result = await reqUserRegister(user)
            if (result.code == 200) {
                return 'ok'
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        //登陆业务
        async userLogin({ commit }, data) {
            let result = await reqUserLogin(data)  //服务器下发token，是用户的唯一标识
            if (result.code == 200) {
                //用户已经登录成功且获取到token
                commit("USERLOGIN", result.data.token);
                //持久化存储token
                localStorage.setItem('TOKEN', result.data.token)
                return 'ok'
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        //获取用户信息
        async getUserInfo({ commit }) {
            let result = await reqUserInfo();
            console.log(result);
            if (result.code == 200) {
                //提交用户信息
                commit("GETUSERINFO", result.data);
                return 'ok';
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        //退出登录
        async userLogout({ commit }) {
            //向服务器发请求，清除token
            let result = await reqLogout()
            if (result.code == 200) {
                commit('CLEAR') //action里不能操作state
                return 'ok'
            } else {
                return Promise.reject(new Error('faile'))
            }
        }
    },
    //mutations：修改state
    mutations: {
        GETCODE(state, code) {
            state.code = code
        },
        USERLOGIN(state, token) {
            state.token = token;
          },
        GETUSERINFO(state, userInfo) {
            state.userInfo = userInfo
        },
        CLEAR(state) {
            //清楚本地数据
            state.token = '',
                state.userInfo = {},
                localStorage.removeItem('TOKEN')
        }
    },
    //getters：可理解为计算属性，简化仓库数据，让组件获取仓库的数据更加方便
    getters: {

    },
})