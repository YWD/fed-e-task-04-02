/**
 * 根据传入数据校验数据类型函数
 * @param {Object} object 
 * @param {string} confirmed 
 */
const isJudgeType = (object, confirmed = 'Function') => {
	const string = Object.prototype.toString.call(object);
	return string === `[object ${confirmed}]`;
}

/**
 * 校验enhancer是否是可用函数
 * @param {Function} createStore 
 * @param {Function} enhancer 
 * @param {Object} preloadedState 
 */
const judgeEnhancer = (createStore, enhancer, preloadedState) => {
	enhancer = enhancer ? enhancer : preloadedState;
	if (!isJudgeType(enhancer, 'Function')) return false;
	if (isJudgeType(enhancer(createStore), 'Function')) return enhancer;
}

const judgeStandrandState = (preloadedState) => {
	return preloadedState && !isJudgeType(preloadedState, 'Function')
}

const judgeRequirement = (action) => {
	if (!isJudgeType(action, 'Object')) return 'action must be an object';
	if (!Reflect.has(action, 'type')) return 'action must contain the type attribute';
}

/**
 * 创建store，即数据调度中心对象函数
 * @param {Funtion} reducer 
 * @param {Object} preloadedState 
 * @param {Funtion} enhancer 
 */
const createStore = (reducer, preloadedState, enhancer) => {
	let listeners = [], currentState = {};
	if (!isJudgeType(reducer, 'Function')) throw new Error('reducer must be a function');

	/**
	 * 以undefined作为参数传入时，可以使用默认参数进行逻辑处理
	 */
	currentState = judgeStandrandState(preloadedState) ? preloadedState : reducer(undefined, {type: Symbol()});

	const handler = judgeEnhancer(createStore, enhancer, preloadedState);
	if (handler) return handler(createStore)(reducer, currentState);

	function getState () {
		return currentState;
	}

	function dispatch (action) {
		const message = judgeRequirement(action);
		if (message) throw new Error(message);
		currentState = reducer(currentState, action);
		for (const fnCallback of listeners) fnCallback();
	}

	function subscribe (fnCallback) {
		if (isJudgeType(fnCallback, 'Function')) {
			listeners.push(fnCallback);
		} else {
			throw new Error('fnCallback must be a function');
		}
	}

	return {
		getState,
		dispatch,
		subscribe
	}
}

/**
 * 创建中间件函数
 * 洋葱模型，组装时需反序进行组装
 * @param  {...any} middlewares 
 */
const applyMiddleware = (...middlewares) => {
	middlewares = middlewares.filter(fnCallback => isJudgeType(fnCallback, 'Function'));

	return function (createStore) {
		return function (reducer, preloadedState) {
			const store = createStore(reducer, preloadedState);
			const chain = middlewares.reverse().map(fnCallback => fnCallback(store))
				.filter(fnCallback => isJudgeType(fnCallback, 'Function'));

			// logger => thunk => dispatch - 洋葱模型，组装时需反序进行组装
			const _dispatch = chain.reduce((dispatch, fnCallback) => fnCallback(dispatch), store.dispatch);

			store.dispatch = _dispatch;

			return store;
		}
	}
}

/**
 * actionCreator，创建action函数
 * @param {Object} actionCreators 
 * @param {Function} dispatch 
 */
const bindActionCreators = (actionCreators, dispatch) => {
	if (!isJudgeType(actionCreators, 'Object')) {
		throw new Error('the parameters passed in must be objects');
	};

	if (!isJudgeType(dispatch, 'Function')) {
		throw new Error('dispatch must be a function');
	};

	for (const key in actionCreators) {
		const creator= actionCreators[key];
		const fnCallback = isJudgeType(creator) ? creator() : creator;
		
		const message = judgeRequirement(fnCallback);
		if (message) throw new Error(message);

		actionCreators[key] = function (payload) {
			dispatch(isJudgeType(creator) ? creator(payload) : {...creator, payload: payload});
		};
	}
	return actionCreators;
}

/**
 * 合并多个reducer，作为reducer合并函数
 * @param {Object} reducers 
 */
const combineReducers = (reducers = {}) => {
	if (!isJudgeType(reducers, 'Object')) {
		throw new Error('the parameters passed in must be objects');
	};
	for (const key in reducers) {
		if (!isJudgeType(reducers[key], 'Function')) {
			throw new Error('reducer must be a function');
		}
	}

	let isCalled = false, targetState = {};

	return function reducer(state, action) {
		const namespace = action.namespace;
		if (namespace && reducers[namespace] && isCalled) {
			targetState[namespace] = reducers[namespace](state ? state[namespace]: undefined, action);
		} else {
			for (const key in reducers) {
				targetState[key] = reducers[key](state ? state[key]: undefined, action);
			}
			isCalled = true;
		}
		return targetState;
	}
}

/**
 * 增强型reducer组装函数
 * @param {Object} actions 
 * @param {Object} initialState 
 */
const createReducer = (actions, initialState) => {
	if (!isJudgeType(actions, 'Object')) throw new Error('actions must be a object');
	if (!initialState) throw new Error('initialState is required');
	for (const key in actions) {
		if (!isJudgeType(actions[key])) throw new Error('action  must be a function');
	}

	return function (state = initialState, action) {
		const callback = actions[action.type];
		if(callback === undefined) {
			console.warn(`type: ${String(action.type)}, Can't find the specified function`);
		}
		return callback ? callback(state, action) : state;
	}
}

export {
	isJudgeType,
	createStore,
	createReducer,
	applyMiddleware,
	bindActionCreators,
	combineReducers
}
