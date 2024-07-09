const STORAGE_KEY = 'search-list';
const HISTORY_MAX = 9;


export default {
	// 独立命名空间
	namespaced: true,
	// 通过state声明数据
	state: {
			// 优先从 本地storage中读取
			searchData: uni.getStorageSync(STORAGE_KEY) || [],
	},
	mutations: {
	  /**
	   * 保存数据到 本地storage存储
	   */
	  saveToStorage(state) {
	    uni.setStorage({
	      key: STORAGE_KEY,
	      data: state.searchData
	    });
	  },
	  /**
	   * 添加数据
	   */
	  addSearchData(state, val) {
	    if (!val) return;
	    const index = state.searchData.findIndex((item) => item === val);
	    if (index !== -1) {
	      state.searchData.splice(index, 1);
	    }
	    state.searchData.unshift(val);
		// 判断是否超过了最大缓存数量
		if (state.searchData.length > HISTORY_MAX) {
		    state.searchData.splice(HISTORY_MAX-2, state.searchData.length - HISTORY_MAX - 1);
		}
	    // 调用 saveToStorage
	    this.commit('search/saveToStorage');
	  },
	  /**
	   * 删除指定数据
	   */
	  removeSearchData(state, index) {
	    state.searchData.splice(index, 1);
	    // 调用 saveToStorage
	    this.commit('search/saveToStorage');
	  },
	  /**
	   * 删除所有数据
	   */
	  removeAllSearchData(state) {
	    state.searchData = [];
	    // 调用 saveToStorage
	    this.commit('search/saveToStorage');
	  }
	}
}