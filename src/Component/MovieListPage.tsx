import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies, deleteMovies } from "../redux/movie/movie-action.js";
import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { Button } from "react-bootstrap";

function MovieListPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const movies = useSelector((state) => state.movie?.getMoviesData);
	console.log(movies, "movies");
	const [currentPage, setCurrentPage] = useState(1);
	const moviesPerPage = 6; // Number of movies per page

	// Fetch movies when component mounts
	useEffect(() => {
		dispatch(getMovies({ page: currentPage, pageSize: moviesPerPage }));
	}, [dispatch]);

	// Pagination logic
	const indexOfLastMovie = currentPage * moviesPerPage;
	const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
	const currentMovies = movies?.data?.record.slice(
		indexOfFirstMovie,
		indexOfLastMovie
	);

	// Handle page change
	const nextPage = () => {
		if (indexOfLastMovie < movies?.data?.record?.length) {
			setCurrentPage(currentPage + 1);
		}
	};

	const prevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	// Handle movie delete
	const handleDelete = (id) => {
		dispatch(deleteMovies(id));
	};

	// If movies are not loaded yet
	if (!movies?.data?.record.length) return <h2>Loading movies...</h2>;

	return (
		<div className="container mt-4">
			{/* Carousel for top 3 movie posters */}
			<Carousel className="mb-4">
				{movies?.data?.record.slice(0, 3).map((movie) => (
					<Carousel.Item key={movie.id}>
						<img
							className="d-block w-100"
							src={movie.image}
							alt={movie.title}
							style={{ height: "400px", objectFit: "cover" }}
						/>
						<Carousel.Caption>
							<h3>{movie.title}</h3>
						</Carousel.Caption>
					</Carousel.Item>
				))}
			</Carousel>

			{/* Movie List */}
			<div className="row">
				{currentMovies.map((movie) => (
					<div className="col-md-4 mb-4" key={movie.id}>
						<div className="card">
							<img
								src={movie.image}
								className="card-img-top"
								alt={movie.title}
								style={{ height: "250px", objectFit: "cover" }}
							/>
							<div className="card-body">
								<h5 className="card-title">{movie.title}</h5>
								<p className="card-text">
									{movie.description.substring(0, 100)}...
								</p>
								<div className="d-flex justify-content-between">
									<Button
										variant="primary"
										onClick={() =>
											navigate(`/reviews/${movie.id}`, { state: { movie } })
										}
									>
										Add Review
									</Button>
									<Button
										variant="danger"
										onClick={() => handleDelete(movie.id)}
									>
										Delete
									</Button>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Pagination */}
			<div className="d-flex justify-content-center mt-4">
				<Button
					onClick={prevPage}
					disabled={currentPage === 1}
					className="mx-2"
				>
					Previous
				</Button>
				<Button
					onClick={nextPage}
					disabled={indexOfLastMovie >= movies.length}
					className="mx-2"
				>
					Next
				</Button>
			</div>
		</div>
	);
}

export default MovieListPage;
