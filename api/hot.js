import request from '../utils/request.js';
export function getHotTabs(){
	return request({
		url: '/hot/tabs'
	})
}