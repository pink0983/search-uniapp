"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "article-operate",
  props: {
    articleData: {
      type: Object,
      required: true
    },
    placeholder: {
      type: String,
      default: "评论一句，前排打call..."
    }
  },
  data() {
    return {};
  },
  methods: {
    ...common_vendor.mapActions("user", ["isLogin"]),
    /**
     * my-search 的点击事件
     */
    async onCommitClick() {
      if (!await this.isLogin()) {
        return;
      }
      this.$emit("commitClick");
    }
  }
};
if (!Array) {
  const _easycom_my_search2 = common_vendor.resolveComponent("my-search");
  const _easycom_article_praise2 = common_vendor.resolveComponent("article-praise");
  const _easycom_article_collect2 = common_vendor.resolveComponent("article-collect");
  (_easycom_my_search2 + _easycom_article_praise2 + _easycom_article_collect2)();
}
const _easycom_my_search = () => "../my-search/my-search.js";
const _easycom_article_praise = () => "../article-praise/article-praise.js";
const _easycom_article_collect = () => "../article-collect/article-collect.js";
if (!Math) {
  (_easycom_my_search + _easycom_article_praise + _easycom_article_collect)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      placeholderText: $props.placeholder,
      config: {
        height: 28,
        backgroundColor: "#eeedf4",
        icon: "/static/images/input-icon.png",
        textColor: "#a6a5ab",
        border: "none"
      }
    }),
    b: common_vendor.o((...args) => $options.onCommitClick && $options.onCommitClick(...args)),
    c: common_vendor.o(($event) => _ctx.$emit("changePraise", $event)),
    d: common_vendor.p({
      articleData: $props.articleData
    }),
    e: common_vendor.o(($event) => _ctx.$emit("changeCollect", $event)),
    f: common_vendor.p({
      articleData: $props.articleData
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c99c0ebc"], ["__file", "F:/uniapp-project/search-uniapp/components/article-operate/article-operate.vue"]]);
wx.createComponent(Component);
