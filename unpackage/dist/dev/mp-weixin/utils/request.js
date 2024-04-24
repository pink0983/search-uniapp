"use strict";
const common_vendor = require("../common/vendor.js");
const BASE_URL = "http://localhost:8080";
function request({ url, data, method }) {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: BASE_URL + url,
      data,
      method,
      success: ({ data: data2, statusCode, header }) => {
        if (data2.success) {
          resolve(data2);
        } else {
          common_vendor.index.showToast({
            title: data2.message,
            icon: "none",
            mask: true,
            duration: 3e3
          });
          reject(data2.message);
        }
      },
      fali: (error) => {
        reject(error);
      }
    });
  });
}
exports.request = request;
