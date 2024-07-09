"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  methods: {
    onLoginSuccess() {
      common_vendor.index$1.navigateBack({ delta: 1 });
    }
  }
};
if (!Array) {
  const _easycom_my_login2 = common_vendor.resolveComponent("my-login");
  _easycom_my_login2();
}
const _easycom_my_login = () => "../../../components/my-login/my-login.js";
if (!Math) {
  _easycom_my_login();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.onLoginSuccess)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/uniapp-project/search-uniapp/subpkg/pages/login-page/login-page.vue"]]);
wx.createPage(MiniProgramPage);
