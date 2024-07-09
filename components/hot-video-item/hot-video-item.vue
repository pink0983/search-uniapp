<template>
  <view class="hot-video-item-container">
    <view class="video-box">
      <video id="myVideo" class="video"
	   src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4" 
	   enable-danmu danmu-btn controls />
	  <!-- <video src="../../static/images/dog.mp4" enable-danmu danmu-btn controls></video> -->
    </view>
    <view @click="$emit('click', data)">
      <hot-video-info :data="data" />
    </view>
  </view>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.hot-video-item-container {
  margin-bottom: $uni-spacing-col-lg;
  position: relative;
  .video {
    width: 100%;
    height: 230px;
  }
}
</style>
