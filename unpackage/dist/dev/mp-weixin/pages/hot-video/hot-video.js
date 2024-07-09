"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_mescrollUni_components_mescrollUni_mescrollMixins = require("../../uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js");
const _sfc_main = {
  // 3. 注册 mixin
  mixins: [uni_modules_mescrollUni_components_mescrollUni_mescrollMixins.MescrollMixin],
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
    ...common_vendor.mapMutations("video", ["setVideoData"]),
    /**
     * 获取列表数据
     */
    loadHotVideoList() {
      var that = this;
      common_vendor.index$1.request({
        url: "http://127.0.0.1:4523/m1/4393965-4038352-default/video/list",
        data: {
          page: that.page,
          size: that.size
        },
        success(res) {
          if (that.page === 1) {
            that.videoList = res.data.list;
          } else {
            that.videoList = [...that.videoList, ...res.data.list];
          }
        }
      });
    },
    // 4. 实现回调方法
    /**
     * List 组件的首次加载
     */
    mescrollInit() {
      this.loadHotVideoList();
      this.isInit = false;
      if (this.mescroll !== null) {
        this.mescroll.endSuccess();
      }
    },
    /**
     * 下拉刷新的回调
     */
    downCallback() {
      if (this.isInit)
        return;
      this.page = 1;
      this.loadHotVideoList();
      if (this.mescroll !== null) {
        this.mescroll.endSuccess();
      }
    },
    /**
     * 上拉加载的回调
     */
    upCallback() {
      if (this.isInit)
        return;
      this.page += 1;
      this.loadHotVideoList();
      if (this.mescroll !== null) {
        this.mescroll.endSuccess();
      }
    },
    /**
     * item 点击事件
     */
    onItemClick(data) {
      this.setVideoData(data);
      common_vendor.index$1.navigateTo({
        url: `/subpkg/pages/video-detail/video-detail`
      });
    }
  }
};
if (!Array) {
  const _easycom_hot_video_item2 = common_vendor.resolveComponent("hot-video-item");
  const _easycom_mescroll_body2 = common_vendor.resolveComponent("mescroll-body");
  (_easycom_hot_video_item2 + _easycom_mescroll_body2)();
}
const _easycom_hot_video_item = () => "../../components/hot-video-item/hot-video-item.js";
const _easycom_mescroll_body = () => "../../uni_modules/mescroll-uni/components/mescroll-body/mescroll-body.js";
if (!Math) {
  (_easycom_hot_video_item + _easycom_mescroll_body)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.videoList, (item, index, i0) => {
      return {
        a: common_vendor.o($options.onItemClick, index),
        b: "ce12fcda-1-" + i0 + ",ce12fcda-0",
        c: common_vendor.p({
          data: item
        }),
        d: index
      };
    }),
    b: common_vendor.sr("mescrollRef", "ce12fcda-0"),
    c: common_vendor.o($options.mescrollInit),
    d: common_vendor.o($options.downCallback),
    e: common_vendor.o($options.upCallback)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ce12fcda"], ["__file", "F:/uniapp-project/search-uniapp/pages/hot-video/hot-video.vue"]]);
wx.createPage(MiniProgramPage);
