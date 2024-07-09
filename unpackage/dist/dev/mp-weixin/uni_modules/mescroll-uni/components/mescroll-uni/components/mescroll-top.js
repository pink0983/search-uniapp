"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const _sfc_main = {
  props: {
    // up.toTop的配置项
    option: {
      type: Object,
      default() {
        return {};
      }
    },
    // 是否显示
    value: false,
    // vue2
    modelValue: false
    // vue3
  },
  computed: {
    // 优先显示左边
    left() {
      return this.option.left ? this.addUnit(this.option.left) : "auto";
    },
    // 右边距离 (优先显示左边)
    right() {
      return this.option.left ? "auto" : this.addUnit(this.option.right);
    },
    // 是否显示
    isShow() {
      return this.modelValue;
    }
  },
  methods: {
    addUnit(num) {
      if (!num)
        return 0;
      if (typeof num === "number")
        return num + "rpx";
      return num;
    },
    toTopClick() {
      this.$emit("update:modelValue", false);
      this.$emit("click");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.option.src
  }, $props.option.src ? {
    b: common_vendor.n($options.isShow ? "mescroll-totop-in" : "mescroll-totop-out"),
    c: common_vendor.n({
      "mescroll-totop-safearea": $props.option.safearea
    }),
    d: $props.option.zIndex,
    e: $options.left,
    f: $options.right,
    g: $options.addUnit($props.option.bottom),
    h: $options.addUnit($props.option.width),
    i: $options.addUnit($props.option.radius),
    j: $props.option.src,
    k: common_vendor.o((...args) => $options.toTopClick && $options.toTopClick(...args))
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/uniapp-project/search-uniapp/uni_modules/mescroll-uni/components/mescroll-uni/components/mescroll-top.vue"]]);
wx.createComponent(Component);
