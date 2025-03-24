import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
	getMoviesReviews,
	AddMovieReviews,
	DeleteMovieReview,
} from "../redux/movie/movie-action.js";

function MovieReviewPage() {
	const dispatch = useDispatch();
	const location = useLocation();
	const user = useSelector((state) => state.user?.loginData);
	const movie = location.state?.movie;

	const [currentPage, setCurrentPage] = useState(1);
	const reviewPerPage = 6;
	const [newReview, setNewReview] = useState("");
	const [rating, setRating] = useState(5);
	const [reviewData, setReviewData] = useState([]);
	const [sortOrder, setSortOrder] = useState("desc");

	const fetchReviews = () => {
		if (movie) {
			dispatch(
				getMoviesReviews({
					movieId: movie.id,
					page: currentPage,
					pageSize: reviewPerPage,
					sort: sortOrder,
				})
			).then((res) => {
				setReviewData(res?.data?.data?.record || []);
			});
		}
	};

	useEffect(() => {
		fetchReviews();
	}, [dispatch, movie, currentPage, sortOrder]);

	if (!movie) return <h2>No movie selected</h2>;

	const handleAddReview = () => {
		if (newReview.trim() === "") return;

		const newEntry = {
			movieId: movie.id,
			comment: newReview,
			userId: user?.data?.id,
			rating: rating,
		};

		dispatch(AddMovieReviews(newEntry)).then(() => {
			fetchReviews();
		});

		setNewReview("");
		setRating(5);
	};

	const handleDeleteReview = (reviewId) => {
		dispatch(
			DeleteMovieReview({
				id: reviewId.id,
				movieId: reviewId.movieId,
				email: user?.data?.email,
			})
		).then(() => {
			setReviewData((prev) => prev.filter((review) => review.id !== reviewId));
			fetchReviews();
		});
	};

	const handleSortToggle = () => {
		setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
		fetchReviews();
	};

	const handleNextPage = () => setCurrentPage((prev) => prev + 1);
	const handlePrevPage = () =>
		setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));

	return (
		<div className="container mt-4">
			<h1>Movie Reviews</h1>
			<div className="card text-center">
				<img
					src={movie.image}
					className="card-img-top mx-auto mt-3"
					alt={movie.title}
					style={{ width: "200px", height: "300px", objectFit: "cover" }}
				/>
				<div className="card-body">
					<h2 className="card-title">{movie.title}</h2>
					<p className="card-text">{movie.description}</p>
					<p>
						<strong>Release Date:</strong>{" "}
						{new Date(movie.releaseDate).toLocaleDateString()}
					</p>
				</div>
			</div>

			<h3 className="mt-4">Add a Review</h3>
			<div className="mb-3">
				<Form.Control
					as="textarea"
					rows={3}
					placeholder="Write your review..."
					value={newReview}
					onChange={(e) => setNewReview(e.target.value)}
				/>
				<div className="mt-2 d-flex align-items-center">
					<span className="me-2">Rating:</span>
					<Form.Select
						value={rating}
						onChange={(e) => setRating(Number(e.target.value))}
						style={{ width: "80px" }}
					>
						<option value="1">1 ⭐</option>
						<option value="2">2 ⭐⭐</option>
						<option value="3">3 ⭐⭐⭐</option>
						<option value="4">4 ⭐⭐⭐⭐</option>
						<option value="5">5 ⭐⭐⭐⭐⭐</option>
					</Form.Select>
				</div>
				<Button variant="primary" className="mt-2" onClick={handleAddReview}>
					Submit Review
				</Button>
			</div>

			<h3 className="mt-4">User Reviews</h3>
			<Button variant="info" className="mb-2" onClick={handleSortToggle}>
				Sort Reviews ({sortOrder === "desc" ? "Newest" : "Oldest"})
			</Button>
			<ul className="list-group">
				{reviewData.length > 0 ? (
					reviewData.map((review) => (
						<li
							className="list-group-item d-flex justify-content-between align-items-center"
							key={review.id}
						>
							<div>
								<strong>{review.user?.name || "Anonymous"}:</strong>{" "}
								{review.comment} -
								<span className="text-warning"> {review.rating} ⭐</span>
							</div>
							{user?.data?.id === review.userId ||
							user?.data?.type === "admin" ? (
								<Button
									variant="danger"
									size="sm"
									onClick={() => handleDeleteReview(review)}
								>
									Delete
								</Button>
							) : (
								""
							)}
						</li>
					))
				) : (
					<li className="list-group-item">No reviews yet.</li>
				)}
			</ul>

			<div className="mt-3 d-flex justify-content-between">
				<Button
					variant="secondary"
					onClick={handlePrevPage}
					disabled={currentPage === 1}
				>
					Previous
				</Button>
				<Button variant="secondary" onClick={handleNextPage}>
					Next
				</Button>
			</div>
		</div>
	);
}

export default MovieReviewPage;
