<template>
	<view class="hot-container">
		<image class="logo" src="../../static/images/logo.png" mode="aspectFit"></image>
		<!-- 组件无需注册，可直接使用 -->
		<view class="search-box">
			<my-search placeholderText="uni-app"></my-search>
		</view>
		<my-tabs :tabData="tabData" :defaultIndex="0"></my-tabs>
	</view>
</template>

<script>
import { getHotTabs } from '../../api/hot';
	export default {
		data() {
			return {
				tabData: [],
			};
		},
		// 组件实例配置完成,但Dom未被渲染,进行网络请求,配置响应式数据
		created(){
			this.loadHotTabs();
			console.log('1');
		},
		methods:{
			async loadHotTabs(){
				console.log('2');
				const res = await getHotTabs();
				console.log(res);
				console.log('3');
				this.tabData = res.data.list;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.hot-container{
		background-color: $uni-bg-color;
		.logo{
			width: 100%;
			height: 80px;
		}
		.search-box {
			padding: 0 16px;
			margin-bottom: $uni-spacing-col-base;
		}
	}

</style>
