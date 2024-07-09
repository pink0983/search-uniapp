"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_mescrollUni_components_mescrollUni_mescrollMixins = require("../../uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js");
const _sfc_main = {
  name: "article-comment-list",
  mixins: [uni_modules_mescrollUni_components_mescrollUni_mescrollMixins.MescrollMixin],
  // 使用mixin
  props: {
    articleId: {
      type: String,
      required: true
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
    };
  },
  created() {
    this.loadCommentList();
  },
  methods: {
    loadCommentList() {
      var that = this;
      common_vendor.index$1.request({
        url: "http://127.0.0.1:4523/m1/4393965-4038352-default/article/comment/list",
        data: {
          articleId: that.articleId,
          page: that.page,
          pageSize: that.pageSize
        },
        success(res) {
          that.commentListTotal = res.data.count;
          if (that.page === 1) {
            that.commentList = res.data.list;
          } else {
            that.commentList = [...that.commentList, ...res.data.list];
          }
        }
      });
    },
    /**
     * 首次加载
     */
    mescrollInit() {
      this.loadCommentList();
      this.isInit = false;
      if (this.mescroll !== null) {
        this.getMescroll().endSuccess();
        this.mescroll.endBySize(this.commentList.length, this.commentListTotal);
      }
    },
    /**
     * 上拉加载更多
     */
    upCallback() {
      if (this.isInit)
        return;
      this.page += 1;
      this.loadCommentList();
      this.getMescroll().endSuccess();
      this.mescroll.endBySize(this.commentList.length, this.commentListTotal);
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
        nickName: "success",
        content: data
      };
      this.commentList.unshift(newComment);
    }
  }
};
if (!Array) {
  const _easycom_article_comment_item2 = common_vendor.resolveComponent("article-comment-item");
  const _easycom_mescroll_body2 = common_vendor.resolveComponent("mescroll-body");
  (_easycom_article_comment_item2 + _easycom_mescroll_body2)();
}
const _easycom_article_comment_item = () => "../article-comment-item/article-comment-item.js";
const _easycom_mescroll_body = () => "../../uni_modules/mescroll-uni/components/mescroll-body/mescroll-body.js";
if (!Math) {
  (_easycom_article_comment_item + _easycom_mescroll_body)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$props.isShowAllComment
  }, !$props.isShowAllComment ? {
    b: common_vendor.f($data.commentList.slice(0, 2), (item, index, i0) => {
      return {
        a: "c222b52f-0-" + i0,
        b: common_vendor.p({
          data: item
        }),
        c: index
      };
    }),
    c: common_vendor.o(($event) => _ctx.$emit("moreClick"))
  } : {
    d: common_vendor.f($data.commentList, (item, index, i0) => {
      return {
        a: "c222b52f-2-" + i0 + ",c222b52f-1",
        b: common_vendor.p({
          data: item
        }),
        c: index
      };
    }),
    e: common_vendor.sr("mescrollRef", "c222b52f-1"),
    f: common_vendor.o($options.mescrollInit),
    g: common_vendor.o($options.upCallback),
    h: common_vendor.p({
      down: {
        use: false
      },
      up: {
        textNoMore: "-- 我也是有底线的！ --"
      }
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c222b52f"], ["__file", "F:/uniapp-project/search-uniapp/components/article-comment-list/article-comment-list.vue"]]);
wx.createComponent(Component);
