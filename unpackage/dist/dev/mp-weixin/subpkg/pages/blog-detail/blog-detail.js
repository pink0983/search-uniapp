"use strict";
const common_vendor = require("../../../common/vendor.js");
const uni_modules_mescrollUni_components_mescrollUni_mixins_mescrollComp = require("../../../uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-comp.js");
const mpHtml = () => "../../../uni_modules/mp-html/components/mp-html/mp-html.js";
const _sfc_main = {
  mixins: [uni_modules_mescrollUni_components_mescrollUni_mixins_mescrollComp.MescrollCompMixin],
  // 使用mixin
  // 注册组件
  components: {
    mpHtml
  },
  data() {
    return {
      // 作者名
      author: "",
      // 文章 ID
      articleId: "",
      // 文章详情数据
      articleData: null,
      // 是否展示全部评论
      isShowAllComment: false,
      // 关注用户的 loading
      isFollowLoading: false,
      // popup 的显示状态
      isShowCommit: false
    };
  },
  onLoad(options) {
    this.author = options.author;
    this.articleId = options.articleId;
    this.loadArticleDetail();
  },
  methods: {
    ...common_vendor.mapActions("user", ["isLogin"]),
    /**
     * 为所有的 DOM 增加类名
     */
    addClassFromHTML(info) {
      return info.replace(/<p>/gi, '<p class="p-cls">').replace(/<a>/gi, '<a class="a-cls">').replace(/<h1>/gi, '<h1 class="h1-cls">').replace(/<h2>/gi, '<h2 class="h2-cls">').replace(/<h3>/gi, '<h3 class="h3-cls">').replace(/<h4>/gi, '<h4 class="h4-cls">').replace(/<h5>/gi, '<h5 class="h5-cls">').replace(/<h6>/gi, '<h6 class="h6-cls">').replace(/<ul>/gi, '<ul class="ul-cls">').replace(/<li>/gi, '<li class="li-cls">').replace(/<ol>/gi, '<ol class="ol-cls">').replace(/<td>/gi, '<td class="td-cls">').replace(/<th>/gi, '<th class="th-cls">').replace(/<tr>/gi, '<tr class="tr-cls">').replace(/<dl>/gi, '<dl class="dl-cls">').replace(/<dd>/gi, '<dd class="dd-cls">').replace(/<hr>/gi, '<hr class="hr-cls">').replace(/<pre>/gi, '<pre class="pre-cls">').replace(/<strong>/gi, '<strong class="strong-cls">').replace(/<input>/gi, '<input class="input-cls">').replace(/<table>/gi, '<table class="table-cls">').replace(/<details>/gi, '<details class="details-cls">').replace(/<code>/gi, '<code class="code-cls">').replace(/<kbd>/gi, '<kbd class="kbd-cls">').replace(/<summary>/gi, '<summary class="summary-cls">').replace(/<blockquote>/gi, '<blockquote class="blockquote-cls">').replace(/<img/gi, '<img class="img-cls"');
    },
    /**
     * 获取文章详情数据
     */
    loadArticleDetail() {
      var that = this;
      common_vendor.index$1.showLoading({
        title: "加载中"
      });
      common_vendor.index$1.request({
        url: "http://127.0.0.1:4523/m1/4393965-4038352-default/article/details",
        data: {
          author: that.author,
          articleId: that.articleId
        },
        success(res) {
          that.articleData = res.data.list;
        },
        complete() {
          common_vendor.index$1.hideLoading();
        }
      });
    },
    /**
     *  关注按钮点击事件
     */
    async onFollowClick() {
      const isLogin = await this.isLogin();
      if (!isLogin) {
        return;
      }
      this.isFollowLoading = true;
      common_vendor.index$1.request({
        url: "http://127.0.0.1:4523/m1/4393965-4038352-default/user/follow",
        data: {
          author: this.author,
          isFollow: !this.articleData.isFollow
        }
      });
      this.articleData.isFollow = !this.articleData.isFollow;
      this.isFollowLoading = false;
    },
    /**
     * 发布评论点击事件
     */
    onCommit() {
      this.$refs.popup.open();
    },
    /**
     * 发布评论的 popup 切换事件
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
     * 发表评论成功
     */
    onSendSuccess(content) {
      console.log("content", content);
      this.$refs.popup.close();
      this.isShowCommit = false;
      this.$refs.mescrollItem.addCommentList(content);
    },
    /**
     * 点赞处理回调
     */
    onChangePraise(isPraise) {
      this.articleData.isPraise = isPraise;
    },
    /**
     * 收藏处理回调
     */
    onChangeCollect(isCollect) {
      this.articleData.isCollect = isCollect;
    }
  }
};
if (!Array) {
  const _easycom_mp_html2 = common_vendor.resolveComponent("mp-html");
  const _easycom_article_comment_list2 = common_vendor.resolveComponent("article-comment-list");
  const _easycom_article_operate2 = common_vendor.resolveComponent("article-operate");
  const _easycom_article_comment_commit2 = common_vendor.resolveComponent("article-comment-commit");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_mp_html2 + _easycom_article_comment_list2 + _easycom_article_operate2 + _easycom_article_comment_commit2 + _easycom_uni_popup2)();
}
const _easycom_mp_html = () => "../../../uni_modules/mp-html/components/mp-html/mp-html.js";
const _easycom_article_comment_list = () => "../../../components/article-comment-list/article-comment-list.js";
const _easycom_article_operate = () => "../../../components/article-operate/article-operate.js";
const _easycom_article_comment_commit = () => "../../../components/article-comment-commit/article-comment-commit.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_mp_html + _easycom_article_comment_list + _easycom_article_operate + _easycom_article_comment_commit + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.articleData
  }, $data.articleData ? common_vendor.e({
    b: common_vendor.t($data.articleData.articleTitle),
    c: $data.articleData.avatar,
    d: common_vendor.t($data.articleData.nickName),
    e: common_vendor.t($data.articleData.date),
    f: common_vendor.t($data.articleData.isFollow ? "已关注" : "关注"),
    g: $data.articleData.isFollow ? "primary" : "default",
    h: $data.isFollowLoading,
    i: common_vendor.o((...args) => $options.onFollowClick && $options.onFollowClick(...args)),
    j: common_vendor.p({
      content: $options.addClassFromHTML($data.articleData.content),
      ["scroll-table"]: true
    }),
    k: common_vendor.sr("mescrollItem", "09a70259-1"),
    l: common_vendor.o(($event) => $data.isShowAllComment = true),
    m: common_vendor.p({
      articleId: $data.articleId,
      isShowAllComment: $data.isShowAllComment
    }),
    n: common_vendor.o($options.onCommit),
    o: common_vendor.o($options.onChangePraise),
    p: common_vendor.o($options.onChangeCollect),
    q: common_vendor.p({
      articleData: $data.articleData
    }),
    r: $data.isShowCommit
  }, $data.isShowCommit ? {
    s: common_vendor.o($options.onSendSuccess),
    t: common_vendor.p({
      articleId: $data.articleId
    })
  } : {}, {
    v: common_vendor.sr("popup", "09a70259-3"),
    w: common_vendor.o($options.onCommitPopupChange),
    x: common_vendor.p({
      type: "bottom"
    })
  }) : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/uniapp-project/search-uniapp/subpkg/pages/blog-detail/blog-detail.vue"]]);
wx.createPage(MiniProgramPage);
