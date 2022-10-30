import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "./auth.css";

const Login = ({ login }) => {
	const [formData, setFormData] = useState({ username: "", password: "" });
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
		login(formData);
		navigate("/");
	};

	return (
		<div className="wrap">
			<div className="card auth">
				<h1>Login</h1>
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
					<button className="form-btn auth__btn" type="submit">
						Login
					</button>

					<hr />
					<br />

					<div className="login__footer">
						<Link to="/register">Or create account</Link>
						<p>
							<i>(takes less then 30 secs)</i>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
