
import Vuex from 'vuex';
// 导入模块
import search from './modules/search'
import user from './modules/user.js'
import video from './modules/video.js'
// 3.创建实例
const store = new Vuex.Store({
	modules:{
		// 注册模块
		search,
		user,
		video
	}
})

export default store;
