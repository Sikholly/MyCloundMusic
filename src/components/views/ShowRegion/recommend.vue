<template>
  <div id="exhibition">
    <div id="exhibition-nav">
      <ul class="exhibition-list">
        <router-link tag="li" to="/personality" active-class="highlight">个性推荐</router-link>
        <router-link tag="li" to="/songsheet" active-class="highlight">歌单</router-link>
        <router-link tag="li" to="/rankingList" active-class="highlight">排行榜</router-link>
        <router-link tag="li" to="/singer" active-class="highlight">歌手</router-link>
      </ul>
    </div>

    <!-- 展示区的头部导航栏部分 -->
    <!-- <exhibition-nav /> -->
    <div class="exhibition-nav2" style="width: 100px; height: 64px"></div>
    <!-- 预处理 路由规则 -->
    <!-- <gege-recommend /> -->
    <router-view></router-view>
  </div>
</template>
<script>
//引入组件
import exhibitionNav from "../exhibitionNav.vue";
import GegeRecommend from "./gegeRecommend.vue";
export default {
  //注册组件
    components: { exhibitionNav, GegeRecommend },
  // data() {
  //   return {
  //     banners: [],
  //     recommendMusic: [],
  //   };
  // },
};
</script>

<style>
#exhibition {
  width: calc(100% - 200px);
  /* height: 5000px; */
  margin-left: 200px;
  /* background-color: #ddb2b2; */
  max-height: calc(100vh - 124px);
  overflow-y: auto;
  /* z-index: -1; */
}
/* 导航 */
#exhibition-nav {
  width: 100%;
  position: fixed;
  background-color: #ffffff;
  z-index: 10;
  border-left: 1px solid #cecdcd;
}

.exhibition-list {
  display: flex;
}

.exhibition-list {
  list-style: none;
  margin-left: 10px;
}

.exhibition-list li {
  list-style: none;
  margin: 20px 20px 10px 20px;
  padding-bottom: 5px;
  cursor: pointer;
}
</style>