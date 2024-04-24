"use strict";
const utils_request = require("../utils/request.js");
function getHotTabs() {
  return utils_request.request({
    url: "/hot/tabs"
  });
}
exports.getHotTabs = getHotTabs;
