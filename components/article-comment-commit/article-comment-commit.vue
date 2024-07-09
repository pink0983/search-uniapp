<template>
  <view class="comment-container" :style="{ bottom: bottom + 'px' }">
    <uni-easyinput
      v-model="value"
      type="textarea"
      placeholder="说点什么..."
      :maxlength="50"
      :inputBorder="false"
    ></uni-easyinput>
    <button class="commit" type="primary" :disabled="!value" size="mini" @click="onBtnClick">
      发送
    </button>
  </view>
</template>

<script>

export default {
  name: 'article-comment-commit',
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      value: '',
      bottom: 0
    };
  },
  created() {
    // 检测软键盘的变化
    uni.onKeyboardHeightChange(({ height }) => {
      this.bottom = height;
    });
  },
  methods: {
    /**
     * 发送按钮点击事件
     */
    onBtnClick() {
      // 展示加载框
	  var that = this;
      uni.showLoading({
        title: '加载中'
      });
	  uni.request({
	  	url:'http://127.0.0.1:4523/m1/4393965-4038352-default/user/article/comment',
		method:'POST',
		data:{
			articleId: that.articleId,
			content: that.value
		},
		success(res) {
			uni.showToast({
			  title: '发表成功',
			  icon: 'success',
			  mask: true
			});
			that.$emit('success', that.value);
		}
	  })
      // 异步处理即可
      // const { data: res } = await userArticleComment({
      //   articleId: this.articleId,
      //   content: this.value
      // });
      // uni.showToast({
      //   title: '发表成功',
      //   icon: 'success',
      //   mask: true
      // });
      // 发表成功之后的回调
      // this.$emit('success', res);
    }
  }
};
</script>

<style lang="scss" scoped>
.comment-container {
  background-color: $uni-bg-color;
  text-align: right;
  padding: $uni-spacing-row-base;
  position: relative;
}
</style>
