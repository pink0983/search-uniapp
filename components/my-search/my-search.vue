<template>
	<view class="my-search-container">
		<uni-search-bar v-if="isShowInput" 
		class="my-search-bar" 
		:radius="100"
		:bgColor="config.backgroundColor"
		:placeholder="placeholderText"
		:value="modelValue"
		@confirm="onSearch"
		@focus="onFocus"
		@blur="onBlur"
		@clear="onClear"
		@cancel="onCancel"
		@input="onInput">
			<uni-icons slot="clearIcon" type="clear" color="#999999"></uni-icons>
		</uni-search-bar>
		<view class="my-search-box" v-else
		:style="{
			height:config.height + 'px',
			backgroundColor:config.backgroundColor,
			border: config.border
		}">
			<image class="icon" :src="config.icon"></image>
			<text class="placeholder" :style="{
				color:config.textColor,
			}">{{placeholderText}}</text>
		</view>
		
	</view>
</template>

<script>
	export default {
		name:"my-search",
		props:{
			placeholderText:{
				type:String,
				default:'搜索'
			},
			isShowInput:{
				type:Boolean,
				default:false
			},
			// 搜索框配置对象
			config:{
				type:Object,
				default: () => ({
					height:36,
					backgroundColor:'#fffff',
					icon:'/static/images/search.png',
					textColor:'#454545',
					border:'1px solid #f94d2a'
				})
			},
			modelValue:{
				type:String
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			// 点击搜索按钮触发
			onSearch(){
				this.$emit('search', this.modelValue);
			},
			// 获取焦点
			onFocus(){
				this.$emit('focus', this.modelValue);
			},
			// 失去焦点
			onBlur(){
				this.$emit('blur', this.modelValue);
			},
			// 点击搜索框中清空按钮
			onClear(){
				this.$emit('clear', this.modelValue);
			},
			// 点击取消按钮
			onCancel(){
				this.$emit('cancel', this.modelValue);
			},
			// value改变
			onInput(val){
				// 通知父组件
				// input 的事件名称不可修改，与 props 中的 value 对应
				// 当同时存在：
				// props -> value
				// $emit('input', val)
				// 时，在组件外可以使用 v-model 完成双向数据绑定。
				// 即：用户输入内容时，父组件传递过来的 value 同步发生变化
				// 详细见 vue 中 v-model 指令：https://cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model
				this.$emit('update:modelValue', val);
			},
		}
	}
</script>

<style lang="scss" scoped>
.my-search-container{
	display: flex;
	align-items: center;
	.my-search-bar{
		width: 100%;
	}
	.my-search-box{
		height: 36px;
		width: 100%;
		background-color: $uni-bg-color;
		border-radius: 15px;
		border: 1px solid $uni-bg-color-border;
		width: 100%;
		display: flex;
		align-items: center;
		padding: 0px 10px;
		.icon{
			width: $uni-img-size-sm;
			height: $uni-img-size-sm;
		}
		.placeholder{
			font-size: $uni-font-size-sm;
			margin-left: $uni-spacing-row-sm;
			color: $uni-text-color-placeholder;
		}
		
	}
}
</style>