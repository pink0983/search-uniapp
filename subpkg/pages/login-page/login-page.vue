<template>
	<my-login @onLoginSuccess="onLoginSuccess"></my-login>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			onLoginSuccess(){
				uni.navigateBack({delta:1});
			}
		}
	}
</script>

<style lang="scss">

</style>
