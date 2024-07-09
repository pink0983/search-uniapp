"use strict";
const common_vendor = require("../common/vendor.js");
const store_modules_search = require("./modules/search.js");
const store_modules_user = require("./modules/user.js");
const store_modules_video = require("./modules/video.js");
const store = new common_vendor.index.Store({
  modules: {
    // 注册模块
    search: store_modules_search.search,
    user: store_modules_user.user,
    video: store_modules_video.video
  }
});
exports.store = store;
