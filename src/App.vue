<template>
  <div>
    <Header />
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show" />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    //通知Vuex发请求，获取数据，存储在仓库中
    this.$store.dispatch("home/categoryList");
    this.$store.dispatch("home/getBannerList");
   
  },
};
</script>

<style>
</style>
