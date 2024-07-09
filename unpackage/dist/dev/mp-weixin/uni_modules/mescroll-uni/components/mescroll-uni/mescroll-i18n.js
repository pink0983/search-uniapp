"use strict";
const common_vendor = require("../../../../common/vendor.js");
const mescrollI18n = {
  // 默认语言
  def: "zh",
  // 获取当前语言类型
  getType() {
    return common_vendor.index$1.getStorageSync("mescroll-i18n") || this.def;
  },
  // 设置当前语言类型
  setType(type) {
    common_vendor.index$1.setStorageSync("mescroll-i18n", type);
  }
};
exports.mescrollI18n = mescrollI18n;
