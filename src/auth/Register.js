import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "./auth.css";

const Register = ({ signup }) => {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
		email: "",
	});

	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((data) => ({
			...data,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		signup(formData);
		navigate("/");
	};

	return (
		<div className="wrap">
			<div className="card auth">
				<h1>Create Account</h1>
				<form onSubmit={handleSubmit}>
					<div className="form__group">
						<input
							className="form__field"
							name="username"
							placeholder="Username"
							id="username"
							type="text"
							value={formData.username}
							onChange={handleChange}
							required
						/>
						<label htmlFor="username" className="form__label">
							Username
						</label>
					</div>
					<div className="form__group">
						<input
							className="form__field"
							name="password"
							placeholder="Password"
							id="password"
							type="password"
							value={formData.password}
							onChange={handleChange}
							required
						/>
						<label htmlFor="password" className="form__label">
							Password
						</label>
					</div>
					<div className="form__group">
						<input
							className="form__field"
							name="email"
							placeholder="Email (for account recovery)"
							id="email"
							type="email"
							value={formData.email}
							onChange={handleChange}
							required
						/>
						<label htmlFor="email" className="form__label">
							Email
						</label>
					</div>
					<button className="form-btn auth__btn">Register</button>

					<hr />
					<br />

					<div className="login__footer">
						<Link to="/login">Or Login</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Register;
