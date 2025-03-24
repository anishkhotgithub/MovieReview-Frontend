import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { addMovies, updateMovies } from "../redux/movie/movie-action";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
function MovieModal({ show, onClose, onSubmit, editMovie }) {
	const user = useSelector((state) => state.user?.loginData?.data);
	const dispatch = useDispatch();

	// Initialize state with movie details
	const [movie, setMovie] = useState({
		id: "",
		image: "",
		title: "",
		description: "",
		releaseDate: "",
		email: user?.email || "",
	});
	console.log(movie, "dattegsghsg");
	// Prefill movie data when editing
	useEffect(() => {
		if (editMovie) {
			setMovie({
				id: editMovie.id || "",
				image: editMovie.image || "",
				title: editMovie.title || "",
				description: editMovie.description || "",
				releaseDate: editMovie.releaseDate
					? new Date(editMovie.releaseDate).toISOString().split("T")[0]
					: "",
				email: editMovie.email || user?.email || "",
			});
		} else {
			setMovie({
				id: "",
				image: "",
				title: "",
				description: "",
				releaseDate: "",
				email: user?.email || "",
			});
		}
	}, [editMovie, user]);

	// Handle input changes
	const handleChange = (e) => {
		setMovie((prevMovie) => ({
			...prevMovie,
			[e.target.name]: e.target.value,
		}));
	};

	// Handle form submission (Add/Edit)
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (editMovie) {
				Swal.fire({
					title: "Are you sure you want to update this movie?",
					showConfirmButton: true,
					showCancelButton: true,
					confirmButtonText: "Yes",
					cancelButtonText: "Cancel",
					icon: "warning",
				}).then(async (result) => {
					if (result.isConfirmed) {
						await dispatch(updateMovies(movie)); // Update existing movie
						Swal.fire("Successfully Updated Movie", "", "success");
					}
				});
			} else {
				await dispatch(addMovies(movie)); // Add new movie
			}

			onSubmit();
			onClose();
		} catch (error) {
			console.error("Error saving movie:", error);
		}
	};

	// Don't render modal if `show` is false
	if (!show) return null;

	return (
		<div className="modal show d-block" tabIndex="-1">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">
							{editMovie ? "Edit Movie" : "Add Movie"}
						</h5>
						<button
							type="button"
							className="btn-close"
							onClick={onClose}
						></button>
					</div>
					<div className="modal-body">
						<form onSubmit={handleSubmit}>
							{["image", "title", "description", "releaseDate"].map((field) => (
								<div className="mb-3" key={field}>
									<label className="form-label">
										{field.replace(/^\w/, (c) => c.toUpperCase())}
									</label>
									<input
										type={field === "releaseDate" ? "date" : "text"}
										className="form-control"
										name={field}
										value={movie[field]}
										onChange={handleChange}
										required
									/>
								</div>
							))}
							<button type="submit" className="btn btn-primary">
								{editMovie ? "Update" : "Add"}
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MovieModal;
