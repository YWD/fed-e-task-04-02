import { createStore, applyMiddleware, combineReducers, bindActionCreators, createReducer } from './redux/index.js';
import { logger } from './middlewares/logger.js';
import { thunk } from './middlewares/thunk.js';
import { count } from './middlewares/count.js';
import { countReducer, userReducer } from './reducer/index.js';

const request = (time = 2000) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve({code: 'Success', value: -3});
		}, time);
	});
}

const cartReducer = createReducer({
	addToCart(state, action) {
		return { book: ++state.book };
	},
	reduceToCart: function (state, action) {
		// const data = await request(3000);
		return { book: state.book - 2 };
	}
}, { book: 1 });

const initialState = {
  "counter": {
    "count": 0
  },
  "user": {
    "username": "",
    "status": "logout"
	},
	"cart": {
		"book": 1 
	}
}

const reducer = combineReducers({ counter: countReducer, user: userReducer, cart: cartReducer });

const store = createStore(reducer, applyMiddleware(logger, count, thunk));
// const store = createStore(reducer, initialState, applyMiddleware(logger, count, thunk));
// const store = createStore(reducer, applyMiddleware(logger, count, thunk));
// const store = createStore(reducer, applyMiddleware(logger, thunk, count));

console.log(store);
console.log(store.getState());

store.subscribe(() => {
	console.log('state.count:', store.getState());
});

store.subscribe(()=> {
	console.log(store.getState());
	document.getElementById('content').innerHTML = store.getState().counter.count;
});

store.subscribe(()=> {
	console.log(`购物车中，当前有${store.getState().cart.book}本书`);
	document.getElementById('book').innerHTML = `购物车中，当前有${store.getState().cart.book}本书`;
});


store.dispatch({
	type: 'increment',
	namespace: 'count'
});

store.dispatch(function (dispatch) {
	setTimeout(() => {
		console.clear();
		dispatch({ type: 'login' });
	}, 5000);
});

const actions = bindActionCreators({
	decrement(){
		return { type: 'decrement' }
	},
	increment: { type: 'increment' }
}, store.dispatch);

document.getElementById('increment').addEventListener('click', function (){
	console.clear();
	// store.dispatch({
	// 	type: 'increment',
	// 	namespace: 'count'
	// });
	actions.increment();
});

document.getElementById('decrement').addEventListener('click', function (){
	console.clear();
	// store.dispatch({
	// 	type: 'decrement',
	// 	namespace: 'count'
	// });
	actions.decrement();
});

document.getElementById('cart').addEventListener('click', function (){
	console.clear();
	store.dispatch({
		type: 'addToCart',
		namespace: 'cart'
	});
});
