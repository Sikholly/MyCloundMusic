<template>
    <div>
        <div class="searchSub">
            <div class="searchSub_div1">
                <p>最佳匹配</p>
                <div>
                    <img :src="songImgUrl" alt="">
                    <p>歌手:{{ songName }}</p>
                    <svg t="1651828207490" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="2109" width="200" height="200">
                        <path
                            d="M698.181818 546.909091a35.141818 35.141818 0 0 1-24.669091-10.24l-372.363636-372.363636a34.909091 34.909091 0 0 1 49.338182-49.338182l372.363636 372.363636a34.676364 34.676364 0 0 1 0 49.338182 35.141818 35.141818 0 0 1-24.669091 10.24z"
                            p-id="2110"></path>
                        <path
                            d="M325.818182 919.272727a35.141818 35.141818 0 0 1-24.669091-10.24 34.676364 34.676364 0 0 1 0-49.338182l372.363636-372.363636a34.909091 34.909091 0 0 1 49.338182 49.338182l-372.363636 372.363636a35.141818 35.141818 0 0 1-24.669091 10.24z"
                            p-id="2111"></path>
                    </svg>
                </div>
            </div>
            <div>
                <tr class="tr">
                    <td style="width:200px"></td>
                    <td style="width:450px">音乐标签</td>
                    <td style="width:400px">歌手</td>
                    <td style="width:400px">专辑</td>
                    <td style="width:300px">发布时间</td>
                </tr>
                <tr class="tr" v-for="(item, index) in allSongs" :key="index">
                    <td style="width:200px">{{ index + 1 }}</td>
                    <td style="width:450px" @click="obtainUrl(item.id)">{{ item.name }}</td>
                    <td style="width:400px">{{ item.artists[0].name }}</td>
                    <td style="width:400px">{{ item.name }}</td>
                    <td style="width:300px">{{ timestampToTime(publishTime[index]) }}</td>
                </tr>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            songImgUrl: "",
            songName: "",
            allSongs: [],
            publishTime: []
        };
    },
    methods: {
        obtainUrl(url) {
            //  ---------  3.26---3:57 ----- 已经完成vuex 播放歌曲  下一步  为：
            /*
              1.将歌曲id保存到vuex 中 
              2.在vuex里面去发送异步请求
              3.脚步组件 渲染歌曲url 歌曲名字 歌曲 歌手
              4.完成滑块
            */
            // 把id给vuex
            console.log(url + "./")
            this.$store.commit('addMusicUrl', url);
            //
            this.$store.dispatch('addMusicInFo', url)
            //
            console.log(url);
            // this.$router.state.musicUrl.push(`https://music.163.com/song/media/outer/url?id=${url}.mp3`)


            //  axios({
            //   url: `/song/detail?ids=${url}`,
            //   method: "get",
            // }).then((res) => {
            //   // 歌曲名称
            // console.log(res.data.songs[0].name);
            // // 歌曲歌手
            // console.log(res.data.songs[0].ar[0].name)
            // });


            // 获取歌曲url
            // this.urlSong = url;
            // axios({
            //   // http://www.sxly.ml/song/url?id=1845651956
            //   url: `/song/url`,
            //   method: "get",
            //   params: {
            //     id:url,
            //   },
            // }).then((res) => {
            //   console.log(res.data.data[0].url);
            //   this.urlSong = res.data.data[0].url;
            // });
        },
        // 把时间戳改为日期格式
        timestampToTime(time) {
            // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var date = new Date(time)
            let y = date.getFullYear()
            let MM = date.getMonth() + 1
            MM = MM < 10 ? ('0' + MM) : MM;
            let d = date.getDate()
            d = d < 10 ? ('0' + d) : d;
            let h = date.getHours()
            h = h < 10 ? ('0' + h) : h;
            let m = date.getMinutes()
            m = m < 10 ? ('0' + m) : m;
            let s = date.getSeconds()
            s = s < 10 ? ('0' + s) : s;
            return y + '-' + MM + '-' + d
        }

    },

    // 生命周期钩子created
    created() {
        console.log(this.keywords)
        // /search?keywords=林俊杰
        axios({
            header: {
                'content-type': 'application/x-www-form-urlencoded；charset=UTF-8'
            },
            url: '/api/search/suggest',
            method: "get",
            params: {
                keywords: this.$router.history.current.query.id
            },
        }).then((res) => {
            this.songImgUrl = res.data.result.albums[0].artist.picUrl;
            this.songName = res.data.result.albums[0].artist.name;
        });
        axios({
            header: {
                'content-type': 'application/x-www-form-urlencoded；charset=UTF-8'
            },
            url: '/api/search',
            method: "get",
            params: {
                keywords: this.$router.history.current.query.id
            },
        }).then((res) => {
            console.log(res.data.result.songs[0].album.publishTime)

            for (let i = 0; i < res.data.result.songs.length; i++) {
                this.publishTime[i] = (res.data.result.songs[i].album.publishTime);
            }
            this.allSongs = res.data.result.songs
        });
    },
};
</script>

<style>
/* 隐藏导航栏部分 */
/* #exhibition-nav,
.exhibition-nav2 {
    display: none;
} */

/*  */
.searchSub {
    width: 95%;
    /* background-color: aquamarine; */
    height: 1000px;
    margin: 0 auto;
}

.searchSub_div1 {
    margin: 25px 0;
}

.searchSub>div>p {
    line-height: 50px;
}

.searchSub>div>div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    background-color: #f4f4f4;
    width: 270px;
    height: 65px;
}

.searchSub>div>div p {
    width: 200px;
    text-align: center;
}

.searchSub>div>div svg {
    width: 20px;
    height: 21px;
    margin-right: 10px;
}

.searchSub>div>div img {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    width: 65px;
    height: 65px;
}

.searchSub>div:nth-child(2) {
    width: 100%;
    height: 500px;
    /* background-color: aqua; */
}

.tr {
    text-align: left;
    height: 32px;
    line-height: 32px;
}
</style>