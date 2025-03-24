import apis from "../../apis/user";
import { persistor } from "../store";
export const getUsers = (payload) => {
	return async (dispatch) => {
		try {
			let payload2 = {
				...payload,
			};
			let { data } = await apis.getUsers(payload2);
			if (data) {
				dispatch({ type: "getUsers", payload: data.data }); // Correct dispatch
			}
		} catch (error) {
			console.log(error);
		}
	};
};
export const Login = (payload) => {
	return async (dispatch) => {
		try {
			let payload2 = {
				...payload,
			};
			let { data } = await apis.loginUser(payload2);
			console.log(data?.data?.data, "APIDAHA");
			if (
				!["Invalid Password", "User Not registered"].includes(data?.data?.data)
			) {
				dispatch({ type: "login", payload: data.data }); // Correct dispatch
				return true;
			} else {
				return false;
			}
		} catch (error) {
			console.log(error);
		}
	};
};
export const Register = (payload) => {
	return async (dispatch) => {
		try {
			let payload2 = {
				...payload,
			};
			let { data } = await apis.createUser(payload2);
			if (!["email already exists"].includes(data?.data?.data)) {
				// dispatch({ type: "login", payload: data.data }); // Correct dispatch
				return true;
			} else {
				return false;
			}
		} catch (error) {
			console.log(error);
		}
	};
};
export const Logout = () => {
	return async (dispatch) => {
		await persistor.purge(); // Clear persisted Redux store
		dispatch({ type: "logout" }); // Reset Redux state
	};
};
