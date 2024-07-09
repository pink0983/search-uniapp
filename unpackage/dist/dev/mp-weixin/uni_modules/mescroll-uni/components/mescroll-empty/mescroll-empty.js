"use strict";
const uni_modules_mescrollUni_components_mescrollUni_mescrollUniOption = require("../mescroll-uni/mescroll-uni-option.js");
const uni_modules_mescrollUni_components_mescrollUni_mescrollI18n = require("../mescroll-uni/mescroll-i18n.js");
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  props: {
    // empty的配置项: 默认为GlobalOption.up.empty
    option: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  // 使用computed获取配置,用于支持option的动态配置
  computed: {
    // 图标
    icon() {
      if (this.option.icon != null) {
        return this.option.icon;
      } else {
        let i18nType = uni_modules_mescrollUni_components_mescrollUni_mescrollI18n.mescrollI18n.getType();
        if (this.option.i18n) {
          return this.option.i18n[i18nType].icon;
        } else {
          return uni_modules_mescrollUni_components_mescrollUni_mescrollUniOption.GlobalOption.i18n[i18nType].up.empty.icon || uni_modules_mescrollUni_components_mescrollUni_mescrollUniOption.GlobalOption.up.empty.icon;
        }
      }
    },
    // 文本提示
    tip() {
      if (this.option.tip != null) {
        return this.option.tip;
      } else {
        let i18nType = uni_modules_mescrollUni_components_mescrollUni_mescrollI18n.mescrollI18n.getType();
        if (this.option.i18n) {
          return this.option.i18n[i18nType].tip;
        } else {
          return uni_modules_mescrollUni_components_mescrollUni_mescrollUniOption.GlobalOption.i18n[i18nType].up.empty.tip || uni_modules_mescrollUni_components_mescrollUni_mescrollUniOption.GlobalOption.up.empty.tip;
        }
      }
    },
    // 按钮文本
    btnText() {
      if (this.option.i18n) {
        let i18nType = uni_modules_mescrollUni_components_mescrollUni_mescrollI18n.mescrollI18n.getType();
        return this.option.i18n[i18nType].btnText;
      } else {
        return this.option.btnText;
      }
    }
  },
  methods: {
    // 点击按钮
    emptyClick() {
      this.$emit("emptyclick");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $options.icon
  }, $options.icon ? {
    b: $options.icon
  } : {}, {
    c: $options.tip
  }, $options.tip ? {
    d: common_vendor.t($options.tip)
  } : {}, {
    e: $options.btnText
  }, $options.btnText ? {
    f: common_vendor.t($options.btnText),
    g: common_vendor.o((...args) => $options.emptyClick && $options.emptyClick(...args))
  } : {}, {
    h: $props.option.fixed ? 1 : "",
    i: $props.option.zIndex,
    j: $props.option.top
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/uniapp-project/search-uniapp/uni_modules/mescroll-uni/components/mescroll-empty/mescroll-empty.vue"]]);
wx.createComponent(Component);
