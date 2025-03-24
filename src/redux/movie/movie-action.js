import apis from "../../apis/movie";
export const getMovies = (payload) => {
	return async (dispatch) => {
		try {
			let payload2 = {
				...payload,
			};
			let { data } = await apis.getMovies(payload2);
			if (data) {
				dispatch({ type: "getMovies", payload: data.data }); // Correct dispatch
			}
		} catch (error) {
			console.log(error);
		}
	};
};
export const addMovies = (payload) => {
	return async (dispatch) => {
		try {
			let payload2 = {
				...payload,
			};
			let { data } = await apis.createMovie(payload2);
			return data;
		} catch (error) {
			console.log(error);
		}
	};
};
export const updateMovies = (payload) => {
	return async (dispatch) => {
		try {
			let payload2 = {
				...payload,
			};
			let { data } = await apis.updateMovie(payload2);
			return data;
		} catch (error) {
			console.log(error);
		}
	};
};
export const deleteMovies = (payload) => {
	return async (dispatch) => {
		try {
			let payload2 = {
				...payload,
			};
			let { data } = await apis.deleteMovie(payload2);
			return data;
		} catch (error) {
			console.log(error);
		}
	};
};
export const AddMovieReviews = (payload) => {
	return async (dispatch) => {
		try {
			let payload2 = {
				...payload,
			};
			let { data } = await apis.AddMovieReviews(payload2);
			return data;
		} catch (error) {
			console.log(error);
		}
	};
};
export const getMoviesReviews = (payload) => {
	return async (dispatch) => {
		try {
			let payload2 = {
				...payload,
			};
			let { data } = await apis.getMoviesReviews(payload2);
			return data;
		} catch (error) {
			console.log(error);
		}
	};
};
export const DeleteMovieReview = (payload) => {
	return async (dispatch) => {
		try {
			let payload2 = {
				...payload,
			};
			let { data } = await apis.DeleteMovieReviews(payload2);
			return data;
		} catch (error) {
			console.log(error);
		}
	};
};
