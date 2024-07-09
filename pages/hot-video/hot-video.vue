<template>
  <view class="hot-video-container">
    <!-- 1. 导入 mescroll-body -->
    <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
      <block v-for="(item, index) in videoList" :key="index">
        <hot-video-item :data="item" @click="onItemClick" />
      </block>
    </mescroll-body>
  </view>
</template>

<script>
// 2. 导入 mixin
import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
import { mapMutations } from 'vuex';
export default {
  // 3. 注册 mixin
  mixins: [MescrollMixin],
  data() {
    return {
      // 数据源
      videoList: [],
      size: 5,
      page: 1,
      // 是否为 init
      isInit: false,
      // 实例
      mescroll: null
    };
  },
  created() {
    this.loadHotVideoList();
  },
  mounted() {
    this.mescroll = this.$refs.mescrollRef.mescroll;
  },
  methods: {
    ...mapMutations('video', ['setVideoData']),
    /**
     * 获取列表数据
     */
	loadHotVideoList(){
		var that = this;
		uni.request({
			url:'http://127.0.0.1:4523/m1/4393965-4038352-default/video/list',
			data:{
				page: that.page,
				size: that.size
			},
			success(res) {
				// 判断是否为第一页数据
			    if (that.page === 1) {
					that.videoList = res.data.list;
			    } else {
			        that.videoList = [...that.videoList, ...res.data.list];
			    }
			}
		})
	},
    // 4. 实现回调方法
    /**
     * List 组件的首次加载
     */
    mescrollInit() {
      this.loadHotVideoList();
      this.isInit = false;
	  // console.log('上拉加载 && 下拉刷新this.isInit',this.isInit);
	  // console.log('上拉加载 && 下拉刷新this.mescroll',this.mescroll);
      // 结束 上拉加载 && 下拉刷新
	  if ( this.mescroll !== null){
		  // console.log('上拉加载 && 下拉刷新');
	  	this.mescroll.endSuccess();
	  }
    },
    /**
     * 下拉刷新的回调
     */
    downCallback() {
		// console.log('下拉刷新this.isInit',this.isInit)
      if (this.isInit) return;
      this.page = 1;
      this.loadHotVideoList();
      // 结束 上拉加载 && 下拉刷新
	  // console.log('下拉刷新this.mescroll',this.mescroll)
      if ( this.mescroll !== null){
      	this.mescroll.endSuccess();
		// console.log('下拉刷新');
      }
    },
    /**
     * 上拉加载的回调
     */
    upCallback() {
		// console.log('上拉加载this.isInit',this.isInit)
      if (this.isInit) return;
      this.page += 1;
      this.loadHotVideoList();
      // 结束 上拉加载 && 下拉刷新
	  // console.log('上拉加载this.mescroll',this.mescroll)
      if ( this.mescroll !== null){
      	this.mescroll.endSuccess();
		// console.log('上拉加载');
      }
    },
    /**
     * item 点击事件
     */
    onItemClick(data) {
      // 保存当前点击的 video 数据到 vuex
      this.setVideoData(data);
      // 进行页面跳转
      uni.navigateTo({
        url: `/subpkg/pages/video-detail/video-detail`
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.hot-video-container {
  background-color: $uni-bg-color-grey;
}
</style>

