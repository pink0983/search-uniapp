"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_mescrollUni_components_mescrollUni_mixins_mescrollComp = require("../../uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-comp.js");
const HOT_LIST = "0";
const SEARCH_HISTORY = "1";
const SEARCH_RESULT = "2";
const _sfc_main = {
  // 3. 注册 mixins
  mixins: [uni_modules_mescrollUni_components_mescrollUni_mixins_mescrollComp.MescrollCompMixin],
  data() {
    return {
      // 因为html中只能访问data中的数据,以下为es6语法
      HOT_LIST,
      SEARCH_HISTORY,
      SEARCH_RESULT,
      searchVal: "",
      defaultText: "",
      // 默认情况下 || 点击输入框的取消按钮时，显示【热搜列表】
      // 当 searchBar 获取焦点时 || 点击输入框清空按钮时，显示 【搜索历史】
      // 用户点击热搜列表 item || 用户点击搜索历史 || 用户按下搜索键，显示 【搜索结果】
      showType: HOT_LIST
    };
  },
  created() {
    this.loadDefaultText();
  },
  methods: {
    ...common_vendor.mapMutations("search", ["addSearchData"]),
    onSearchConfirm(val) {
      this.searchVal = val ? val : this.defaultText;
      this.addSearchData(this.searchVal);
      if (this.searchVal) {
        this.showType = SEARCH_RESULT;
      }
    },
    onSearchFocus(val) {
      this.showType = SEARCH_HISTORY;
    },
    onSearchBlur(val) {
    },
    onSearchClear() {
      this.showType = SEARCH_HISTORY;
    },
    onSearchCancel(val) {
      this.showType = HOT_LIST;
    },
    loadDefaultText() {
      var that = this;
      common_vendor.index$1.request({
        url: "http://127.0.0.1:4523/m1/4393965-4038352-default/search/default-text",
        success(res) {
          that.defaultText = res.data.defaultText;
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_my_search2 = common_vendor.resolveComponent("my-search");
  const _easycom_search_hot_list2 = common_vendor.resolveComponent("search-hot-list");
  const _easycom_search_history2 = common_vendor.resolveComponent("search-history");
  const _easycom_search_result_list2 = common_vendor.resolveComponent("search-result-list");
  (_easycom_my_search2 + _easycom_search_hot_list2 + _easycom_search_history2 + _easycom_search_result_list2)();
}
const _easycom_my_search = () => "../../components/my-search/my-search.js";
const _easycom_search_hot_list = () => "../../components/search-hot-list/search-hot-list.js";
const _easycom_search_history = () => "../../components/search-history/search-history.js";
const _easycom_search_result_list = () => "../../components/search-result-list/search-result-list.js";
if (!Math) {
  (_easycom_my_search + _easycom_search_hot_list + _easycom_search_history + _easycom_search_result_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.onSearchConfirm),
    b: common_vendor.o($options.onSearchFocus),
    c: common_vendor.o($options.onSearchBlur),
    d: common_vendor.o($options.onSearchClear),
    e: common_vendor.o($options.onSearchCancel),
    f: common_vendor.o(($event) => $data.searchVal = $event),
    g: common_vendor.p({
      isShowInput: true,
      placeholderText: $data.defaultText,
      config: {
        backgroundColor: "#f1f0f3"
      },
      modelValue: $data.searchVal
    }),
    h: $data.showType === $data.HOT_LIST
  }, $data.showType === $data.HOT_LIST ? {
    i: common_vendor.o($options.onSearchConfirm)
  } : $data.showType === $data.SEARCH_HISTORY ? {
    k: common_vendor.o($options.onSearchConfirm)
  } : {
    l: common_vendor.sr("mescrollItem", "45052d9f-3"),
    m: common_vendor.p({
      queryStr: $data.searchVal
    })
  }, {
    j: $data.showType === $data.SEARCH_HISTORY
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-45052d9f"], ["__file", "F:/uniapp-project/search-uniapp/subpkg/pages/search-blog.vue"]]);
wx.createPage(MiniProgramPage);
