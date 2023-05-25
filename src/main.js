import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import TypeNav from '@/components/TypeNav'
import Pagination from '@/components/Pagination'
//ELement-Ui
import{Button,MessageBox} from 'element-ui'
//引入路由
import router from '@/router/index'
//引入懒加载插件
import VueLazyload from 'vue-lazyload'
//测试
// import { reqCategoryList } from './api'
// reqCategoryList()
//引入仓库
import store from './store'

//注册全局组件---三级联动组件
Vue.component('TypeNav',TypeNav)
Vue.component('Pagination',Pagination)
//element-ui 注册组件
Vue.component(Button.name,Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//引入MockServe.js
import '@/mock/mockServe'

//引入swiper样式
import 'swiper/css/swiper.css'

//统一接收api文件夹中的全部请求函数
import * as API from '@/api' //统一引入

//注册插件
import atm from '@/assets/R-C.gif'
Vue.use(VueLazyload,{
  loading:atm
})
//引入表单校验插件
import '@/plugins/validate'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //注册路由 （kv一致，省略v）
  router,
  //注册仓库：组件实例的身上会多一个$store属性
  store,
  //全局事件总线配置
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
}).$mount('#app')
