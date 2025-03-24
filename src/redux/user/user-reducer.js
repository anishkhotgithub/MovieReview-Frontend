const initialState = {
	getUserData: [],
	loginData: {},
};
const userDetails = (state = initialState, action) => {
	switch (action.type) {
		case "getUsers":
			return { ...state, getUserData: action.payload };
		case "login":
			return { ...state, loginData: action.payload };
		case "logout":
			return JSON.parse(JSON.stringify(initialState));
		default:
			return state;
	}
};

export default userDetails;
