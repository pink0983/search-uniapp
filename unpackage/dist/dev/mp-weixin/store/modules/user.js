"use strict";
const common_vendor = require("../../common/vendor.js");
const TOKEN_KEY = "token";
const USER_INFO_KEY = "user-info";
const user = {
  namespaced: true,
  state: {
    token: common_vendor.index$1.getStorageSync(TOKEN_KEY) || "",
    userInfo: common_vendor.index$1.getStorageSync(USER_INFO_KEY) || {}
  },
  mutations: {
    // 把数据保存到vuex
    setToken(state, token) {
      state.token = token, this.commit("user/saveToToken");
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo, this.commit("user/saveToUserInfo");
    },
    // 把vuex的数据保存到本地
    saveToToken(state) {
      common_vendor.index$1.setStorage({
        key: TOKEN_KEY,
        data: state.token
      });
    },
    saveToUserInfo(state) {
      common_vendor.index$1.setStorage({
        key: USER_INFO_KEY,
        data: state.userInfo
      });
    },
    removeToken(state) {
      state.token = "";
      this.commit("user/saveToToken");
    },
    removeUserInfo(state) {
      state.userInfo = {};
      this.commit("user/saveToUserInfo");
    }
  },
  actions: {
    login(context, userProfile) {
      const userInfo = userProfile.userInfo;
      var that = this;
      common_vendor.index$1.request({
        url: "http://127.0.0.1:4523/m1/4393965-4038352-default/sys/login",
        method: "POST",
        data: {
          signature: userProfile.signature,
          iv: userProfile.iv,
          nickName: userInfo.nickName,
          gender: userInfo.gender,
          city: userInfo.gender,
          province: userInfo.province,
          avatarUrl: userInfo.avatarUrl
        },
        success(res) {
          that.commit("user/setToken", res.data.token);
          that.commit("user/setUserInfo", userInfo);
        }
      });
    },
    logout(context) {
      this.commit("user/removeToken");
      this.commit("user/removeUserInfo");
    },
    /**
     * 进行登录判定
     */
    async isLogin(context) {
      if (context.state.token)
        return true;
      const res = await common_vendor.index$1.showModal({
        title: "登录之后才可以进行后续操作",
        content: "立即跳转到登录页面？（登录后回自动返回当前页面哦~~~）"
      });
      const { cancel, confirm } = res;
      if (confirm) {
        common_vendor.index$1.navigateTo({
          url: "/subpkg/pages/login-page/login-page"
        });
      }
      return false;
    }
  }
};
exports.user = user;
