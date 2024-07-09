<template>
	<view class="item-container" @click="$emit('click')">
		<view class="item-box">
			<view class="item-box-left">
				<hot-ranking :ranking="ranking"></hot-ranking>
			</view>
			<view class="item-box-right">
				<view class="item-title .line-clamp-2">{{ data.title }}</view>
				<view class="item-desc .line-clamp-2">{{ data.desc }}</view>
				<view class="item-bottom-box">
					<text class="item-author">{{ data.nickname }}</text>
					<view class="hot-box">
						<image class="hot-icon" src="/static/images/hot-icon.png"></image>
						<text class="hot-text">{{ hotNumber(data.views) }}热度</text>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		name:"hot-list-item",
		props:{
			// item的数据
			data: {
				type:Object,
				required:true,
			},
			// 排名
			ranking:{
				type:Number,
				required:true,
			}
		},
		data() {
			return {
				// hotNumber:''
			};
		},
		// vue3中不再支持使用过滤器,所以用计算属性
		computed:{
			// 把字符窜转化为以 k 为单位的字符
			hotNumber: function() {
				return function(val) {
					const num = parseInt(val);
					if (num < 1000) return val;
					// 把val转化为字符串
					val = val + '';
					return val.substring(0, val.length - 3) + 'k'
				}
			}
			
		}
	}
</script>

<style lang="scss" scoped>
.item-container {
  padding-bottom: $uni-spacing-col-lg;
  .item-box {
	  height:140px ;
    display: flex;
    margin: 0 $uni-spacing-col-base;
    padding: $uni-spacing-row-lg $uni-spacing-col-base;
    background-color: $uni-bg-color;
    border-radius: $uni-border-radius-lg;
    box-shadow: 2px 2px 5px 1px rgba(143, 143, 143, 0.1);
    .item-box-left {
      margin-right: $uni-spacing-row-sm;
    }
    .item-box-right {
      width: 100%;
      .item-title {
        font-size: $uni-font-size-lg;
        font-weight: bold;
        color: $uni-text-color-title;
      }
      .item-desc {
        padding-top: $uni-spacing-row-sm;
        font-size: $uni-font-size-base;
        color: $uni-text-color;
      }
      .item-bottom-box {
        margin-top: $uni-spacing-col-sm;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .item-author {
          font-size: $uni-font-size-sm;
          color: $uni-text-color-grey;
        }
        .hot-box {
          .hot-icon {
            width: $uni-img-size-sm;
            height: $uni-img-size-sm;
            vertical-align: top;
          }
          .hot-text {
            margin-left: $uni-spacing-row-sm;
            font-size: $uni-font-size-sm;
            color: $uni-text-color-hot;
          }
        }
      }
    }
  }
}
</style>