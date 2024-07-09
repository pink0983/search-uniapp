"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "search-hot-list",
  data() {
    return {
      hotList: []
    };
  },
  created() {
    this.loadSearchHotList();
  },
  methods: {
    loadSearchHotList() {
      var that = this;
      common_vendor.index$1.request({
        url: "http://127.0.0.1:4523/m1/4393965-4038352-default/search/hot-list",
        success(res) {
          that.hotList = res.data.list;
        }
      });
    },
    onItemClick(item) {
      this.$emit("onSearch", item.label);
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
    a: common_vendor.f($data.hotList, (item, index, i0) => {
      return common_vendor.e({
        a: "91350983-0-" + i0,
        b: common_vendor.p({
          ranking: index + 1
        }),
        c: common_vendor.t(item.label),
        d: index <= 2
      }, index <= 2 ? {} : {}, {
        e: common_vendor.o(($event) => $options.onItemClick(item), index),
        f: index
      });
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-91350983"], ["__file", "F:/uniapp-project/search-uniapp/components/search-hot-list/search-hot-list.vue"]]);
wx.createComponent(Component);
