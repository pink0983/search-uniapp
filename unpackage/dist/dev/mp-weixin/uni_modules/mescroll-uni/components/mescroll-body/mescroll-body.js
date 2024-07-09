"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_mescrollUni_components_mescrollUni_mescrollUni = require("../mescroll-uni/mescroll-uni.js");
const uni_modules_mescrollUni_components_mescrollUni_mescrollUniOption = require("../mescroll-uni/mescroll-uni-option.js");
const uni_modules_mescrollUni_components_mescrollUni_mescrollI18n = require("../mescroll-uni/mescroll-i18n.js");
const uni_modules_mescrollUni_components_mescrollUni_wxs_mixins = require("../mescroll-uni/wxs/mixins.js");
const block0 = (Component2) => {
  if (!Component2.wxsCallMethods) {
    Component2.wxsCallMethods = [];
  }
  Component2.wxsCallMethods.push("wxsCall");
};
const MescrollTop = () => "../mescroll-uni/components/mescroll-top.js";
const _sfc_main = {
  name: "mescroll-body",
  mixins: [uni_modules_mescrollUni_components_mescrollUni_wxs_mixins.WxsMixin],
  components: {
    MescrollTop
  },
  props: {
    down: Object,
    up: Object,
    i18n: Object,
    top: [String, Number],
    topbar: [Boolean, String],
    bottom: [String, Number],
    safearea: Boolean,
    height: [String, Number],
    bottombar: {
      type: Boolean,
      default: true
    },
    sticky: Boolean
  },
  data() {
    return {
      mescroll: { optDown: {}, optUp: {} },
      // mescroll实例
      downHight: 0,
      //下拉刷新: 容器高度
      downRate: 0,
      // 下拉比率(inOffset: rate<1; outOffset: rate>=1)
      downLoadType: 0,
      // 下拉刷新状态: 0(loading前), 1(inOffset), 2(outOffset), 3(showLoading), 4(endDownScroll)
      upLoadType: 0,
      // 上拉加载状态：0（loading前），1（loading中），2（没有更多了,显示END文本提示），3（没有更多了,不显示END文本提示）
      isShowEmpty: false,
      // 是否显示空布局
      isShowToTop: false,
      // 是否显示回到顶部按钮
      windowHeight: 0,
      // 可使用窗口的高度
      windowBottom: 0,
      // 可使用窗口的底部位置
      statusBarHeight: 0
      // 状态栏高度
    };
  },
  computed: {
    // mescroll最小高度,默认windowHeight,使列表不满屏仍可下拉
    minHeight() {
      return this.toPx(this.height || "100%") + "px";
    },
    // 下拉布局往下偏移的距离 (px)
    numTop() {
      return this.toPx(this.top);
    },
    padTop() {
      return this.numTop + "px";
    },
    // 上拉布局往上偏移 (px)
    numBottom() {
      return this.toPx(this.bottom);
    },
    padBottom() {
      return this.numBottom + "px";
    },
    // 是否为重置下拉的状态
    isDownReset() {
      return this.downLoadType === 3 || this.downLoadType === 4;
    },
    // 过渡
    transition() {
      return this.isDownReset ? "transform 300ms" : "";
    },
    translateY() {
      return this.downHight > 0 ? "translateY(" + this.downHight + "px)" : "";
    },
    // 是否在加载中
    isDownLoading() {
      return this.downLoadType === 3;
    },
    // 旋转的角度
    downRotate() {
      return "rotate(" + 360 * this.downRate + "deg)";
    },
    // 文本提示
    downText() {
      if (!this.mescroll)
        return "";
      switch (this.downLoadType) {
        case 1:
          return this.mescroll.optDown.textInOffset;
        case 2:
          return this.mescroll.optDown.textOutOffset;
        case 3:
          return this.mescroll.optDown.textLoading;
        case 4:
          return this.mescroll.isDownEndSuccess ? this.mescroll.optDown.textSuccess : this.mescroll.isDownEndSuccess == false ? this.mescroll.optDown.textErr : this.mescroll.optDown.textInOffset;
        default:
          return this.mescroll.optDown.textInOffset;
      }
    }
  },
  methods: {
    //number,rpx,upx,px,% --> px的数值
    toPx(num) {
      if (typeof num === "string") {
        if (num.indexOf("px") !== -1) {
          if (num.indexOf("rpx") !== -1) {
            num = num.replace("rpx", "");
          } else if (num.indexOf("upx") !== -1) {
            num = num.replace("upx", "");
          } else {
            return Number(num.replace("px", ""));
          }
        } else if (num.indexOf("%") !== -1) {
          let rate = Number(num.replace("%", "")) / 100;
          return this.windowHeight * rate;
        }
      }
      return num ? common_vendor.index$1.upx2px(Number(num)) : 0;
    },
    // 点击空布局的按钮回调
    emptyClick() {
      this.$emit("emptyclick", this.mescroll);
    },
    // 点击回到顶部的按钮回调
    toTopClick() {
      this.mescroll.scrollTo(0, this.mescroll.optUp.toTop.duration);
      this.$emit("topclick", this.mescroll);
    }
  },
  // 使用created初始化mescroll对象; 如果用mounted部分css样式编译到H5会失效
  created() {
    let vm = this;
    let diyOption = {
      // 下拉刷新的配置
      down: {
        inOffset() {
          vm.downLoadType = 1;
        },
        outOffset() {
          vm.downLoadType = 2;
        },
        onMoving(mescroll, rate, downHight) {
          vm.downHight = downHight;
          vm.downRate = rate;
        },
        showLoading(mescroll, downHight) {
          vm.downLoadType = 3;
          vm.downHight = downHight;
        },
        beforeEndDownScroll(mescroll) {
          vm.downLoadType = 4;
          return mescroll.optDown.beforeEndDelay;
        },
        endDownScroll() {
          vm.downLoadType = 4;
          vm.downHight = 0;
          if (vm.downResetTimer) {
            clearTimeout(vm.downResetTimer);
            vm.downResetTimer = null;
          }
          vm.downResetTimer = setTimeout(() => {
            if (vm.downLoadType === 4)
              vm.downLoadType = 0;
          }, 300);
        },
        // 派发下拉刷新的回调
        callback: function(mescroll) {
          vm.$emit("down", mescroll);
        }
      },
      // 上拉加载的配置
      up: {
        // 显示加载中的回调
        showLoading() {
          vm.upLoadType = 1;
        },
        // 显示无更多数据的回调
        showNoMore() {
          vm.upLoadType = 2;
        },
        // 隐藏上拉加载的回调
        hideUpScroll(mescroll) {
          vm.upLoadType = mescroll.optUp.hasNext ? 0 : 3;
        },
        // 空布局
        empty: {
          onShow(isShow) {
            vm.isShowEmpty = isShow;
          }
        },
        // 回到顶部
        toTop: {
          onShow(isShow) {
            vm.isShowToTop = isShow;
          }
        },
        // 派发上拉加载的回调
        callback: function(mescroll) {
          vm.$emit("up", mescroll);
        }
      }
    };
    let i18nType = uni_modules_mescrollUni_components_mescrollUni_mescrollI18n.mescrollI18n.getType();
    let i18nOption = { type: i18nType };
    uni_modules_mescrollUni_components_mescrollUni_mescrollUni.MeScroll.extend(i18nOption, vm.i18n);
    uni_modules_mescrollUni_components_mescrollUni_mescrollUni.MeScroll.extend(i18nOption, uni_modules_mescrollUni_components_mescrollUni_mescrollUniOption.GlobalOption.i18n);
    uni_modules_mescrollUni_components_mescrollUni_mescrollUni.MeScroll.extend(diyOption, i18nOption[i18nType]);
    uni_modules_mescrollUni_components_mescrollUni_mescrollUni.MeScroll.extend(diyOption, { down: uni_modules_mescrollUni_components_mescrollUni_mescrollUniOption.GlobalOption.down, up: uni_modules_mescrollUni_components_mescrollUni_mescrollUniOption.GlobalOption.up });
    let myOption = JSON.parse(JSON.stringify({ down: vm.down, up: vm.up }));
    uni_modules_mescrollUni_components_mescrollUni_mescrollUni.MeScroll.extend(myOption, diyOption);
    vm.mescroll = new uni_modules_mescrollUni_components_mescrollUni_mescrollUni.MeScroll(myOption, true);
    vm.mescroll.i18n = i18nOption;
    vm.$emit("init", vm.mescroll);
    const sys = common_vendor.index$1.getSystemInfoSync();
    if (sys.windowHeight)
      vm.windowHeight = sys.windowHeight;
    if (sys.windowBottom)
      vm.windowBottom = sys.windowBottom;
    if (sys.statusBarHeight)
      vm.statusBarHeight = sys.statusBarHeight;
    vm.mescroll.setBodyHeight(sys.windowHeight);
    vm.mescroll.resetScrollTo((y, t) => {
      if (typeof y === "string") {
        setTimeout(() => {
          let selector;
          if (y.indexOf("#") == -1 && y.indexOf(".") == -1) {
            selector = "#" + y;
          } else {
            selector = y;
          }
          common_vendor.index$1.createSelectorQuery().select(selector).boundingClientRect(function(rect) {
            if (rect) {
              let top = rect.top;
              top += vm.mescroll.getScrollTop();
              common_vendor.index$1.pageScrollTo({
                scrollTop: top,
                duration: t
              });
            } else {
              console.error(selector + " does not exist");
            }
          }).exec();
        }, 30);
      } else {
        common_vendor.index$1.pageScrollTo({
          scrollTop: y,
          duration: t
        });
      }
    });
    if (vm.up && vm.up.toTop && vm.up.toTop.safearea != null)
      ;
    else {
      vm.mescroll.optUp.toTop.safearea = vm.safearea;
    }
    common_vendor.index$1.$on("setMescrollGlobalOption", (options) => {
      if (!options)
        return;
      let i18nType2 = options.i18n ? options.i18n.type : null;
      if (i18nType2 && vm.mescroll.i18n.type != i18nType2) {
        vm.mescroll.i18n.type = i18nType2;
        uni_modules_mescrollUni_components_mescrollUni_mescrollI18n.mescrollI18n.setType(i18nType2);
        uni_modules_mescrollUni_components_mescrollUni_mescrollUni.MeScroll.extend(options, vm.mescroll.i18n[i18nType2]);
      }
      if (options.down) {
        let down = uni_modules_mescrollUni_components_mescrollUni_mescrollUni.MeScroll.extend({}, options.down);
        vm.mescroll.optDown = uni_modules_mescrollUni_components_mescrollUni_mescrollUni.MeScroll.extend(down, vm.mescroll.optDown);
      }
      if (options.up) {
        let up = uni_modules_mescrollUni_components_mescrollUni_mescrollUni.MeScroll.extend({}, options.up);
        vm.mescroll.optUp = uni_modules_mescrollUni_components_mescrollUni_mescrollUni.MeScroll.extend(up, vm.mescroll.optUp);
      }
    });
  },
  destroyed() {
    common_vendor.index$1.$off("setMescrollGlobalOption");
  }
};
if (!Array) {
  const _easycom_mescroll_empty2 = common_vendor.resolveComponent("mescroll-empty");
  const _component_mescroll_top = common_vendor.resolveComponent("mescroll-top");
  (_easycom_mescroll_empty2 + _component_mescroll_top)();
}
const _easycom_mescroll_empty = () => "../mescroll-empty/mescroll-empty.js";
if (!Math) {
  _easycom_mescroll_empty();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.topbar && $data.statusBarHeight
  }, $props.topbar && $data.statusBarHeight ? {
    b: $data.statusBarHeight + "px",
    c: $props.topbar
  } : {}, {
    d: $data.mescroll.optDown.use
  }, $data.mescroll.optDown.use ? {
    e: $options.isDownLoading ? 1 : "",
    f: $data.mescroll.optDown.textColor,
    g: $options.downRotate,
    h: common_vendor.t($options.downText),
    i: $data.mescroll.optDown.bgColor,
    j: $data.mescroll.optDown.textColor
  } : {}, {
    k: $data.isShowEmpty
  }, $data.isShowEmpty ? {
    l: common_vendor.o($options.emptyClick),
    m: common_vendor.p({
      option: $data.mescroll.optUp.empty
    })
  } : {}, {
    n: $data.mescroll.optUp.use && !$options.isDownLoading && $data.upLoadType !== 3
  }, $data.mescroll.optUp.use && !$options.isDownLoading && $data.upLoadType !== 3 ? common_vendor.e({
    o: $data.mescroll.optUp.textColor,
    p: common_vendor.t($data.mescroll.optUp.textLoading),
    q: $data.upLoadType === 1,
    r: $data.upLoadType === 2
  }, $data.upLoadType === 2 ? {
    s: common_vendor.t($data.mescroll.optUp.textNoMore)
  } : {}, {
    t: $data.mescroll.optUp.bgColor,
    v: $data.mescroll.optUp.textColor
  }) : {}, {
    w: $options.translateY,
    x: $options.transition,
    y: _ctx.callProp,
    z: $props.safearea
  }, $props.safearea ? {} : {}, {
    A: common_vendor.o($options.toTopClick),
    B: common_vendor.o(($event) => $data.isShowToTop = $event),
    C: common_vendor.p({
      option: $data.mescroll.optUp.toTop,
      modelValue: $data.isShowToTop
    }),
    D: _ctx.renderBiz.propObserver,
    E: _ctx.wxsProp,
    F: $props.sticky ? 1 : "",
    G: $options.minHeight,
    H: $options.padTop,
    I: $options.padBottom,
    J: _ctx.wxsProp
  });
}
if (typeof block0 === "function")
  block0(_sfc_main);
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/uniapp-project/search-uniapp/uni_modules/mescroll-uni/components/mescroll-body/mescroll-body.vue"]]);
wx.createComponent(Component);
