"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "search-history",
  data() {
    return {
      isShowClear: false
    };
  },
  methods: {
    ...common_vendor.mapMutations("search", ["removeSearchData", "removeAllSearchData"]),
    onClearAll() {
      common_vendor.index$1.showModal({
        title: "提示",
        content: "删除搜索历史记录？",
        showCancel: true,
        success: ({ confirm, cancel }) => {
          if (confirm) {
            this.removeAllSearchData();
            this.isShowClear = false;
          }
        }
      });
    },
    onHistoryItemClick(item, index) {
      if (this.isShowClear) {
        this.removeSearchData(index);
      } else {
        this.$emit("onItemClick", item);
      }
    }
  },
  computed: {
    // 2. 在 computed 中，通过 mapState 函数，注册 state 中的数据，导入之后的数据可直接使用（就像使用 data 中的数据一样）
    // mapState(模块名, ['字段名','字段名','字段名'])
    ...common_vendor.mapState("search", ["searchData"])
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
  return common_vendor.e({
    a: !$data.isShowClear
  }, !$data.isShowClear ? {
    b: common_vendor.o(($event) => $data.isShowClear = true),
    c: common_vendor.p({
      type: "trash"
    })
  } : {
    d: common_vendor.o((...args) => $options.onClearAll && $options.onClearAll(...args)),
    e: common_vendor.o(($event) => $data.isShowClear = false)
  }, {
    f: common_vendor.f(_ctx.searchData, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: "1c96fa56-1-" + i0,
        c: common_vendor.o(($event) => $options.onHistoryItemClick(item, index), index),
        d: index
      };
    }),
    g: $data.isShowClear,
    h: common_vendor.p({
      type: "clear"
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1c96fa56"], ["__file", "F:/uniapp-project/search-uniapp/components/search-history/search-history.vue"]]);
wx.createComponent(Component);
