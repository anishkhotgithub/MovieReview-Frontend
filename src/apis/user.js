import API from "./repositoryFactory";

const createUser = "createUser";
const getUsers = "getUsers";
const loginUser = "loginUser";
export default {
	createUser(payload) {
		return API.post(authRoute(createUser), payload);
	},
	getUsers(payload) {
		return API.post(authRoute(getUsers), payload);
	},
	loginUser(payload) {
		return API.post(authRoute(loginUser), payload);
	},
};
const authRoute = (route) => {
	return `auth/${route}`;
};
