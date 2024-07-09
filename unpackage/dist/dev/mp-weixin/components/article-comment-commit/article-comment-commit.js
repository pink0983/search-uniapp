"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "article-comment-commit",
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      value: "",
      bottom: 0
    };
  },
  created() {
    common_vendor.index$1.onKeyboardHeightChange(({ height }) => {
      this.bottom = height;
    });
  },
  methods: {
    /**
     * 发送按钮点击事件
     */
    onBtnClick() {
      var that = this;
      common_vendor.index$1.showLoading({
        title: "加载中"
      });
      common_vendor.index$1.request({
        url: "http://127.0.0.1:4523/m1/4393965-4038352-default/user/article/comment",
        method: "POST",
        data: {
          articleId: that.articleId,
          content: that.value
        },
        success(res) {
          common_vendor.index$1.showToast({
            title: "发表成功",
            icon: "success",
            mask: true
          });
          that.$emit("success", that.value);
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  _easycom_uni_easyinput2();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  _easycom_uni_easyinput();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.value = $event),
    b: common_vendor.p({
      type: "textarea",
      placeholder: "说点什么...",
      maxlength: 50,
      inputBorder: false,
      modelValue: $data.value
    }),
    c: !$data.value,
    d: common_vendor.o((...args) => $options.onBtnClick && $options.onBtnClick(...args)),
    e: $data.bottom + "px"
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ba7f7ecf"], ["__file", "F:/uniapp-project/search-uniapp/components/article-comment-commit/article-comment-commit.vue"]]);
wx.createComponent(Component);
