"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "hot-video-info",
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
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($props.data.title),
    b: $props.data.poster_small,
    c: common_vendor.t($props.data.source_name),
    d: common_vendor.p({
      type: "videocam"
    }),
    e: common_vendor.t($props.data.fmplaycnt)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/uniapp-project/search-uniapp/components/hot-video-info/hot-video-info.vue"]]);
wx.createComponent(Component);
