import { combineReducers } from "redux";
import UserDetails from "./user/user-reducer";
import moviesDetails from "./movie/movie-reducer";
const rootReducer = combineReducers({
	user: UserDetails,
	movie: moviesDetails,
});
export default rootReducer;
