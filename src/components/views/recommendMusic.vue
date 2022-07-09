<template>
  <div id="mian">
    <!-- 左导航栏 -->
    <!-- 左导航栏组件 -->
    <left-column/>
    <!-- 展示区 -->
    <!-- height: calc(80vh - 105px) -->
    <recommend>
      
    </recommend>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
// 导入axios
import axios from "axios";
import leftColumn from './leftColumn';
import  recommend from './ShowRegion/recommend.vue';
export default {
  components: { leftColumn,recommend},
  // components: { leftColumn},
  // data() {
  //   return {
  //     banners: [],
  //     recommendMusic: [],
  //   };
  // },
  // created() {
  //   axios({
  //     url: "http://www.sxly.ml/homepage/block/page",
  //     method: "get",
  //     params: {},
  //   }).then((res) => {
  //     this.banners = res.data.data.blocks[0].extInfo.banners;
  //   });
  //   axios({
  //     url: "http://www.sxly.ml/personalized?limit=10",
  //     method: "get",
  //     params: {},
  //   }).then((res) => {
  //     console.log(res.data.result);
  //     this.recommendMusic = res.data.result;
  //   });
  // },
  // beforeMount() {
  //   console.log(this.banners);
  // },
};
</script>

<style scoped>

/* 2阶段 */
#mian {
  display: flex;
}

#leftColumn {
  width: 200px;
  position: fixed;
  height: calc(100vh - 124px);
  /* background-color: rgb(98, 156, 206); */
  border-right: 1px solid rgb(206, 201, 201);
}

</style>