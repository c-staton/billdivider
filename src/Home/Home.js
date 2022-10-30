import React from "react";
import "./Home.css";
import sample from "../images/sample.png";

const Home = () => {
	return (
		<div className="wrap">
			<div className="home-box">
				<div className="home-box--left">
					<h1>Instantly Divide Your Bill</h1>
					<button className="form-btn">Create an account</button>
				</div>
				<div>
					<img
						src={sample}
						alt="sample-bill"
						width="100%"
						className="bill-sample"
					/>
				</div>
			</div>
		</div>
	);
};

export default Home;
