import React from "react";

const Login = () => {
	return (
		<div className="wrap">
			<div className="card">
				<h1>Login</h1>
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
					<button className="form-btn">Login</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
