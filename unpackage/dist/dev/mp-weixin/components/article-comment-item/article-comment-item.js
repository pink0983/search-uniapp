"use strict";
const common_vendor = require("../../common/vendor.js");
common_vendor.dayjs.locale("zh-cn");
common_vendor.dayjs.extend(common_vendor.relativeTime);
const _sfc_main = {
  name: "article-comment-item",
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    relativeTime() {
      return common_vendor.dayjs(this.data.postTime).fromNow();
    }
  },
  data() {
    return {};
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($props.data.nickName),
    b: common_vendor.t($props.data.content),
    c: common_vendor.t($options.relativeTime)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-06aa2f7b"], ["__file", "F:/uniapp-project/search-uniapp/components/article-comment-item/article-comment-item.vue"]]);
wx.createComponent(Component);
