"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
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
if (!Array) {
  const _easycom_hot_video_info2 = common_vendor.resolveComponent("hot-video-info");
  _easycom_hot_video_info2();
}
const _easycom_hot_video_info = () => "../hot-video-info/hot-video-info.js";
if (!Math) {
  _easycom_hot_video_info();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      data: $props.data
    }),
    b: common_vendor.o(($event) => _ctx.$emit("click", $props.data))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b2d62509"], ["__file", "F:/uniapp-project/search-uniapp/components/hot-video-item/hot-video-item.vue"]]);
wx.createComponent(Component);
