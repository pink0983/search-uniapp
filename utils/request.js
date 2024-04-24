// 封装请求对象
// const BASE_URL = 'https://api.imooc-blog.lgdsunday.club/api';
const BASE_URL = 'http://localhost:8080';
function request({url,data,method}){
	return new Promise((resolve, reject) =>{
		uni.request({
			url:BASE_URL + url,
			data,
			method,
			success:({data, statusCode, header}) =>{
				if(data.success){
					resolve(data);
				} else {
					uni.showToast({
						title: data.message,
						icon: 'none',
						mask: true,
						duration: 3000
					});
					reject(data.message);
				}
			},
			fali: (error) => {
				reject (error);
			}
		})
	})
}
export default request;