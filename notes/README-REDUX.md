### 1. 增强型函数

```js
// 第三个redux参数形式
function enhancer (createStore) {
    return function (reducer, preloadedState) {
        const store = createStore(reducer, preloadedState);
        /**
         * 对getState、dispatch、subscribe进行增强型逻辑处理，并返回增强后的store对象
         */
        return store;
    }
}
```



### 2. applyMiddleware

```js
function applyMiddleware (...middlewares) {
    // 相应的逻辑处理
    return function (createStore) {
        return function (reducer, preloadedState) {
            const store = createStore(reducer, preloadedState);
            // 进行增强型逻辑处理，返回增强后的store对象
            return store;
        }
    }
}

// applyMiddleware(plugins, plugins, plugins);
```



### 3. 简版实现

```js
// redux-actions
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

// redux-actions
export const createReducer = (handlers, initialState) => {
	return function (state = initialState, action) {
		const fnCallback = Reflect.get(handlers, action.type);

		return fnCallback ? fnCallback(state, action) : state;
	}
}
```

