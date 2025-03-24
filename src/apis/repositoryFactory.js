import axios from "axios";
import { store } from "../redux/store";

const baseURL = "https://movie-review-backend-chi.vercel.app/api/";

const API = axios.create({
	baseURL,
	headers: {
		accept: "application/json",
	},
});

// Request Interceptor
API.interceptors.request.use(
	(config) => {
		const state = store.getState();
		const token = state.user?.loginData?.data?.token; // Assuming token is stored in Redux

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Response Interceptor
API.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response) {
			if (error.response.status === 401) {
				console.log("Unauthorized! Redirecting to login...");
				// Optionally, dispatch a logout action or redirect the user
			} else if (error.response.status === 403) {
				console.log("Forbidden! You don't have access.");
			} else {
				console.error("API Error:", error.response.data);
			}
		}

		return Promise.reject(error);
	}
);

export default API;
