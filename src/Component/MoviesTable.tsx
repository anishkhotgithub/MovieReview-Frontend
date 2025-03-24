import React, { useCallback, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MovieModal from "./MovieAdd.js";
import { useDispatch, useSelector } from "react-redux";
import { getMovies, deleteMovies } from "../redux/movie/movie-action.js";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import Swal from "sweetalert2";

function MoviesTable() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const moviesData = useSelector((state) => state.movie?.getMoviesData);
	const user = useSelector((state) => state.user?.loginData);

	const [searchQuery, setSearchQuery] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [editMovie, setEditMovie] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 4;

	// Fetch movies
	const fetchMovies = useCallback(() => {
		dispatch(
			getMovies({ searchQuery, page: currentPage, pageSize: itemsPerPage })
		);
	}, [dispatch, searchQuery, currentPage]);

	// Debounce search input
	const debouncedSearch = useCallback(
		debounce((query, page) => {
			dispatch(getMovies({ searchQuery: query, page, pageSize: itemsPerPage }));
		}, 500),
		[dispatch]
	);

	useEffect(() => {
		debouncedSearch(searchQuery, currentPage);
	}, [searchQuery, currentPage]);

	// Open modal for edit or add
	const handleOpenModal = (movie = null) => {
		setEditMovie(movie);
		setShowModal(true);
	};

	// Close modal
	const handleCloseModal = () => {
		setShowModal(false);
		setEditMovie(null);
	};

	// Fetch movies after update
	const handleMovieUpdate = () => {
		setShowModal(false);
		fetchMovies();
	};

	// Delete movie
	const handleDelete = async (movieId) => {
		Swal.fire({
			title: "Are you sure you want to delete this movie?",
			showConfirmButton: true,
			showCancelButton: true,
			confirmButtonText: "Yes",
			cancelButtonText: "Cancel",
			icon: "warning",
		}).then(async (result) => {
			if (result.isConfirmed) {
				await dispatch(
					deleteMovies({ id: movieId.id, email: user?.data?.email })
				);
				Swal.fire("Successfully Deleted Movie", "", "success");
				fetchMovies();
			}
		});
	};

	// Navigate to review page
	const handleAddReview = (movie) => {
		navigate(`/reviews/${movie.id}`, { state: { movie } });
	};

	// Pagination
	const totalRecords = moviesData?.data?.totalData || 0;
	const totalPages = Math.ceil(totalRecords / itemsPerPage);

	return (
		<div className="container mt-4">
			<h1 className="mb-4">Movies Table</h1>

			<div className="d-flex justify-content-between mb-3">
				<button className="btn btn-primary" onClick={() => handleOpenModal()}>
					Add Movie
				</button>
				<input
					type="text"
					className="form-control w-25"
					placeholder="Search movies..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</div>

			<table className="table table-bordered">
				<thead className="table-dark">
					<tr>
						<th>ID</th>
						<th>Image</th>
						<th>Title</th>
						<th>Description</th>
						<th>Release Date</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{moviesData?.data?.record?.map((movie) => (
						<tr key={movie.id}>
							<td>{movie.id}</td>
							<td>
								<img src={movie.image} alt={movie.title} width="50" />
							</td>
							<td>{movie.title}</td>
							<td>{movie.description}</td>
							<td>{new Date(movie.releaseDate).toLocaleDateString()}</td>
							<td>
								<button
									className="btn btn-warning me-2"
									onClick={() => handleOpenModal(movie)}
								>
									Edit
								</button>
								<button
									className="btn btn-danger me-2"
									onClick={() => handleDelete(movie)}
								>
									Delete
								</button>
								<button
									className="btn btn-info"
									onClick={() => handleAddReview(movie)}
								>
									Add Review
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{/* Pagination */}
			<div className="d-flex justify-content-between align-items-center">
				<button
					className="btn btn-secondary"
					onClick={() => setCurrentPage((prev) => prev - 1)}
					disabled={currentPage === 1}
				>
					Previous
				</button>
				<span>
					Page {currentPage} of {totalPages}
				</span>
				<button
					className="btn btn-secondary"
					onClick={() => setCurrentPage((prev) => prev + 1)}
					disabled={currentPage >= totalPages}
				>
					Next
				</button>
			</div>

			{/* Movie Modal */}
			<MovieModal
				show={showModal}
				onClose={handleCloseModal}
				onSubmit={handleMovieUpdate}
				editMovie={editMovie}
			/>
		</div>
	);
}

export default MoviesTable;
