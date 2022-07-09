import Vue from "vue";
import VueRouter from "vue-router";
//引入组件
//注册router
Vue.use(VueRouter);
//gegeRecommend
// 一级
import gegeRecommend from '../components/views/ShowRegion/gegeRecommend'
import SongSheet from '../components/views/ShowRegion/songSheet'
import rankingList from '../components/views/ShowRegion/rankingList'
import singer from '../components/views/ShowRegion/singer'
// 搜索
import searchSongs from '../components/views/ShowRegion/searchSongs'
// 二级
import recommendItem from '../components/views/ShowRegion/recommendItem'
export default new VueRouter({
	routes: [
		{
			path: "/",//路径为
			redirect:'/personality',
		},
		{
			name: gegeRecommend,
			path: "/personality",//路径为
			component: gegeRecommend,//显示组件
		},
		{
			name: SongSheet,
			path: "/songSheet",//路径为
			component: SongSheet //显示组件
		},
		{
			name: rankingList,
			path: "/rankingList",//路径为
			component: rankingList //显示组件
		},
		{
			name: singer,
			path: "/singer",//路径为
			component: singer //显示组件
		},
		{
			name: recommendItem,
			path: "/personality/recommendItem",//路径为
			component: recommendItem //显示组件
		},
		{
			name: searchSongs,
			path: "/searchSongs",//路径为
			component: searchSongs //显示组件
		},

	]
})