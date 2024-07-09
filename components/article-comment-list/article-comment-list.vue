<template>
  <!-- 精简评论 -->
  <view class="comment-limt-container" v-if="!isShowAllComment">
    <view class="comment-title">精简评论</view>
    <block v-for="(item, index) in commentList.slice(0, 2)" :key="index">
      <!-- item 项组件 -->
      <article-comment-item :data="item" />
    </block>
    <view class="show-more" @click="$emit('moreClick')">查看更多评论</view>
  </view>
  <!-- 全部评论 -->
  <view class="comment-all-container" v-else>
    <!-- 当mescroll-body写在子组件时,父页面需引入mescroll-comp.js的mixins -->
    <mescroll-body
      ref="mescrollRef"
      @init="mescrollInit"
      @up="upCallback"
      :down="{
        use: false
      }"
      :up="{
        textNoMore: '-- 我也是有底线的！ --'
      }"
    >
      <view class="comment-title">全部评论</view>
      <view class="list">
        <block v-for="(item, index) in commentList" :key="index">
          <article-comment-item :data="item" />
        </block>
      </view>
    </mescroll-body>
  </view>
</template>

<script>
	import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
	export default {
		name:"article-comment-list",
		mixins: [MescrollMixin], // 使用mixin
		props:{
			articleId:{
				type:String,
				required:true
			},
			// 是否展示全部评论
			isShowAllComment: {
			  type: Boolean,
			  default: false
			}
		},
		data() {
			return {
				// 当前页数
				page: 1,
				// 每页评论数
				pageSize: 5,
				// 评论列表
				commentList: [],
				// 评论总数
				commentListTotal: 0,
				// 是否为 init
				isInit: true,
				// 组件实例
				mescroll: null
			}
		},
		created() {
			this.loadCommentList();
		},
		methods:{
			loadCommentList(){
				var that = this;
				uni.request({
					url:'http://127.0.0.1:4523/m1/4393965-4038352-default/article/comment/list',
					data:{
						articleId: that.articleId,
						page: that.page,
						pageSize: that.pageSize,
					},
					success(res) {
						that.commentListTotal = res.data.count;
						if(that.page === 1){
							that.commentList = res.data.list;
						} else {
							that.commentList =[...that.commentList,...res.data.list];
						}
					}
				})
			},
			/**
			 * 首次加载
			 */
			mescrollInit() {
			  this.loadCommentList();
			  this.isInit = false;
			  // 结束 上拉加载 && 下拉刷新
			  if ( this.mescroll !== null){
			  	this.getMescroll().endSuccess();
				this.mescroll.endBySize(this.commentList.length, this.commentListTotal);
			  }
			},
			/**
			 * 上拉加载更多
			 */
			upCallback() {
			  if (this.isInit) return;
			  this.page += 1;
			  this.loadCommentList();
			  // 结束 上拉加载 && 下拉刷新
			  // if ( this.mescroll !== null){
			  	this.getMescroll().endSuccess();
				this.mescroll.endBySize(this.commentList.length, this.commentListTotal);
			  // }
			},
			/**
			 * 返回 mescroll实例对象
			 */
			getMescroll() {
			  if (!this.mescroll) {
			    this.mescroll = this.$refs.mescrollRef.mescroll;
			  }
			  return this.mescroll;
			},
			/**
			 * 为 comment 增加一个评论
			 */
			addCommentList(data) {
				let newComment = {
					nickName:'success',
					content:data
				}
				this.commentList.unshift(newComment);
			}
		}
	}
</script>

<style lang="scss" scoped>
.comment-title {
  font-weight: bold;
  color: $uni-text-color-title;
  font-size: $uni-font-size-lg;
  margin: $uni-spacing-col-lg 0;
}
.comment-limt-container {
  .show-more {
    margin: $uni-spacing-col-lg;
    text-align: center;
    color: $uni-text-color-more;
    font-size: $uni-font-size-base;
  }
}
</style>