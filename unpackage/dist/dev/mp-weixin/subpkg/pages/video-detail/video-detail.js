"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_index = require("../../../utils/index.js");
const _sfc_main = {
  data() {
    return {
      // 弹幕数据源
      danmuList: [],
      // 列表数据源
      commentList: [],
      // 输入框是否显示
      isShowCommit: false,
      // video 组件上下文
      videoContext: null,
      // 弹幕列表数据加载中
      isLoadingComment: true
    };
  },
  computed: {
    ...common_vendor.mapState("video", ["videoData"])
  },
  created() {
    this.loadVideoDanmuList();
  },
  onReady: function(res) {
    this.videoContext = common_vendor.index$1.createVideoContext("myVideo");
  },
  methods: {
    ...common_vendor.mapMutations("video", ["setVideoData"]),
    /**
       * 获取弹幕数据
    *
       */
    loadVideoDanmuList() {
      var that = this;
      common_vendor.index$1.request({
        url: "http://127.0.0.1:4523/m1/4393965-4038352-default/video/danmu",
        data: {
          videoId: that.videoData.id
        },
        success(res) {
          res.data.list.forEach((item) => {
            item.color = utils_index.getRandomColor();
          });
          that.danmuList = [...res.data.list];
          that.commentList = [...res.data.list];
          that.isLoadingComment = false;
        }
      });
    },
    /**
     * 发布弹幕点击事件
     */
    onCommit() {
      this.$refs.popup.open();
    },
    /**
     * 发布弹幕的 popup 切换事件
     */
    onCommitPopupChange(e) {
      if (e.show) {
        this.isShowCommit = e.show;
      } else {
        setTimeout(() => {
          this.isShowCommit = e.show;
        }, 200);
      }
    },
    /**
     * 弹幕发布成功之后的回调
     */
    onSendBarrage(content) {
      this.videoContext.sendDanmu({
        text: content,
        color: utils_index.getRandomColor()
      });
      this.$refs.popup.close();
      this.isShowCommit = false;
      let newDanmu = {
        uname: "千千",
        content
      };
      this.commentList.unshift(newDanmu);
      common_vendor.index$1.showToast({
        title: "发表成功"
      });
    },
    /**
     * 点赞处理回调
     */
    onChangePraise(isPraise) {
      this.setVideoData({ ...this.videoData, isPraise });
    },
    /**
     * 收藏处理回调
     */
    onChangeCollect(isCollect) {
      this.setVideoData({ ...this.videoData, isCollect });
    }
  }
};
if (!Array) {
  const _easycom_hot_video_info2 = common_vendor.resolveComponent("hot-video-info");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_empty_data2 = common_vendor.resolveComponent("empty-data");
  const _easycom_article_comment_item2 = common_vendor.resolveComponent("article-comment-item");
  const _easycom_article_operate2 = common_vendor.resolveComponent("article-operate");
  const _easycom_article_comment_commit2 = common_vendor.resolveComponent("article-comment-commit");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_hot_video_info2 + _easycom_uni_load_more2 + _easycom_empty_data2 + _easycom_article_comment_item2 + _easycom_article_operate2 + _easycom_article_comment_commit2 + _easycom_uni_popup2)();
}
const _easycom_hot_video_info = () => "../../../components/hot-video-info/hot-video-info.js";
const _easycom_uni_load_more = () => "../../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_empty_data = () => "../../../components/empty-data/empty-data.js";
const _easycom_article_comment_item = () => "../../../components/article-comment-item/article-comment-item.js";
const _easycom_article_operate = () => "../../../components/article-operate/article-operate.js";
const _easycom_article_comment_commit = () => "../../../components/article-comment-commit/article-comment-commit.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_hot_video_info + _easycom_uni_load_more + _easycom_empty_data + _easycom_article_comment_item + _easycom_article_operate + _easycom_article_comment_commit + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.danmuList,
    b: common_vendor.p({
      data: _ctx.videoData
    }),
    c: $data.isLoadingComment
  }, $data.isLoadingComment ? {
    d: common_vendor.p({
      status: "loading"
    })
  } : $data.commentList.length === 0 ? {} : {
    f: common_vendor.f($data.commentList, (item, index, i0) => {
      return {
        a: "4cdccd10-3-" + i0,
        b: common_vendor.p({
          data: item
        }),
        c: index
      };
    })
  }, {
    e: $data.commentList.length === 0,
    g: common_vendor.o($options.onCommit),
    h: common_vendor.o($options.onChangePraise),
    i: common_vendor.o($options.onChangeCollect),
    j: common_vendor.p({
      placeholder: "发个弹幕，开心一下",
      articleData: _ctx.videoData
    }),
    k: $data.isShowCommit
  }, $data.isShowCommit ? {
    l: common_vendor.o($options.onSendBarrage),
    m: common_vendor.p({
      articleId: _ctx.videoData.id
    })
  } : {}, {
    n: common_vendor.sr("popup", "4cdccd10-5"),
    o: common_vendor.o($options.onCommitPopupChange),
    p: common_vendor.p({
      type: "bottom"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4cdccd10"], ["__file", "F:/uniapp-project/search-uniapp/subpkg/pages/video-detail/video-detail.vue"]]);
wx.createPage(MiniProgramPage);
