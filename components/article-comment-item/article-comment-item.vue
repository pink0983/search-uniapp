<template>
  <view class="comment-item-container">
    <!-- 头像 -->
    <view class="avatar-box">
      <!-- <image class="avatar" :src="data.avatar" /> -->
	  <image class="avatar" src="/static/tab-icons/my.png" />
    </view>
    <!-- 评论信息 -->
    <view class="info-box">
      <!-- 评论人 -->
      <text class="comment-user">{{ data.nickName}}</text>
      <!-- 评论内容 -->
      <text class="comment-info">{{ data.content }}</text>
      <!-- 评论时间 -->
      <text class="comment-time">{{  relativeTime }}</text>
    </view>
  </view>
</template>
<script>
	import dayjs from 'dayjs';
	// 导入中文包
	import 'dayjs/locale/zh-cn';
	// 导入相对时间模块
	import relativeTime from 'dayjs/plugin/relativeTime';
	// 加载中文包到dayjs中
	dayjs.locale('zh-cn');
	// 加载相对时间模块
	dayjs.extend(relativeTime);
	export default {
		name:"article-comment-item",
		props:{
			data:{
				type:Object,
				required:true
			}
		},
		computed: {
			relativeTime(){
				return dayjs(this.data.postTime).fromNow()
			}
		},
		data() {
			return {
				
			};
		},
	}
</script>

<style lang="scss" scoped>
.comment-item-container {
  padding: $uni-spacing-col-lg 0;
  display: flex;
  .info-box {
    margin-left: $uni-spacing-row-sm;
    display: flex;
    flex-direction: column;
    .comment-user {
      font-size: $uni-font-size-sm;
      font-weight: bolder;
      color: $uni-text-color;
    }
    .comment-info {
      margin-top: $uni-spacing-col-sm;
      font-size: $uni-font-size-base;
      color: $uni-text-color;
    }
    .comment-time {
      margin-top: $uni-spacing-col-sm;
      font-size: $uni-font-size-sm;
      color: $uni-text-color-grey;
    }
  }
}
</style>