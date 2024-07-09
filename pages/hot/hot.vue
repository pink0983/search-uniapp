<template>
	<view class="hot-container">
		<image class="logo" src="../../static/images/logo.png" mode="aspectFit"></image>
		<!-- 组件无需注册，可直接使用 -->
		<view class="search-box" @click="onToSearch">
			<my-search placeholderText="uni-app"></my-search>
		</view>
		<view class="tab-sticky">
			<my-tabs :tabData="tabData" 
			:defaultIndex="currentIndex"
			:config="{ textColor: '#333333' }"
			@tabclick="onTabClick()"
			>
			</my-tabs>
		</view>
		<!-- list试图-->
		<!-- 让list具有左右切换的能力，使用swiper进行改造 -->
		<!-- current表示当前展示哪个swiperitem -->
		<swiper class="swiper" :current="currentIndex" 
		:style="{ height: currentSwiperHeight + 'px'}"
		@animationfinish="onSwiperEnd"
		@change="onSwiperChange">
			<swiper-item class="swiper-item" v-for="(tabItem,tabIndex) in tabData" :key="tabIndex">
				<view>
					<!-- uni提供的加载动画 -->
					<uni-load-more status="loading" v-if="isLoading"></uni-load-more>
					<!-- 列表 -->
					<block v-else>
						<hot-list-item :class="'hot-list-item-' + tabIndex" 
						v-for="(item,index) in listData[tabIndex]" 
						:key="index"
						:data="item"
						:ranking="index + 1"
						@click="onItemClick(item)">
						</hot-list-item>
					</block>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabData: [],
				// tab激活项
				currentIndex:0,
				isLoading:true,
				// 以index为key,对应的list为value
				listData: {},
				// 当前swiper高度
				currentSwiperHeight: 0,
				// 缓存高度的计算结果
				swiperHeightData: {},
				// 当前页面滚动距离
				currentPageScrollTop:0
			};
		},
		// 组件实例配置完成,但Dom未被渲染,进行网络请求,配置响应式数据
		created(){
			this.loadHotTabs();
		},
		// 监听页面滚动事件
		onPageScroll(res) {
			this.currentPageScrollTop = res.scrollTop;
		},
		
		methods:{
			// 获取热搜文章类型
			loadHotTabs(){
				uni.request({
					url:'http://127.0.0.1:4523/m1/4393965-4038352-default/hot/tab',
					success: (res) => {
						this.tabData = res.data.list;
						this.loadHotListFromTab();
					},
					fail: (err) => {
						console.log(err);
					}
				})
			}, 
			// tab栏点击事件
			onTabClick(index){
				this.currentIndex = index;
			},
			onToSearch(){
				uni.navigateTo({
					url:'/subpkg/pages/search-blog',
				})
			},
			getHotListFromTabType(type){
				uni.request({
					url:'http://127.0.0.1:4523/m1/4393965-4038352-default/hot/list',
					data: {
					  type
					},
					success: (res) => {
						this.listData[this.currentIndex] = res.data.list;
						this.isLoading  = false;
					},
					fail: (err) => {
					}
				})
			},
			// 获取list列表数据
			loadHotListFromTab(){
				if(!this.listData[this.currentIndex]){
					// 没有获取到数据
					this.isLoading  = true;
					// 调用接口获取
					const id = this.tabData[this.currentIndex].id;
					const { data: res } = this.getHotListFromTabType(id);
					// 数据保存到本地
					// this.listData[this.currentIndex] = res.list;
					// this.isLoading  = false;
					// 缓存完成后,计算高度
					setTimeout( () =>{
						this.currentSwiperHeight = this.getCurrentSwiperHeight();
						this.swiperHeightData[this.currentIndex] = this.currentSwiperHeight;
					},0);
				}
				// else {
				// 	// 获取到数据（已缓存）
				// }
			},
			// 获取swiper高度
			getCurrentSwiperHeight(){
				return new Promise((resolve, reject) => {
					let sum = 0;
					// 1.拿到所有item
					const query = uni.createSelectorQuery().in(this);
					query
					  .selectAll(`.hot-list-item-${this.currentIndex}`)
					  .boundingClientRect((res) => {
						  // 拿到每一个的高度,进行累加
						  res.forEach((item) =>{
							  sum += item.height;
						  });
						  resolve(sum);
					  })
					  .exec();
				})
			},
			// 监听swiper切换 tab跟着切换
			onSwiperChange(e){
				if (this.currentPageScrollTop > 130) {
					// 控制列表的滚动位置
					uni.pageScrollTo({
						scrollTop:130
					})
				}
				this.currentIndex = e.detail.current;
			},
			// 动画完成
			onSwiperEnd(){
				// 缓存不存在就获取数据
				if (!this.listData[this.currentIndex]){
					this.loadHotListFromTab();
					return;
				}
				// 未return 则存在数据缓存 则同时存在height的缓存数据 
				this.currentSwiperHeight = this.swiperHeightData[this.currentIndex];
			},
			// 热搜列表item点击事件
			onItemClick(item){
				uni.navigateTo({
					url:`/subpkg/pages/blog-detail/blog-detail?author=${item.user_name}&articleId=${item.id}`
				})
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
		// 吸顶效果
		.tab-sticky{
			position: sticky;
			z-index: 99;
			top: 0;
		}
	}

</style>
