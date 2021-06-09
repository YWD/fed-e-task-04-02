export function count (store) {
	return function (next) {
		return function (action) {
			console.log('count function');
			next(action);
		}
	}
}