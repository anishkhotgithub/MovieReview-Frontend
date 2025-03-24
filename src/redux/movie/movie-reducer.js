const initialState = {
	getMoviesData: [],
};
const moviesDetails = (state = initialState, action) => {
	switch (action.type) {
		case "getMovies":
			return { ...state, getMoviesData: action.payload };
		default:
			return state;
	}
};

export default moviesDetails;
