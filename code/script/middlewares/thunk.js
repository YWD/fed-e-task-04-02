import { isJudgeType } from '../redux/index.js';

export function thunk (store) {
	return function (next) {
		return function (action) {
			console.log('thunk request');
			// store.dispatch 比 next 至少多一层函数, 即该插件在第一个位置时
			// console.log(store.dispatch);
			isJudgeType(action, 'Function') ? action(next) : next(action);
		}
	}
}