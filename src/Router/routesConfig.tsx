import React, { lazy } from "react";

const Navbar = lazy(() => import("../Component/Navbar"));
const MoviesTable = lazy(() => import("../Component/MoviesTable"));
const MovieReviewPage = lazy(() => import("../Component/MovieReviewPage"));
const MovieListPage = lazy(() => import("../Component/MovieListPage"));

export interface RouteConfig {
	path: string;
	element: React.ComponentType;
	isProtected?: boolean;
}

const routesConfig: RouteConfig[] = [
	{
		path: "/Navbar",
		element: Navbar,
	},
	{
		path: "/movies",
		element: MoviesTable,
	},
	{
		path: "/reviews/:id",
		element: MovieReviewPage,
	},
	{
		path: "/movielist",
		element: MovieListPage,
	},
];

export default routesConfig;
