"use strict";
const common_vendor = require("../../common/vendor.js");
common_vendor.dayjs.locale("zh-cn");
common_vendor.dayjs.extend(common_vendor.relativeTime);
const _sfc_main = {
  name: "search-result-item-theme-3",
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  created() {
    if (this.data.pic_list.length > 3) {
      this.data.pic_list = this.data.pic_list.splice(0, 2);
    }
  },
  computed: {
    relativeTime() {
      return common_vendor.dayjs(this.data.updateTime).fromNow();
    }
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
    a: $props.data.title,
    b: common_vendor.f($props.data.pic_list, (item, k0, i0) => {
      return {
        a: item,
        b: item
      };
    }),
    c: common_vendor.t($props.data.nickname),
    d: common_vendor.p({
      color: "#999999",
      type: "compose"
    }),
    e: common_vendor.t($options.relativeTime)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-576e2ccf"], ["__file", "F:/uniapp-project/search-uniapp/components/search-result-item-theme-3/search-result-item-theme-3.vue"]]);
wx.createComponent(Component);
