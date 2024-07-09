"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "my-search",
  props: {
    placeholderText: {
      type: String,
      default: "搜索"
    },
    isShowInput: {
      type: Boolean,
      default: false
    },
    // 搜索框配置对象
    config: {
      type: Object,
      default: () => ({
        height: 36,
        backgroundColor: "#fffff",
        icon: "/static/images/search.png",
        textColor: "#454545",
        border: "1px solid #f94d2a"
      })
    },
    modelValue: {
      type: String
    }
  },
  data() {
    return {};
  },
  methods: {
    // 点击搜索按钮触发
    onSearch() {
      this.$emit("search", this.modelValue);
    },
    // 获取焦点
    onFocus() {
      this.$emit("focus", this.modelValue);
    },
    // 失去焦点
    onBlur() {
      this.$emit("blur", this.modelValue);
    },
    // 点击搜索框中清空按钮
    onClear() {
      this.$emit("clear", this.modelValue);
    },
    // 点击取消按钮
    onCancel() {
      this.$emit("cancel", this.modelValue);
    },
    // value改变
    onInput(val) {
      this.$emit("update:modelValue", val);
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  (_easycom_uni_icons2 + _easycom_uni_search_bar2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_search_bar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.isShowInput
  }, $props.isShowInput ? {
    b: common_vendor.p({
      type: "clear",
      color: "#999999"
    }),
    c: common_vendor.o($options.onSearch),
    d: common_vendor.o($options.onFocus),
    e: common_vendor.o($options.onBlur),
    f: common_vendor.o($options.onClear),
    g: common_vendor.o($options.onCancel),
    h: common_vendor.o($options.onInput),
    i: common_vendor.p({
      radius: 100,
      bgColor: $props.config.backgroundColor,
      placeholder: $props.placeholderText,
      value: $props.modelValue
    })
  } : {
    j: $props.config.icon,
    k: common_vendor.t($props.placeholderText),
    l: $props.config.textColor,
    m: $props.config.height + "px",
    n: $props.config.backgroundColor,
    o: $props.config.border
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-cd45b42a"], ["__file", "F:/uniapp-project/search-uniapp/components/my-search/my-search.vue"]]);
wx.createComponent(Component);
