import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
	isAuth: boolean;
	children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuth, children }) => {
	return isAuth ? <>{children}</> : <Navigate to="/LoginRegister" replace />;
};

export default PrivateRoute;
