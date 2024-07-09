"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "my-login",
  data() {
    return {};
  },
  computed: {
    ...common_vendor.mapState("user", ["token", "userInfo"])
  },
  methods: {
    ...common_vendor.mapActions("user", ["login", "logout"]),
    /**
     * 获取用户信息
     */
    getUserInfo() {
      common_vendor.index$1.showLoading({
        title: "加载中"
      });
      common_vendor.index$1.getUserProfile({
        desc: "登录后可同步数据",
        success: async (obj) => {
          await this.login(obj);
          this.$emit("onLoginSuccess");
        },
        fail: () => {
          common_vendor.index$1.showToast({
            title: "授权已取消",
            icon: "error",
            mask: true
          });
        },
        complete: () => {
          common_vendor.index$1.hideLoading();
        }
      });
    },
    /**
     * 一键登录
     */
    // async onAutoLogin() {
    //   // 展示加载框
    //   uni.showLoading({
    //     title: '加载中'
    //   });
    //   await this.login({
    //     encryptedData: 'BmGEMqpGI5w',
    //     errMsg: 'getUserProfile:ok',
    //     iv: 'c+NbINO4CuEWCBYGG2FxWw==',
    //     rawData:
    //       '{"nickName":"小慕同学","gender":1,"language":"zh_CN","city":"","province":"","country":"China","avatarUrl":"https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"}',
    //     signature: '449a10f11998daf680fe546a5176e6e2973516ce',
    //     userInfo: { nickName: '小慕同学', gender: 1, language: 'zh_CN', city: '', province: '' }
    //   });
    //   this.$emit('onLoginSuccess');
    //   // 隐藏loading
    //   uni.hideLoading();
    // },
    /**
     * 退出登录
     */
    onLogoutClick() {
      common_vendor.index$1.showModal({
        title: "提示",
        content: "退出登录将无法同步数据哦~",
        success: ({ confirm, cancel }) => {
          if (confirm) {
            this.logout();
          }
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !_ctx.token
  }, !_ctx.token ? {
    b: common_vendor.o((...args) => $options.getUserInfo && $options.getUserInfo(...args))
  } : {
    c: _ctx.userInfo.avatarUrl,
    d: common_vendor.t(_ctx.userInfo.nickName),
    e: common_vendor.o((...args) => $options.onLogoutClick && $options.onLogoutClick(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-675c8a85"], ["__file", "F:/uniapp-project/search-uniapp/components/my-login/my-login.vue"]]);
wx.createComponent(Component);
