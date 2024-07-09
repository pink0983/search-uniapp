"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "article-praise",
  props: {
    /**
     * 数据源
     */
    articleData: {
      type: Object,
      required: true
    }
  },
  computed: {
    getIsPraise() {
      return this.articleData && this.articleData.isPraise ? "/static/images/praise.png" : "/static/images/un-praise.png";
    }
  },
  methods: {
    ...common_vendor.mapActions("user", ["isLogin"]),
    async onClick() {
      var that = this;
      if (!await this.isLogin()) {
        return;
      }
      common_vendor.index$1.showLoading({
        title: "加载中"
      });
      await common_vendor.index$1.request({
        url: "http://127.0.0.1:4523/m1/4393965-4038352-default/user/praise",
        data: {
          articleId: that.articleData.articleId,
          isPraise: !that.articleData.isPraise
        },
        success() {
          common_vendor.index$1.hideLoading();
          that.$emit("changePraise", !that.articleData.isPraise);
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $options.getIsPraise,
    b: common_vendor.o((...args) => $options.onClick && $options.onClick(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6b59017d"], ["__file", "F:/uniapp-project/search-uniapp/components/article-praise/article-praise.vue"]]);
wx.createComponent(Component);
