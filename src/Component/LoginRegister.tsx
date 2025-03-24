import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Login, Register } from "../redux/user/user-action.js";
import Swal from "sweetalert2";
function LoginData() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setname] = useState("");
	const [error, setError] = useState("");
	const [reg, setreglogin] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (reg === false) {
			if (!email || !password) {
				setError("All fields are required");
				return;
			}
			const data = await dispatch(
				Login({
					email: email,
					password: password,
				})
			);
			if (data === true) {
				Swal.fire("Successfully login", "", "success");
				setEmail("");
				setPassword("");
				setname("");
			} else {
				Swal.fire("Something wrong", "", "error");
			}
		} else {
			const data = await dispatch(
				Register({
					name: name,
					email: email,
					password: password,
				})
			);
			if (data === true) {
				Swal.fire("Register Successfully", "", "success");
				setreglogin(false);
				setEmail("");
				setPassword("");
				setname("");
			} else {
				Swal.fire("Already Exists", "", "error");
			}
		}
	};
	const registerClick = (e: React.FormEvent) => {
		e.preventDefault();
		setEmail("");
		setPassword("");
		setname("");
		if (reg === true) {
			setreglogin(false);
		} else {
			setreglogin(true);
		}
	};
	return (
		<div className="container d-flex justify-content-center align-items-center vh-100">
			<div className="card p-4 shadow" style={{ width: "350px" }}>
				<h3 className="text-center">{reg === false ? "Login" : "Register"}</h3>
				{error && <div className="alert alert-danger">{error}</div>}
				<form onSubmit={handleSubmit}>
					{reg === true && (
						<>
							<div className="mb-3">
								<label className="form-label">Name</label>
								<input
									type="text"
									className="form-control"
									value={name}
									onChange={(e) => setname(e.target.value)}
									required
								/>
							</div>
						</>
					)}
					<div className="mb-3">
						<label className="form-label">Email</label>
						<input
							type="email"
							className="form-control"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>

					<div className="mb-3">
						<label className="form-label">Password</label>
						<input
							type="password"
							className="form-control"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>

					<button type="submit" className="btn btn-primary w-100">
						{reg === false ? "Login" : "Register"}
					</button>

					<p className="cursor-pointer text-blue" onClick={registerClick}>
						{reg === true ? "login ?" : "Not register ?"}
					</p>
				</form>
			</div>
		</div>
	);
}

export default LoginData;
