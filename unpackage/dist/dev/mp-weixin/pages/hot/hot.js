"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      tabData: [],
      // tab激活项
      currentIndex: 0,
      isLoading: true,
      // 以index为key,对应的list为value
      listData: {},
      // 当前swiper高度
      currentSwiperHeight: 0,
      // 缓存高度的计算结果
      swiperHeightData: {},
      // 当前页面滚动距离
      currentPageScrollTop: 0
    };
  },
  // 组件实例配置完成,但Dom未被渲染,进行网络请求,配置响应式数据
  created() {
    this.loadHotTabs();
  },
  // 监听页面滚动事件
  onPageScroll(res) {
    this.currentPageScrollTop = res.scrollTop;
  },
  methods: {
    // 获取热搜文章类型
    loadHotTabs() {
      common_vendor.index$1.request({
        url: "http://127.0.0.1:4523/m1/4393965-4038352-default/hot/tab",
        success: (res) => {
          this.tabData = res.data.list;
          this.loadHotListFromTab();
        },
        fail: (err) => {
          console.log(err);
        }
      });
    },
    // tab栏点击事件
    onTabClick(index) {
      this.currentIndex = index;
    },
    onToSearch() {
      common_vendor.index$1.navigateTo({
        url: "/subpkg/pages/search-blog"
      });
    },
    getHotListFromTabType(type) {
      common_vendor.index$1.request({
        url: "http://127.0.0.1:4523/m1/4393965-4038352-default/hot/list",
        data: {
          type
        },
        success: (res) => {
          this.listData[this.currentIndex] = res.data.list;
          this.isLoading = false;
        },
        fail: (err) => {
        }
      });
    },
    // 获取list列表数据
    loadHotListFromTab() {
      if (!this.listData[this.currentIndex]) {
        this.isLoading = true;
        const id = this.tabData[this.currentIndex].id;
        this.getHotListFromTabType(id);
        setTimeout(() => {
          this.currentSwiperHeight = this.getCurrentSwiperHeight();
          this.swiperHeightData[this.currentIndex] = this.currentSwiperHeight;
        }, 0);
      }
    },
    // 获取swiper高度
    getCurrentSwiperHeight() {
      return new Promise((resolve, reject) => {
        let sum = 0;
        const query = common_vendor.index$1.createSelectorQuery().in(this);
        query.selectAll(`.hot-list-item-${this.currentIndex}`).boundingClientRect((res) => {
          res.forEach((item) => {
            sum += item.height;
          });
          resolve(sum);
        }).exec();
      });
    },
    // 监听swiper切换 tab跟着切换
    onSwiperChange(e) {
      if (this.currentPageScrollTop > 130) {
        common_vendor.index$1.pageScrollTo({
          scrollTop: 130
        });
      }
      this.currentIndex = e.detail.current;
    },
    // 动画完成
    onSwiperEnd() {
      if (!this.listData[this.currentIndex]) {
        this.loadHotListFromTab();
        return;
      }
      this.currentSwiperHeight = this.swiperHeightData[this.currentIndex];
    },
    // 热搜列表item点击事件
    onItemClick(item) {
      common_vendor.index$1.navigateTo({
        url: `/subpkg/pages/blog-detail/blog-detail?author=${item.user_name}&articleId=${item.id}`
      });
    }
  }
};
if (!Array) {
  const _easycom_my_search2 = common_vendor.resolveComponent("my-search");
  const _easycom_my_tabs2 = common_vendor.resolveComponent("my-tabs");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_hot_list_item2 = common_vendor.resolveComponent("hot-list-item");
  (_easycom_my_search2 + _easycom_my_tabs2 + _easycom_uni_load_more2 + _easycom_hot_list_item2)();
}
const _easycom_my_search = () => "../../components/my-search/my-search.js";
const _easycom_my_tabs = () => "../../components/my-tabs/my-tabs.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_hot_list_item = () => "../../components/hot-list-item/hot-list-item.js";
if (!Math) {
  (_easycom_my_search + _easycom_my_tabs + _easycom_uni_load_more + _easycom_hot_list_item)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      placeholderText: "uni-app"
    }),
    b: common_vendor.o((...args) => $options.onToSearch && $options.onToSearch(...args)),
    c: common_vendor.o(($event) => $options.onTabClick()),
    d: common_vendor.p({
      tabData: $data.tabData,
      defaultIndex: $data.currentIndex,
      config: {
        textColor: "#333333"
      }
    }),
    e: common_vendor.f($data.tabData, (tabItem, tabIndex, i0) => {
      return common_vendor.e($data.isLoading ? {
        a: "4aaa739e-2-" + i0,
        b: common_vendor.p({
          status: "loading"
        })
      } : {
        c: common_vendor.f($data.listData[tabIndex], (item, index, i1) => {
          return {
            a: index,
            b: common_vendor.o(($event) => $options.onItemClick(item), index),
            c: "4aaa739e-3-" + i0 + "-" + i1,
            d: common_vendor.p({
              data: item,
              ranking: index + 1
            })
          };
        }),
        d: common_vendor.n("hot-list-item-" + tabIndex)
      }, {
        e: tabIndex
      });
    }),
    f: $data.isLoading,
    g: $data.currentIndex,
    h: $data.currentSwiperHeight + "px",
    i: common_vendor.o((...args) => $options.onSwiperEnd && $options.onSwiperEnd(...args)),
    j: common_vendor.o((...args) => $options.onSwiperChange && $options.onSwiperChange(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4aaa739e"], ["__file", "F:/uniapp-project/search-uniapp/pages/hot/hot.vue"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
