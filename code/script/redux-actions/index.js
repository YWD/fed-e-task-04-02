/* eslint-disable no-unused-vars */
export function createAction (type) {
	const typeString = type.toString();

	function actionCreator (payload) {
		return { type: typeString, payload: payload };
	}
	
	actionCreator.toString = function () {
		return typeString;
	}

	return actionCreator;
}

const reduceReducers = (initialState, handlers) => {
	return (state = initialState, action) => {
		const fnCallback = Reflect.get(handlers, action.type);
		return fnCallback ? fnCallback(state, action) : state;
	}
}

export const createReducer = (handlers, initialState) => {
	return function (state = initialState, action) {
		const fnCallback = Reflect.get(handlers, action.type);

		return fnCallback ? fnCallback(state, action) : state;
	}
}