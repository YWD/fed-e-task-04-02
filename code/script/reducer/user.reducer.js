const initialState = { username: '', status: 'logout' };

export function reducer (state = initialState, action) {
	switch (action.type) {
		case 'login':
			return { username: 'longxiaobai', status: 'login' };
		case 'logout':
			return { username: '', status: 'logout' };
		default:
			return state;
	}
}