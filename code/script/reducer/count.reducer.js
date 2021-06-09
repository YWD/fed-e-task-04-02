const initialState = { count: 0 };

export function reducer (state = initialState, action) {
	switch (action.type) {
		case 'increment':
			return { count: ++state.count };
		case 'decrement':
			return { count: --state.count };
		default:
			return state;
	}
}