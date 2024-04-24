"use strict";
const api_hot = require("../../api/hot.js");
const common_vendor = require("../../common/vendor.js");
require("../../utils/request.js");
const _sfc_main = {
  data() {
    return {
      tabData: []
    };
  },
  // 组件实例配置完成,但Dom未被渲染,进行网络请求,配置响应式数据
  created() {
    this.loadHotTabs();
    console.log("1");
  },
  methods: {
    async loadHotTabs() {
      console.log("2");
      const res = await api_hot.getHotTabs();
      console.log(res);
      console.log("3");
      this.tabData = res.data.list;
    }
  }
};
if (!Array) {
  const _easycom_my_search2 = common_vendor.resolveComponent("my-search");
  const _easycom_my_tabs2 = common_vendor.resolveComponent("my-tabs");
  (_easycom_my_search2 + _easycom_my_tabs2)();
}
const _easycom_my_search = () => "../../components/my-search/my-search.js";
const _easycom_my_tabs = () => "../../components/my-tabs/my-tabs.js";
if (!Math) {
  (_easycom_my_search + _easycom_my_tabs)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      placeholderText: "uni-app"
    }),
    b: common_vendor.p({
      tabData: $data.tabData,
      defaultIndex: 0
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4aaa739e"], ["__file", "F:/uniapp-project/search-uniapp/pages/hot/hot.vue"]]);
wx.createPage(MiniProgramPage);
