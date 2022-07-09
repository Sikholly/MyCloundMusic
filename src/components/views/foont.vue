<template>
  <div id="foont">
    <div id="playMusic">
      <!--       controls -->
      <audio autoplay ref="audio" @ended="automaticPlayMusic" :src="$store.state.musicUrl[musicSubScript]"
        @canplay="getDuration" @timeupdate="updateTime"></audio>
    </div>
    <div class="foont-list1">
      <div class="foont-list-item">
        <img :src="$store.state.musicImg[musicSubScript]" alt="" />
      </div>
      <div class="foont-list-item">
        <p>{{ $store.state.musicName[musicSubScript] }}</p>
        <p>{{ $store.state.musicArName[musicSubScript] }}</p>
      </div>
    </div>
    <div class="foont-list2">
      <div class="foont-list2-info">
        <span @click="lastSongMusic">
          <i class="iconfont icon-shangyishou"></i>
        </span>
        <span @click="PlayOrPause" v-show="isPlay">
          <i class="iconfont icon-zanting"></i>
        </span>
        <span class="suspend" v-show="!isPlay" @click="PlayOrPause"><svg t="1648278707682" class="icon"
            viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4549" width="200"
            height="200">
            <path d="M204.58705 951.162088 204.58705 72.836889 819.41295 511.998977Z" p-id="4550"></path>
          </svg></span>
        <span @click="nextSongMusic">
          <i class="iconfont icon-xiayishou"></i>
        </span>
      </div>
     
      <!-- ui -->
      <div class="foont-list2-info2">
        <div class="foont-list2-block">
          <span style="margin-right: 16px; font-size: 14px">{{
              conversionCurrentTime
          }}</span>
          <!-- <el-slider v-model="value3" :show-tooltip="false"></el-slider> -->
          <!-- ui歌曲时间 -->
          <el-slider :show-tooltip="false" v-model="currentTime" @change="changeCurrentTime"></el-slider>
          <span style="margin-left: 16px; font-size: 14px">
            {{ conversion }}</span>
        </div>
      </div>
      <!--  -->
    </div>
    <div class="foont-list3">
      <div class="foont-list3-info">
        <div class="foont-list3-block">
          <span style="margin-right: 16px">
            <i style="font-size: 22px" class="iconfont icon-yinliang"></i>
          </span>
          <!-- <el-slider v-model="value3" :show-tooltip="false"></el-slider> -->
          <!-- 音量ui滑块 -->
          <div style="width: 100px" @mousedown="isDraging = true" @mouseup="isDraging = false">
            <el-slider :show-tooltip="false" @input="changVolume" v-model="volume"></el-slider>
          </div>

          <span @click="drawer = true" type="primary" style="margin-left: 16px">
            <i style="font-size: 24px"  class="iconfont icon-zhankaicaidan"></i>
          </span>
        </div>
      </div>
      <div class="foont-list3-info">
        <span style="margin-right: 30px">暂无备案信息</span>
      </div>
    </div>
     <!-- ui歌单列表 -->
      <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
        <span>我来啦!</span>
      </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 音量
      volume: 100,
      //歌曲全长
      duration: 0,
      //歌曲当前长度
      currentTime: 0,
      // 解决滑块回弹问题
      isDraging: false,
      // 播放设置
      isPlay: false,
      //时间换算
      listTime: {
        duration: [],
        currentTime: null,
      },
      // 控制vuex下标
      musicSubScript: 0,
      // 控制抽屉的显示
      drawer: false,
    };
  },
  computed: {
    //使用计算属性来 换算分秒
    conversion() {
      if (this.duration != 0) {
        let dution = this.duration;
        let min = parseInt(dution / 60);
        let sec = parseInt(dution % 60);
        // 补0
        if (min < 10) min = "0" + min;
        if (sec < 10) sec = "0" + sec;
        return `${min}:${sec}`;
      } else {
        return "00:00";
      }
    },
    conversionCurrentTime() {
      if (this.duration != 0) {
        let dution = this.listTime.currentTime;
        let min = parseInt(dution / 60);
        let sec = parseInt(dution % 60);
        // 补0
        if (min < 10) min = "0" + min;
        if (sec < 10) sec = "0" + sec;
        return `${min}:${sec}`;
      } else {
        return "00:00";
      }
    },
  },
  methods: {
    automaticPlayMusic() {
      if (this.musicSubScript < this.$store.state.musicImg.length - 1) {
        this.musicSubScript++;
      }
    },
    changVolume(val) {
      this.$refs.audio.volume = val / 100;
    },
    //获取歌曲全长
    getDuration() {
      //此时可以获取到duration
      this.duration = this.$refs.audio.duration;
    },
    //滑动
    changeCurrentTime(val) {
      // val 将val转化为真实播放时间
      this.$refs.audio.currentTime = val * (this.duration / 100);
      console.log("滑动到位置" + val * (this.duration / 100));
    },
    // 歌曲时间更新回调
    updateTime(e) {
      if (!this.isDraging) {
        //  现长 / 格式全长除于100  转化为百分比时间  e.target.currentTime; //获取audio当前播放时间
        this.currentTime = e.target.currentTime / (this.duration / 100);
        // 把音乐正在播放真实时间赋值
        this.listTime.currentTime = e.target.currentTime;
        //
      }
    },
    // 控制音乐播放和暂停
    PlayOrPause() {
      // 可以使用判断来写 为了简化代码使用三元判断
      return this.isPlay ? this.Pause() : this.Play();
    },
    // 播放音乐 由 PlayOrPause() 调用
    Play() {
      this.$refs.audio.play();
      this.isPlay = true;
    },
    // 暂停音乐 由 PlayOrPause() 调用
    Pause() {
      this.$refs.audio.pause();
      this.isPlay = false;
    },
    //上一首
    lastSongMusic() {
      if (this.musicSubScript >= 1) {
        this.musicSubScript--;
        console.log(this.musicSubScript);
      }
    },
    // 下一首
    nextSongMusic() {
      if (this.musicSubScript < this.$store.state.musicImg.length - 1) {
        this.musicSubScript++;
        console.log(this.musicSubScript);
      }
    },
  },
};
</script>

<style scoped>
/* 脚步 */
#foont {
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  border-top: 1px solid rgba(218, 218, 218, 0.63);
}

i {
  cursor: pointer;
}

.foont-list1 {
  flex: 0 0 20%;
  display: flex;
  justify-content: center;
  /* align-items: center; */
}

.foont-list-item {
  margin-top: 4px;
}

.foont-list-item img {
  width: 48px;
  margin-right: 20px;
}

.foont-list-item p {
  font-size: 12px;
}

.foont-list-item>p:first-child {
  font-weight: 500;
  font-size: 16px;
  margin-top: 3px;
}

.foont-list2 {
  width: 100%;
  flex: 0 0 60%;
  display: block;
  /* justify-content: center; */
  /* background-color: rgb(34, 98, 153); */
}

.foont-list3 {
  flex: 0 0 20%;
  /* display: flex; */
  /* background-color: #ec4141; */
  /* background-color: rgb(83, 190, 190); */
}

.foont-list2-info {
  display: flex;
  width: 100%;
  text-align: center;
  /* background-color: #ec4141; */
  display: inline-block;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
}

.foont-list2-info2 {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.foont-list2-info span i {
  text-align: center;
  font-size: 24px;
  margin: 0 20px;
}

/* ui滑块自定义样式 da */
.foont-list2-block {
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: #ec4141; */
}

.foont-list2-block p {
  margin: 0 20px;
}

/* ui滑块自定义样式 xiao */
.foont-list3-block {
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.foont-list3-info {
  display: flex;
  align-items: center;
  justify-content: right;
  margin-top: 5px;
  margin-right: 20px;
}

.foont-list3-info>span {
  font-size: 14px;
  color: rgb(141, 131, 131);
}

.suspend {
  /* position: relative; */
  width: 64px;
  height: 21px;
  margin: 0 16px;
}

.suspend svg {
  /* position: absolute; */
  /* top: -3px; */
  width: 30px;
  /* left: -40px; */
  height: 21px;
}
</style>