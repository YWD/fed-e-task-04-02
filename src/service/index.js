export default function mock (payload = [], timer = 1200) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (Math.random() > 0.95) {
				reject('请求错误');
			} else {
				resolve({ status: 'Success', data: payload });
			}
		}, 1200);
	});
}