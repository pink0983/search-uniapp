"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "hot-ranking",
  props: {
    ranking: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      // getRankingBg:'/static/images/ranking-other.png'
    };
  },
  computed: {
    getRankingBg() {
      if (this.ranking <= 3) {
        return `/static/images/ranking-${this.ranking}.png`;
      } else {
        return `/static/images/ranking-other.png`;
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $options.getRankingBg,
    b: common_vendor.t($props.ranking),
    c: $props.ranking <= 3 ? 1 : ""
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-29e4af12"], ["__file", "F:/uniapp-project/search-uniapp/components/hot-ranking/hot-ranking.vue"]]);
wx.createComponent(Component);
