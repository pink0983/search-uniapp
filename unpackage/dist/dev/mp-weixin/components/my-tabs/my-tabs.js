"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "my-tabs",
  props: {
    // 父组件传入的 tabs 数据
    tabData: {
      type: Array,
      default: () => []
    },
    // 默认激活项
    defaultIndex: {
      type: Number,
      default: 0
    },
    // 配置对象
    config: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data: () => {
    return {
      // 内部维护的数据对象，为每个 item 单独额外维护一个 slider 的滑块对象
      tabList: [],
      // 当前激活项的 index
      activeIndex: -1,
      // 滑块对象
      slider: {
        // 距离左侧的距离
        left: 0
      },
      // scrollView 的横向滚动条位置
      scrollLeft: 0,
      // 默认配置
      defaultConfig: {
        // 默认的字体颜色
        textColor: "#333333",
        // 高亮字体颜色
        activeTextColor: "#f94d2a",
        // 下划线宽度 px
        underLineWidth: 24,
        // 下划线高度 px
        underLineHeight: 2,
        // 下划线颜色
        underLineColor: "#f94d2a"
      }
    };
  },
  // 侦听器
  watch: {
    // 侦听数据的变化
    tabData: {
      handler(val) {
        this.tabList = val;
        setTimeout(() => {
          this.updateTabWidth();
        }, 0);
      },
      // 该回调将会在侦听开始之后被立即调用
      immediate: true
    },
    // 监听激活项目的变化
    defaultIndex: {
      handler(val) {
        this.activeIndex = val;
        this.tabToIndex();
      },
      // 该回调将会在侦听开始之后被立即调用
      immediate: true
    },
    // 监听 config
    config: {
      handler(val) {
        this.defaultConfig = { ...this.defaultConfig, ...val };
      },
      // 该回调将会在侦听开始之后被立即调用
      immediate: true
    }
  },
  methods: {
    /**
     * 更新 tab item 的宽度
     */
    updateTabWidth() {
      let data = this.tabList;
      if (data.length == 0)
        return false;
      const query = common_vendor.index.createSelectorQuery().in(this);
      data.forEach((item, index) => {
        query.select("#_tab_" + index).boundingClientRect((res) => {
          item._slider = {
            // 当前的 tab 距离左侧的距离
            left: res.left + (res.width - this.defaultConfig.underLineWidth) / 2
          };
          if (data.length - 1 === index) {
            this.tabToIndex();
          }
        }).exec();
      });
    },
    /**
     * tab 的点击事件处理
     */
    tabClick(index) {
      this.activeIndex = index;
      this.tabToIndex();
      this.$emit("tabClick", index);
    },
    /**
     * 根据当前的 activeIndex 下标，计算 【滑块】 滚动位置
     */
    tabToIndex() {
      if (this.tabList.length === 0)
        return;
      const activeIndex = this.activeIndex;
      this.defaultConfig.underLineWidth;
      this.slider = {
        // TODO：left 如何定义呢？
        // 1. 维护一个单独的数据对象 `tabList`
        // 2. 在 `tabList`  的 `item` 中为一个 `_slider` 属性
        // 3. 该属性保存了 【当前 `item` 下 的滑块位置】
        //    3.1. 计算公式：`滑块左侧位置 = item.left + (item.width - slider.width) / 2`
        left: this.tabList[activeIndex]._slider.left
      };
      this.scrollLeft = this.activeIndex * this.defaultConfig.underLineWidth;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.tabData, (item, index, i0) => {
      return {
        a: common_vendor.t(item.label || item),
        b: _ctx.activeIndex === index ? 1 : "",
        c: common_vendor.o(($event) => _ctx.onTabClick(index), index),
        d: index
      };
    }),
    b: "translateX(" + _ctx.slider.left + "px)",
    c: _ctx.defaultConfig.underLineWidth + "px",
    d: _ctx.defaultConfig.underLineHeight + "px",
    e: _ctx.defaultConfig.underLineColor
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-dba27115"], ["__file", "F:/uniapp-project/search-uniapp/components/my-tabs/my-tabs.vue"]]);
wx.createComponent(Component);
