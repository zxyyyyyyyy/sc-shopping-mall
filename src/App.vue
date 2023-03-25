<template>
  <div id="app">
    <Header></Header>
    <!-- 路由组件出口 -->
    <router-view></router-view>
    <!-- <Footer v-show="$route.path=='/home' || $route.path=='/search'"></Footer> -->
    <Footer v-show="$route.meta.show"></Footer>
    
  </div>
</template>

<script>
import Header from '@/components/Header/index.vue';
import Footer from './components/Footer/index.vue';

export default {
  name: 'App',
  mounted(){
    // 派发一个action||获取商品分类的三级列表数据
    this.$store.dispatch("categoryList");
  },
  components: {
    Header,
    Footer,
  }
}
</script>

<style>

</style>
