<template>
	<view class="search-hot-list-container">
		<view class="search-hot-title">慕课热搜 - 全网技术 一网打尽</view>
		<view class="card">
			<block v-for="(item, index) in hotList" :key="index">
			  <view class="search-hot-item" @click="onItemClick(item)">
			    <!-- 序号 -->
			    <hot-ranking :ranking="index + 1"></hot-ranking>
			    <!-- 文本 -->
			    <text class="title line-clamp">{{ item.label }}</text>
			    <!-- hot-icon -->
			    <image v-if="index <= 2" class="search-hot-icon" src="/static/images/hot-icon.png" />
			  </view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		name:"search-hot-list",
		data() {
			return {
				hotList:[]
			};
		},
		created() {
			this.loadSearchHotList();
		},
		methods:{
			loadSearchHotList(){
				// uni.request中用this转存that
				var that = this;
				uni.request({
					url:'http://127.0.0.1:4523/m1/4393965-4038352-default/search/hot-list',
					success(res) {
						that.hotList = res.data.list
					}

				})
			},
			onItemClick(item) {
			  this.$emit('onSearch', item.label);
			}
		}
	}
</script>

<style lang="scss" scoped>
.search-hot-list-container {
  .search-hot-title {
    font-weight: bold;
    font-size: $uni-font-size-base;
    color: $uni-text-color-hot;
    padding: $uni-spacing-col-lg 12px $uni-spacing-col-lg 12px;
	margin: 5px 12px 0px 12px;
    // margin: 0 -12px $uni-spacing-col-lg -12px;
    box-shadow: 2px 2px 5px 1px rgba(143, 143, 143, 0.1);
	background-color: $uni-bg-color;
  }
  .search-hot-item {
    display: flex;
    align-items: center;
    padding: $uni-spacing-col-lg 0;
    .title {
      color: $uni-text-color;
      font-size: $uni-font-size-base;
      margin: 0 $uni-spacing-row-base;
    }
    .search-hot-icon {
      width: 14px;
      height: 14px;
    }
  }
}
</style>