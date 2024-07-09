"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_mescrollUni_components_mescrollUni_mescrollMixins = require("../../uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js");
const _sfc_main = {
  name: "search-result-list",
  // 3. 注册 mixins
  mixins: [uni_modules_mescrollUni_components_mescrollUni_mescrollMixins.MescrollMixin],
  props: {
    queryStr: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      page: 1,
      resultList: [],
      mescroll: null,
      // 处理渲染，会回调 down和up 方法，为了避免该问题，定义 init 变量，表示当前是否为首次请求
      isInit: true,
      // 是否无数据
      isEmpty: false
    };
  },
  created() {
    this.loadSearchResult();
  },
  // 页面渲染完成之后回调，想要获取组件实例，需要在该回调中进行
  mounted() {
    this.mescroll = this.$refs.mescrollRef.mescroll;
  },
  methods: {
    loadSearchResult() {
      var that = this;
      common_vendor.index$1.request({
        data: {
          q: this.queryStr,
          p: this.page
        },
        url: "http://127.0.0.1:4523/m1/4393965-4038352-default/search",
        success(res) {
          res.data.list.forEach((item) => {
            item.title = item.title.replace(/<em>/g, "<em style='color:#f94d2a; margin:0 2px'>");
            item.description = item.description.replace(
              /<em>/g,
              "<em style='color:#f94d2a; margin:0 2px'>"
            );
          });
          if (that.page === 1) {
            that.resultList = res.data.list;
          } else {
            that.resultList = [...that.resultList, ...res.data.list];
          }
          if (that.resultList.length === 0) {
            that.isEmpty = true;
          }
        }
      });
    },
    // 4. 实现三个回调方法
    /**
     * List 组件的首次加载
     */
    mescrollInit() {
      this.loadSearchResult();
      this.isInit = false;
      if (this.mescroll !== null) {
        this.mescroll.endSuccess();
      }
    },
    /**
     * 下拉刷新的回调
     */
    downCallback() {
      if (this.isInit)
        return;
      this.page = 1;
      this.loadSearchResult();
      if (this.mescroll !== null) {
        this.mescroll.endSuccess();
      }
    },
    /**
     * 上拉加载的回调
     */
    upCallback() {
      if (this.isInit)
        return;
      this.page += 1;
      this.loadSearchResult();
      if (this.mescroll !== null) {
        this.mescroll.endSuccess();
      }
    },
    onItemClick(item) {
      common_vendor.index$1.navigateTo({
        url: `/subpkg/pages/blog-detail/blog-detail?author=${item.other}&articleId=${item.id}`
      });
    }
  }
};
if (!Array) {
  const _easycom_empty_data2 = common_vendor.resolveComponent("empty-data");
  const _easycom_search_result_item_theme_12 = common_vendor.resolveComponent("search-result-item-theme-1");
  const _easycom_search_result_item_theme_22 = common_vendor.resolveComponent("search-result-item-theme-2");
  const _easycom_search_result_item_theme_32 = common_vendor.resolveComponent("search-result-item-theme-3");
  const _easycom_mescroll_body2 = common_vendor.resolveComponent("mescroll-body");
  (_easycom_empty_data2 + _easycom_search_result_item_theme_12 + _easycom_search_result_item_theme_22 + _easycom_search_result_item_theme_32 + _easycom_mescroll_body2)();
}
const _easycom_empty_data = () => "../empty-data/empty-data.js";
const _easycom_search_result_item_theme_1 = () => "../search-result-item-theme-1/search-result-item-theme-1.js";
const _easycom_search_result_item_theme_2 = () => "../search-result-item-theme-2/search-result-item-theme-2.js";
const _easycom_search_result_item_theme_3 = () => "../search-result-item-theme-3/search-result-item-theme-3.js";
const _easycom_mescroll_body = () => "../../uni_modules/mescroll-uni/components/mescroll-body/mescroll-body.js";
if (!Math) {
  (_easycom_empty_data + _easycom_search_result_item_theme_1 + _easycom_search_result_item_theme_2 + _easycom_search_result_item_theme_3 + _easycom_mescroll_body)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.isEmpty
  }, $data.isEmpty ? {} : {
    b: common_vendor.f($data.resultList, (item, index, i0) => {
      return common_vendor.e({
        a: !item.pic_list || item.pic_list.length === 0
      }, !item.pic_list || item.pic_list.length === 0 ? {
        b: "3fdbabd5-2-" + i0 + ",3fdbabd5-1",
        c: common_vendor.p({
          data: item
        })
      } : item.pic_list.length === 1 ? {
        e: "3fdbabd5-3-" + i0 + ",3fdbabd5-1",
        f: common_vendor.p({
          data: item
        })
      } : {
        g: "3fdbabd5-4-" + i0 + ",3fdbabd5-1",
        h: common_vendor.p({
          data: item
        })
      }, {
        d: item.pic_list.length === 1,
        i: common_vendor.o(($event) => $options.onItemClick(item), index),
        j: index
      });
    }),
    c: common_vendor.sr("mescrollRef", "3fdbabd5-1"),
    d: common_vendor.o($options.mescrollInit),
    e: common_vendor.o($options.downCallback),
    f: common_vendor.o($options.upCallback)
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3fdbabd5"], ["__file", "F:/uniapp-project/search-uniapp/components/search-result-list/search-result-list.vue"]]);
wx.createComponent(Component);
