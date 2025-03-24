import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import LoginData from "./Component/LoginRegister";
import Navbar from "./Component/UserIndex";
import Adminindex from "./Component/Adminindex";
import routesConfig from "./Router/routesConfig";

function App() {
	const user = useSelector((state) => state.user?.loginData);
	const isAuthenticated = Object.keys(user || {}).length !== 0;

	if (!isAuthenticated) {
		return (
			<Router>
				<Routes>
					<Route path="/LoginRegister" element={<LoginData />} />
					<Route path="*" element={<Navigate to="/LoginRegister" replace />} />
				</Routes>
			</Router>
		);
	}
	// console.log(user?.type, "sxsxsx");
	const Layout = user?.data?.type === "user" ? Navbar : Adminindex;
	const routesName = user?.data?.type === "user" ? "/movielist" : "/movies";

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout />}>
					{routesConfig.map((route, index) => (
						<Route key={index} path={route.path} element={<route.element />} />
					))}
					<Route path="*" element={<Navigate to={routesName} replace />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
