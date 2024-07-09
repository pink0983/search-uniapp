<template>
	<div class="search-blog-container">
		<!-- search模块 -->
		<view class="search-bar-box">
			<my-search :isShowInput="true"
			:placeholderText="defaultText"
			v-model="searchVal"
			:config="{
			  backgroundColor: '#f1f0f3'
			}"
			@search="onSearchConfirm"
			@focus="onSearchFocus"
			@blur="onSearchBlur"
			@clear="onSearchClear"
			@cancel="onSearchCancel"
			></my-search>
		</view>
		<view class="search-hot-list-box" v-if="showType === HOT_LIST">
			<search-hot-list @onSearch="onSearchConfirm"></search-hot-list>
		</view>
		<view class="search-history-box" v-else-if="showType === SEARCH_HISTORY">
			<search-history @onSearch="onSearchConfirm"></search-history>
		</view>
		<view class="search-result-list-box" v-else>
			<search-result-list ref="mescrollItem" :queryStr="searchVal" ></search-result-list>
		</view>
	</div>
</template>

<script>
import MescrollCompMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-comp.js';
import { mapMutations } from 'vuex';
// 0: 热搜列表 - 默认
const HOT_LIST = '0';
// 1：搜索历史
const SEARCH_HISTORY = '1';
// 2：搜索结果
const SEARCH_RESULT = '2';
	export default{
		// 3. 注册 mixins
		mixins: [MescrollCompMixin],
		data() {
			return {
				// 因为html中只能访问data中的数据,以下为es6语法
				HOT_LIST,
				SEARCH_HISTORY,
				SEARCH_RESULT,
				searchVal:'',
				defaultText:'',
				// 默认情况下 || 点击输入框的取消按钮时，显示【热搜列表】
				// 当 searchBar 获取焦点时 || 点击输入框清空按钮时，显示 【搜索历史】
				// 用户点击热搜列表 item || 用户点击搜索历史 || 用户按下搜索键，显示 【搜索结果】
				showType: HOT_LIST,
			}
		},
		created() {
			this.loadDefaultText()
		},
		methods:{
			...mapMutations('search', ['addSearchData']),
			onSearchConfirm(val) {
			  // 用户未输入文本，直接搜索时，使用【推荐搜索文本】
			  this.searchVal = val ? val : this.defaultText;
			  // 保存搜索历史数据
			  this.addSearchData(this.searchVal);
			  // 切换视图
			  if (this.searchVal) {
			    this.showType = SEARCH_RESULT;
			  }
			},
			onSearchFocus(val){
				this.showType = SEARCH_HISTORY;
			},
			onSearchBlur(val){
			},
			onSearchClear(){
				this.showType = SEARCH_HISTORY;
			},
			onSearchCancel(val){
				this.showType = HOT_LIST;
			},
			loadDefaultText(){
				var that = this;
				uni.request({
					url:'http://127.0.0.1:4523/m1/4393965-4038352-default/search/default-text',
					success(res) {
						that.defaultText = res.data.defaultText;
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-blog-container{
		.search-bar-box{
			background-color: $uni-bg-color;
			padding: $uni-spacing-row-sm;
			position: sticky;
			top: 0px;
			z-index: 9;
		}
	}
</style>