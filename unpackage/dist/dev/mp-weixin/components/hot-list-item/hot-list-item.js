"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "hot-list-item",
  props: {
    // item的数据
    data: {
      type: Object,
      required: true
    },
    // 排名
    ranking: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      // hotNumber:''
    };
  },
  // vue3中不再支持使用过滤器,所以用计算属性
  computed: {
    // 把字符窜转化为以 k 为单位的字符
    hotNumber: function() {
      return function(val) {
        const num = parseInt(val);
        if (num < 1e3)
          return val;
        val = val + "";
        return val.substring(0, val.length - 3) + "k";
      };
    }
  }
};
if (!Array) {
  const _easycom_hot_ranking2 = common_vendor.resolveComponent("hot-ranking");
  _easycom_hot_ranking2();
}
const _easycom_hot_ranking = () => "../hot-ranking/hot-ranking.js";
if (!Math) {
  _easycom_hot_ranking();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ranking: $props.ranking
    }),
    b: common_vendor.t($props.data.title),
    c: common_vendor.t($props.data.desc),
    d: common_vendor.t($props.data.nickname),
    e: common_vendor.t($options.hotNumber($props.data.views)),
    f: common_vendor.o(($event) => _ctx.$emit("click"))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-9d5e745e"], ["__file", "F:/uniapp-project/search-uniapp/components/hot-list-item/hot-list-item.vue"]]);
wx.createComponent(Component);
