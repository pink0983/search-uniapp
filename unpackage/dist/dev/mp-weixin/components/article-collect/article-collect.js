"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "article-collect",
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
    getIsCollect() {
      return this.articleData && this.articleData.isCollect ? "/static/images/collect.png" : "/static/images/un-collect.png";
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
        url: "http://127.0.0.1:4523/m1/4393965-4038352-default/user/collect",
        data: {
          articleId: that.articleData.articleId,
          isCollect: !this.articleData.isCollect
        },
        success() {
          common_vendor.index$1.hideLoading();
          that.$emit("changeCollect", !that.articleData.isCollect);
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $options.getIsCollect,
    b: common_vendor.o((...args) => $options.onClick && $options.onClick(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-30908e7e"], ["__file", "F:/uniapp-project/search-uniapp/components/article-collect/article-collect.vue"]]);
wx.createComponent(Component);
