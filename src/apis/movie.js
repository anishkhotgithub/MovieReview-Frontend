import API from "./repositoryFactory";

const createMovie = "createMovie";
const updateMovie = "updateMovie";
const deleteMovie = "deleteMovie";
const getMovies = "getMovies";
const AddMovieReviews = "AddMovieReviews";
const getMoviesReviews = "getMoviesReviews";
const UpdateMovieReviews = "UpdateMovieReviews";
const DeleteMovieReviews = "DeleteMovieReviews";
export default {
	createMovie(payload) {
		return API.post(movieRoute(createMovie), payload);
	},
	updateMovie(payload) {
		return API.post(movieRoute(updateMovie), payload);
	},
	deleteMovie(payload) {
		return API.post(movieRoute(deleteMovie), payload);
	},
	getMovies(payload) {
		return API.post(movieRoute(getMovies), payload);
	},
	AddMovieReviews(payload) {
		return API.post(movieRoute(AddMovieReviews), payload);
	},
	getMoviesReviews(payload) {
		return API.post(movieRoute(getMoviesReviews), payload);
	},
	DeleteMovieReviews(payload) {
		return API.post(movieRoute(DeleteMovieReviews), payload);
	},
	UpdateMovieReviews(payload) {
		return API.post(movieRoute(UpdateMovieReviews), payload);
	},
};
const movieRoute = (route) => {
	return `movie/${route}`;
};
