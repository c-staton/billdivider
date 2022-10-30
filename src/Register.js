import React from "react";

const Register = () => {
	return (
		<div className="wrap">
			<div className="card">
				<h1>Create Account</h1>
				<form>
					<div className="form__group">
						<input
							className="form__field"
							name="username"
							id="username"
							type="text"
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
							id="password"
							type="password"
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
							id="email"
							type="email"
							required
						/>
						<label htmlFor="email" className="form__label">
							Email
						</label>
					</div>
					<button className="form-btn">Register</button>
				</form>
			</div>
		</div>
	);
};

export default Register;
