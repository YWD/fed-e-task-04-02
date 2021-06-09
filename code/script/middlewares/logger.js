export function logger (store) {
	return function (next) {
		return function (action) {
			console.log('logger information');
			next(action);
		}
	}
}