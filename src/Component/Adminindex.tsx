import AdminNavbarLink from "./AdminPanelNavbar";
import { Outlet } from "react-router-dom";

function App() {
	return (
		<>
			<AdminNavbarLink />;
			<Outlet />
		</>
	);
}

export default App;
