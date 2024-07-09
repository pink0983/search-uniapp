"use strict";
const common_vendor = require("../../../../common/vendor.js");
function MeScroll(options, isScrollBody) {
  let me = this;
  me.version = "1.3.7";
  me.options = options || {};
  me.isScrollBody = isScrollBody || false;
  me.isDownScrolling = false;
  me.isUpScrolling = false;
  let hasDownCallback = me.options.down && me.options.down.callback;
  me.initDownScroll();
  me.initUpScroll();
  setTimeout(function() {
    if ((me.optDown.use || me.optDown.native) && me.optDown.auto && hasDownCallback) {
      if (me.optDown.autoShowLoading) {
        me.triggerDownScroll();
      } else {
        me.optDown.callback && me.optDown.callback(me);
      }
    }
    if (!me.isUpAutoLoad) {
      setTimeout(function() {
        me.optUp.use && me.optUp.auto && !me.isUpAutoLoad && me.triggerUpScroll();
      }, 100);
    }
  }, 30);
}
MeScroll.prototype.extendDownScroll = function(optDown) {
  MeScroll.extend(optDown, {
    use: true,
    // 是否启用下拉刷新; 默认true
    auto: true,
    // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
    native: false,
    // 是否使用系统自带的下拉刷新; 默认false; 仅mescroll-body生效 (值为true时,还需在pages配置enablePullDownRefresh:true;详请参考mescroll-native的案例)
    autoShowLoading: false,
    // 如果设置auto=true(在初始化完毕之后自动执行下拉刷新的回调),那么是否显示下拉刷新的进度; 默认false
    isLock: false,
    // 是否锁定下拉刷新,默认false;
    offset: 80,
    // 在列表顶部,下拉大于80px,松手即可触发下拉刷新的回调
    startTop: 100,
    // scroll-view快速滚动到顶部时,此时的scroll-top可能大于0, 此值用于控制最大的误差
    inOffsetRate: 1,
    // 在列表顶部,下拉的距离小于offset时,改变下拉区域高度比例;值小于1且越接近0,高度变化越小,表现为越往下越难拉
    outOffsetRate: 0.2,
    // 在列表顶部,下拉的距离大于offset时,改变下拉区域高度比例;值小于1且越接近0,高度变化越小,表现为越往下越难拉
    bottomOffset: 20,
    // 当手指touchmove位置在距离body底部20px范围内的时候结束上拉刷新,避免Webview嵌套导致touchend事件不执行
    minAngle: 45,
    // 向下滑动最少偏移的角度,取值区间  [0,90];默认45度,即向下滑动的角度大于45度则触发下拉;而小于45度,将不触发下拉,避免与左右滑动的轮播等组件冲突;
    textInOffset: "下拉刷新",
    // 下拉的距离在offset范围内的提示文本
    textOutOffset: "释放更新",
    // 下拉的距离大于offset范围的提示文本
    textLoading: "加载中 ...",
    // 加载中的提示文本
    textSuccess: "加载成功",
    // 加载成功的文本
    textErr: "加载失败",
    // 加载失败的文本
    beforeEndDelay: 0,
    // 延时结束的时长 (显示加载成功/失败的时长, android小程序设置此项结束下拉会卡顿, 配置后请注意测试)
    bgColor: "transparent",
    // 背景颜色 (建议在pages.json中再设置一下backgroundColorTop)
    textColor: "gray",
    // 文本颜色 (当bgColor配置了颜色,而textColor未配置时,则textColor会默认为白色)
    inited: null,
    // 下拉刷新初始化完毕的回调
    inOffset: null,
    // 下拉的距离进入offset范围内那一刻的回调
    outOffset: null,
    // 下拉的距离大于offset那一刻的回调
    onMoving: null,
    // 下拉过程中的回调,滑动过程一直在执行; rate下拉区域当前高度与指定距离的比值(inOffset: rate<1; outOffset: rate>=1); downHight当前下拉区域的高度
    beforeLoading: null,
    // 准备触发下拉刷新的回调: 如果return true,将不触发showLoading和callback回调; 常用来完全自定义下拉刷新, 参考案例【淘宝 v6.8.0】
    showLoading: null,
    // 显示下拉刷新进度的回调
    afterLoading: null,
    // 显示下拉刷新进度的回调之后,马上要执行的代码 (如: 在wxs中使用)
    beforeEndDownScroll: null,
    // 准备结束下拉的回调. 返回结束下拉的延时执行时间,默认0ms; 常用于结束下拉之前再显示另外一小段动画,才去隐藏下拉刷新的场景, 参考案例【dotJump】
    endDownScroll: null,
    // 结束下拉刷新的回调
    afterEndDownScroll: null,
    // 结束下拉刷新的回调,马上要执行的代码 (如: 在wxs中使用)
    callback: function(mescroll) {
      mescroll.resetUpScroll();
    }
  });
};
MeScroll.prototype.extendUpScroll = function(optUp) {
  MeScroll.extend(optUp, {
    use: true,
    // 是否启用上拉加载; 默认true
    auto: true,
    // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
    isLock: false,
    // 是否锁定上拉加载,默认false;
    isBoth: true,
    // 上拉加载时,如果滑动到列表顶部是否可以同时触发下拉刷新;默认true,两者可同时触发;
    callback: null,
    // 上拉加载的回调;function(page,mescroll){ }
    page: {
      num: 0,
      // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
      size: 10,
      // 每页数据的数量
      time: null
      // 加载第一页数据服务器返回的时间; 防止用户翻页时,后台新增了数据从而导致下一页数据重复;
    },
    noMoreSize: 5,
    // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
    offset: 150,
    // 距底部多远时,触发upCallback,仅mescroll-uni生效 ( mescroll-body配置的是pages.json的 onReachBottomDistance )
    textLoading: "加载中 ...",
    // 加载中的提示文本
    textNoMore: "-- END --",
    // 没有更多数据的提示文本
    bgColor: "transparent",
    // 背景颜色 (建议在pages.json中再设置一下backgroundColorBottom)
    textColor: "gray",
    // 文本颜色 (当bgColor配置了颜色,而textColor未配置时,则textColor会默认为白色)
    inited: null,
    // 初始化完毕的回调
    showLoading: null,
    // 显示加载中的回调
    showNoMore: null,
    // 显示无更多数据的回调
    hideUpScroll: null,
    // 隐藏上拉加载的回调
    errDistance: 60,
    // endErr的时候需往上滑动一段距离,使其往下滑动时再次触发onReachBottom,仅mescroll-body生效
    toTop: {
      // 回到顶部按钮,需配置src才显示
      src: null,
      // 图片路径,默认null (绝对路径或网络图)
      offset: 1e3,
      // 列表滚动多少距离才显示回到顶部按钮,默认1000
      duration: 300,
      // 回到顶部的动画时长,默认300ms (当值为0或300则使用系统自带回到顶部,更流畅; 其他值则通过step模拟,部分机型可能不够流畅,所以非特殊情况不建议修改此项)
      btnClick: null,
      // 点击按钮的回调
      onShow: null,
      // 是否显示的回调
      zIndex: 9990,
      // fixed定位z-index值
      left: null,
      // 到左边的距离, 默认null. 此项有值时,right不生效. (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
      right: 20,
      // 到右边的距离, 默认20 (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
      bottom: 120,
      // 到底部的距离, 默认120 (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
      safearea: false,
      // bottom的偏移量是否加上底部安全区的距离, 默认false, 需要适配iPhoneX时使用 (具体的界面如果不配置此项,则取本vue的safearea值)
      width: 72,
      // 回到顶部图标的宽度, 默认72 (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
      radius: "50%"
      // 圆角, 默认"50%" (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
    },
    empty: {
      use: true,
      // 是否显示空布局
      icon: null,
      // 图标路径
      tip: "~ 暂无相关数据 ~",
      // 提示
      btnText: "",
      // 按钮
      btnClick: null,
      // 点击按钮的回调
      onShow: null,
      // 是否显示的回调
      fixed: false,
      // 是否使用fixed定位,默认false; 配置fixed为true,以下的top和zIndex才生效 (transform会使fixed失效,最终会降级为absolute)
      top: "100rpx",
      // fixed定位的top值 (完整的单位值,如 "10%"; "100rpx")
      zIndex: 99
      // fixed定位z-index值
    },
    onScroll: false
    // 是否监听滚动事件
  });
};
MeScroll.extend = function(userOption, defaultOption) {
  if (!userOption)
    return defaultOption;
  for (let key in defaultOption) {
    if (userOption[key] == null) {
      let def = defaultOption[key];
      if (def != null && typeof def === "object") {
        userOption[key] = MeScroll.extend({}, def);
      } else {
        userOption[key] = def;
      }
    } else if (typeof userOption[key] === "object") {
      MeScroll.extend(userOption[key], defaultOption[key]);
    }
  }
  return userOption;
};
MeScroll.prototype.hasColor = function(color) {
  if (!color)
    return false;
  let c = color.toLowerCase();
  return c != "#fff" && c != "#ffffff" && c != "transparent" && c != "white";
};
MeScroll.prototype.initDownScroll = function() {
  let me = this;
  me.optDown = me.options.down || {};
  if (!me.optDown.textColor && me.hasColor(me.optDown.bgColor))
    me.optDown.textColor = "#fff";
  me.extendDownScroll(me.optDown);
  if (me.isScrollBody && me.optDown.native) {
    me.optDown.use = false;
  } else {
    me.optDown.native = false;
  }
  me.downHight = 0;
  if (me.optDown.use && me.optDown.inited) {
    setTimeout(function() {
      me.optDown.inited(me);
    }, 0);
  }
};
MeScroll.prototype.touchstartEvent = function(e) {
  if (!this.optDown.use)
    return;
  this.startPoint = this.getPoint(e);
  this.startTop = this.getScrollTop();
  this.startAngle = 0;
  this.lastPoint = this.startPoint;
  this.maxTouchmoveY = this.getBodyHeight() - this.optDown.bottomOffset;
  this.inTouchend = false;
};
MeScroll.prototype.touchmoveEvent = function(e) {
  if (!this.optDown.use)
    return;
  let me = this;
  let scrollTop = me.getScrollTop();
  let curPoint = me.getPoint(e);
  let moveY = curPoint.y - me.startPoint.y;
  if (moveY > 0 && (me.isScrollBody && scrollTop <= 0 || !me.isScrollBody && (scrollTop <= 0 || scrollTop <= me.optDown.startTop && scrollTop === me.startTop))) {
    if (!me.inTouchend && !me.isDownScrolling && !me.optDown.isLock && (!me.isUpScrolling || me.isUpScrolling && me.optUp.isBoth)) {
      if (!me.startAngle)
        me.startAngle = me.getAngle(me.lastPoint, curPoint);
      if (me.startAngle < me.optDown.minAngle)
        return;
      if (me.maxTouchmoveY > 0 && curPoint.y >= me.maxTouchmoveY) {
        me.inTouchend = true;
        me.touchendEvent();
        return;
      }
      me.preventDefault(e);
      let diff = curPoint.y - me.lastPoint.y;
      if (me.downHight < me.optDown.offset) {
        if (me.movetype !== 1) {
          me.movetype = 1;
          me.isDownEndSuccess = null;
          me.optDown.inOffset && me.optDown.inOffset(me);
          me.isMoveDown = true;
        }
        me.downHight += diff * me.optDown.inOffsetRate;
      } else {
        if (me.movetype !== 2) {
          me.movetype = 2;
          me.optDown.outOffset && me.optDown.outOffset(me);
          me.isMoveDown = true;
        }
        if (diff > 0) {
          me.downHight += diff * me.optDown.outOffsetRate;
        } else {
          me.downHight += diff;
        }
      }
      me.downHight = Math.round(me.downHight);
      let rate = me.downHight / me.optDown.offset;
      me.optDown.onMoving && me.optDown.onMoving(me, rate, me.downHight);
    }
  }
  me.lastPoint = curPoint;
};
MeScroll.prototype.touchendEvent = function(e) {
  if (!this.optDown.use)
    return;
  if (this.isMoveDown) {
    if (this.downHight >= this.optDown.offset) {
      this.triggerDownScroll();
    } else {
      this.downHight = 0;
      this.endDownScrollCall(this);
    }
    this.movetype = 0;
    this.isMoveDown = false;
  } else if (!this.isScrollBody && this.getScrollTop() === this.startTop) {
    let isScrollUp = this.getPoint(e).y - this.startPoint.y < 0;
    if (isScrollUp) {
      let angle = this.getAngle(this.getPoint(e), this.startPoint);
      if (angle > 80) {
        this.triggerUpScroll(true);
      }
    }
  }
};
MeScroll.prototype.getPoint = function(e) {
  if (!e) {
    return {
      x: 0,
      y: 0
    };
  }
  if (e.touches && e.touches[0]) {
    return {
      x: e.touches[0].pageX,
      y: e.touches[0].pageY
    };
  } else if (e.changedTouches && e.changedTouches[0]) {
    return {
      x: e.changedTouches[0].pageX,
      y: e.changedTouches[0].pageY
    };
  } else {
    return {
      x: e.clientX,
      y: e.clientY
    };
  }
};
MeScroll.prototype.getAngle = function(p1, p2) {
  let x = Math.abs(p1.x - p2.x);
  let y = Math.abs(p1.y - p2.y);
  let z = Math.sqrt(x * x + y * y);
  let angle = 0;
  if (z !== 0) {
    angle = Math.asin(y / z) / Math.PI * 180;
  }
  return angle;
};
MeScroll.prototype.triggerDownScroll = function() {
  if (this.optDown.beforeLoading && this.optDown.beforeLoading(this))
    ;
  else {
    this.showDownScroll();
    !this.optDown.native && this.optDown.callback && this.optDown.callback(this);
  }
};
MeScroll.prototype.showDownScroll = function() {
  this.isDownScrolling = true;
  if (this.optDown.native) {
    common_vendor.index$1.startPullDownRefresh();
    this.showDownLoadingCall(0);
  } else {
    this.downHight = this.optDown.offset;
    this.showDownLoadingCall(this.downHight);
  }
};
MeScroll.prototype.showDownLoadingCall = function(downHight) {
  this.optDown.showLoading && this.optDown.showLoading(this, downHight);
  this.optDown.afterLoading && this.optDown.afterLoading(this, downHight);
};
MeScroll.prototype.onPullDownRefresh = function() {
  this.isDownScrolling = true;
  this.showDownLoadingCall(0);
  this.optDown.callback && this.optDown.callback(this);
};
MeScroll.prototype.endDownScroll = function() {
  if (this.optDown.native) {
    this.isDownScrolling = false;
    this.endDownScrollCall(this);
    common_vendor.index$1.stopPullDownRefresh();
    return;
  }
  let me = this;
  let endScroll = function() {
    me.downHight = 0;
    me.isDownScrolling = false;
    me.endDownScrollCall(me);
    if (!me.isScrollBody) {
      me.setScrollHeight(0);
      me.scrollTo(0, 0);
    }
  };
  let delay = 0;
  if (me.optDown.beforeEndDownScroll) {
    delay = me.optDown.beforeEndDownScroll(me);
    if (me.isDownEndSuccess == null)
      delay = 0;
  }
  if (typeof delay === "number" && delay > 0) {
    setTimeout(endScroll, delay);
  } else {
    endScroll();
  }
};
MeScroll.prototype.endDownScrollCall = function() {
  this.optDown.endDownScroll && this.optDown.endDownScroll(this);
  this.optDown.afterEndDownScroll && this.optDown.afterEndDownScroll(this);
};
MeScroll.prototype.lockDownScroll = function(isLock) {
  if (isLock == null)
    isLock = true;
  this.optDown.isLock = isLock;
};
MeScroll.prototype.lockUpScroll = function(isLock) {
  if (isLock == null)
    isLock = true;
  this.optUp.isLock = isLock;
};
MeScroll.prototype.initUpScroll = function() {
  let me = this;
  me.optUp = me.options.up || { use: false };
  if (!me.optUp.textColor && me.hasColor(me.optUp.bgColor))
    me.optUp.textColor = "#fff";
  me.extendUpScroll(me.optUp);
  if (me.optUp.use === false)
    return;
  me.optUp.hasNext = true;
  me.startNum = me.optUp.page.num + 1;
  if (me.optUp.inited) {
    setTimeout(function() {
      me.optUp.inited(me);
    }, 0);
  }
};
MeScroll.prototype.onReachBottom = function() {
  if (this.isScrollBody && !this.isUpScrolling) {
    if (!this.optUp.isLock && this.optUp.hasNext) {
      this.triggerUpScroll();
    }
  }
};
MeScroll.prototype.onPageScroll = function(e) {
  if (!this.isScrollBody)
    return;
  this.setScrollTop(e.scrollTop);
  if (e.scrollTop >= this.optUp.toTop.offset) {
    this.showTopBtn();
  } else {
    this.hideTopBtn();
  }
};
MeScroll.prototype.scroll = function(e, onScroll) {
  this.setScrollTop(e.scrollTop);
  this.setScrollHeight(e.scrollHeight);
  if (this.preScrollY == null)
    this.preScrollY = 0;
  this.isScrollUp = e.scrollTop - this.preScrollY > 0;
  this.preScrollY = e.scrollTop;
  this.isScrollUp && this.triggerUpScroll(true);
  if (e.scrollTop >= this.optUp.toTop.offset) {
    this.showTopBtn();
  } else {
    this.hideTopBtn();
  }
  this.optUp.onScroll && onScroll && onScroll();
};
MeScroll.prototype.triggerUpScroll = function(isCheck) {
  if (!this.isUpScrolling && this.optUp.use && this.optUp.callback) {
    if (isCheck === true) {
      let canUp = false;
      if (this.optUp.hasNext && !this.optUp.isLock && !this.isDownScrolling) {
        if (this.getScrollBottom() <= this.optUp.offset) {
          canUp = true;
        }
      }
      if (canUp === false)
        return;
    }
    this.showUpScroll();
    this.optUp.page.num++;
    this.isUpAutoLoad = true;
    this.num = this.optUp.page.num;
    this.size = this.optUp.page.size;
    this.time = this.optUp.page.time;
    this.optUp.callback(this);
  }
};
MeScroll.prototype.showUpScroll = function() {
  this.isUpScrolling = true;
  this.optUp.showLoading && this.optUp.showLoading(this);
};
MeScroll.prototype.showNoMore = function() {
  this.optUp.hasNext = false;
  this.optUp.showNoMore && this.optUp.showNoMore(this);
};
MeScroll.prototype.hideUpScroll = function() {
  this.optUp.hideUpScroll && this.optUp.hideUpScroll(this);
};
MeScroll.prototype.endUpScroll = function(isShowNoMore) {
  if (isShowNoMore != null) {
    if (isShowNoMore) {
      this.showNoMore();
    } else {
      this.hideUpScroll();
    }
  }
  this.isUpScrolling = false;
};
MeScroll.prototype.resetUpScroll = function(isShowLoading) {
  if (this.optUp && this.optUp.use) {
    let page = this.optUp.page;
    this.prePageNum = page.num;
    this.prePageTime = page.time;
    page.num = this.startNum;
    page.time = null;
    if (!this.isDownScrolling && isShowLoading !== false) {
      if (isShowLoading == null) {
        this.removeEmpty();
        this.showUpScroll();
      } else {
        this.showDownScroll();
      }
    }
    this.isUpAutoLoad = true;
    this.num = page.num;
    this.size = page.size;
    this.time = page.time;
    this.optUp.callback && this.optUp.callback(this);
  }
};
MeScroll.prototype.setPageNum = function(num) {
  this.optUp.page.num = num - 1;
};
MeScroll.prototype.setPageSize = function(size) {
  this.optUp.page.size = size;
};
MeScroll.prototype.endByPage = function(dataSize, totalPage, systime) {
  let hasNext;
  if (this.optUp.use && totalPage != null)
    hasNext = this.optUp.page.num < totalPage;
  this.endSuccess(dataSize, hasNext, systime);
};
MeScroll.prototype.endBySize = function(dataSize, totalSize, systime) {
  let hasNext;
  if (this.optUp.use && totalSize != null) {
    let loadSize = (this.optUp.page.num - 1) * this.optUp.page.size + dataSize;
    hasNext = loadSize < totalSize;
  }
  this.endSuccess(dataSize, hasNext, systime);
};
MeScroll.prototype.endSuccess = function(dataSize, hasNext, systime) {
  let me = this;
  if (me.isDownScrolling) {
    me.isDownEndSuccess = true;
    me.endDownScroll();
  }
  if (me.optUp.use) {
    let isShowNoMore;
    if (dataSize != null) {
      let pageNum = me.optUp.page.num;
      let pageSize = me.optUp.page.size;
      if (pageNum === 1) {
        if (systime)
          me.optUp.page.time = systime;
      }
      if (dataSize < pageSize || hasNext === false) {
        me.optUp.hasNext = false;
        if (dataSize === 0 && pageNum === 1) {
          isShowNoMore = false;
          me.showEmpty();
        } else {
          let allDataSize = (pageNum - 1) * pageSize + dataSize;
          if (allDataSize < me.optUp.noMoreSize) {
            isShowNoMore = false;
          } else {
            isShowNoMore = true;
          }
          me.removeEmpty();
        }
      } else {
        isShowNoMore = false;
        me.optUp.hasNext = true;
        me.removeEmpty();
      }
    }
    me.endUpScroll(isShowNoMore);
  }
};
MeScroll.prototype.endErr = function(errDistance) {
  if (this.isDownScrolling) {
    this.isDownEndSuccess = false;
    let page = this.optUp.page;
    if (page && this.prePageNum) {
      page.num = this.prePageNum;
      page.time = this.prePageTime;
    }
    this.endDownScroll();
  }
  if (this.isUpScrolling) {
    this.optUp.page.num--;
    this.endUpScroll(false);
    if (this.isScrollBody && errDistance !== 0) {
      if (!errDistance)
        errDistance = this.optUp.errDistance;
      this.scrollTo(this.getScrollTop() - errDistance, 0);
    }
  }
};
MeScroll.prototype.showEmpty = function() {
  this.optUp.empty.use && this.optUp.empty.onShow && this.optUp.empty.onShow(true);
};
MeScroll.prototype.removeEmpty = function() {
  this.optUp.empty.use && this.optUp.empty.onShow && this.optUp.empty.onShow(false);
};
MeScroll.prototype.showTopBtn = function() {
  if (!this.topBtnShow) {
    this.topBtnShow = true;
    this.optUp.toTop.onShow && this.optUp.toTop.onShow(true);
  }
};
MeScroll.prototype.hideTopBtn = function() {
  if (this.topBtnShow) {
    this.topBtnShow = false;
    this.optUp.toTop.onShow && this.optUp.toTop.onShow(false);
  }
};
MeScroll.prototype.getScrollTop = function() {
  return this.scrollTop || 0;
};
MeScroll.prototype.setScrollTop = function(y) {
  this.scrollTop = y;
};
MeScroll.prototype.scrollTo = function(y, t) {
  this.myScrollTo && this.myScrollTo(y, t);
};
MeScroll.prototype.resetScrollTo = function(myScrollTo) {
  this.myScrollTo = myScrollTo;
};
MeScroll.prototype.getScrollBottom = function() {
  return this.getScrollHeight() - this.getClientHeight() - this.getScrollTop();
};
MeScroll.prototype.getStep = function(star, end, callback, t, rate) {
  let diff = end - star;
  if (t === 0 || diff === 0) {
    callback && callback(end);
    return;
  }
  t = t || 300;
  rate = rate || 30;
  let count = t / rate;
  let step = diff / count;
  let i = 0;
  let timer = setInterval(function() {
    if (i < count - 1) {
      star += step;
      callback && callback(star, timer);
      i++;
    } else {
      callback && callback(end, timer);
      clearInterval(timer);
    }
  }, rate);
};
MeScroll.prototype.getClientHeight = function(isReal) {
  let h = this.clientHeight || 0;
  if (h === 0 && isReal !== true) {
    h = this.getBodyHeight();
  }
  return h;
};
MeScroll.prototype.setClientHeight = function(h) {
  this.clientHeight = h;
};
MeScroll.prototype.getScrollHeight = function() {
  return this.scrollHeight || 0;
};
MeScroll.prototype.setScrollHeight = function(h) {
  this.scrollHeight = h;
};
MeScroll.prototype.getBodyHeight = function() {
  return this.bodyHeight || 0;
};
MeScroll.prototype.setBodyHeight = function(h) {
  this.bodyHeight = h;
};
MeScroll.prototype.preventDefault = function(e) {
  if (e && e.cancelable && !e.defaultPrevented)
    e.preventDefault();
};
exports.MeScroll = MeScroll;
