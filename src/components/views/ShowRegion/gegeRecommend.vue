<template>
  <div>
      <!-- ui -->
      <div class="lbt" style="height: 280px; margin-top: 10px">
        <el-carousel :interval="8000" type="card" height="240px">
          <el-carousel-item v-for="(item, index) in banners" :key="index">
            <img :src="item.pic" alt="" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- ui -->
      <div id="recommendMusicList">
        <h3>推荐歌单<i class="iconfont icon-jiantouyou"></i></h3>
        <div id="recommendMusicList-content">
          <!-- 使用router-link tag指定为div 会把router-link 编译为 div -->
          <!-- <router-link tag="div" to="recommendItem" -->
          <div
            v-for="(item, index) in recommendMusic"
            :key="index"
            @click="GetDetailedPlaylists(item.id)"
            class="recommendMusicList-item"
          >
            <div>
              <div>
                <img :src="item.picUrl" alt="" />
              </div>
              <div class="recommendMusicList-item-title">
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
// 获取歌单详情 /playlist/detail?id=24381616
import axios from "axios";

export default {
//   components: { exhibitionNav, GegeRecommend },
  data() {
    return {
      banners: [],
      recommendMusic: [],
    };
  },
  // 获取歌单详细 id 必须 limit 获取数量 offset 分页
  //   /playlist/track/all?id=24381616&limit=10&offset=1
  //方法
  methods: {
    GetDetailedPlaylists(id) {
      console.log(id); //输出歌单id 通过用户点击歌单 传所对应的id
      // axios({
      //   url: `http://www.sxly.ml/playlist/track/all?id=${id}&limit=10&offset=0`,
      //   method: "get",
      //   params: {},
      // }).then((res) => {
      //   console.log(res);
      // });
      this.$router.push(`/personality/recommendItem?id=${id}`);
    },
  },

  // 生命周期钩子created
  created() {
    axios({
      url: '/api/homepage/block/page',
      method: "get",
      params: {},
    }).then((res) => {
      this.banners = res.data.data.blocks[0].extInfo.banners;
    });
    axios({
      url: "/api/personalized?limit=10",
      method: "get",
      params: {},
    }).then((res) => {
      console.log(res.data.result);
      this.recommendMusic = res.data.result;
    });
  },
  beforeMount() {
    console.log(this.banners);
  },
};
</script>

<style>
.lbt{
  z-index: -100;
}
/* 推荐歌单 */
#recommendMusicList {
  width: 1300px;
  /* height: 1500px; */
  /* background-color: #ec4141; */
  margin: 0 auto;
}
.recommendMusicList {
  margin: 20px 10px;
}

.recommendMusicList h3 {
  color: #373737;
}

#recommendMusicList-content {
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  /* background-color: rgb(128, 165, 197); */
}

.recommendMusicList-item {
  height: auto;
  flex: 0 0 17%;
  margin-top: 20px;
  margin-left: 20px;
}

.recommendMusicList-item div {
  display: block;
  width: 220px;
  /* height: auto; */
  /* padding: 5px 20px; */
  margin: 10px auto;
}

.recommendMusicList-item div img {
  border-radius: 20px;
  width: 220px;
}
.recommendMusicList-item-title {
  width: 200px;
  height: 42px;
  /* background-color: #ec4141; */
}
</style>