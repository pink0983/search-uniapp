"use strict";
const WxsMixin = {
  data() {
    return {
      // 传入wxs视图层的数据 (响应式)
      wxsProp: {
        optDown: {},
        // 下拉刷新的配置
        scrollTop: 0,
        // 滚动条的距离
        bodyHeight: 0,
        // body的高度
        isDownScrolling: false,
        // 是否正在下拉刷新中
        isUpScrolling: false,
        // 是否正在上拉加载中
        isScrollBody: true,
        // 是否为mescroll-body滚动
        isUpBoth: true,
        // 上拉加载时,是否同时可以下拉刷新
        t: 0
        // 数据更新的标记 (只有数据更新了,才会触发wxs的Observer)
      },
      // 标记调用wxs视图层的方法
      callProp: {
        callType: "",
        // 方法名
        t: 0
        // 数据更新的标记 (只有数据更新了,才会触发wxs的Observer)
      },
      // 不用wxs的平台使用此处的wxsBiz对象,抹平wxs的写法 (微信小程序和APP使用的wxsBiz对象是./wxs/wxs.wxs)
      // 不用renderjs的平台使用此处的renderBiz对象,抹平renderjs的写法 (app 和 h5 使用的renderBiz对象是./wxs/renderjs.js)
      renderBiz: {
        propObserver() {
        }
        // 抹平renderjs的写法
      }
    };
  },
  methods: {
    // wxs视图层调用逻辑层的回调
    wxsCall(msg) {
      if (msg.type === "setWxsProp") {
        this.wxsProp = {
          optDown: this.mescroll.optDown,
          scrollTop: this.mescroll.getScrollTop(),
          bodyHeight: this.mescroll.getBodyHeight(),
          isDownScrolling: this.mescroll.isDownScrolling,
          isUpScrolling: this.mescroll.isUpScrolling,
          isUpBoth: this.mescroll.optUp.isBoth,
          isScrollBody: this.mescroll.isScrollBody,
          t: Date.now()
        };
      } else if (msg.type === "setLoadType") {
        this.downLoadType = msg.downLoadType;
        this.$set(this.mescroll, "downLoadType", this.downLoadType);
        this.$set(this.mescroll, "isDownEndSuccess", null);
      } else if (msg.type === "triggerDownScroll") {
        this.mescroll.triggerDownScroll();
      } else if (msg.type === "endDownScroll") {
        this.mescroll.endDownScroll();
      } else if (msg.type === "triggerUpScroll") {
        this.mescroll.triggerUpScroll(true);
      }
    }
  },
  mounted() {
    this.mescroll.optDown.afterLoading = () => {
      this.callProp = { callType: "showLoading", t: Date.now() };
    };
    this.mescroll.optDown.afterEndDownScroll = () => {
      this.callProp = { callType: "endDownScroll", t: Date.now() };
      let delay = 300 + (this.mescroll.optDown.beforeEndDelay || 0);
      setTimeout(() => {
        if (this.downLoadType === 4 || this.downLoadType === 0) {
          this.callProp = { callType: "clearTransform", t: Date.now() };
        }
        this.$set(this.mescroll, "downLoadType", this.downLoadType);
      }, delay);
    };
    this.wxsCall({ type: "setWxsProp" });
  }
};
exports.WxsMixin = WxsMixin;
