import React from "react";
import "./Home.css";
import sample from "../images/sample.png";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div className="wrap">
			<div className="home-box">
				<div>
					<img
						src={sample}
						alt="sample-bill"
						width="100%"
						className="bill-sample"
					/>
				</div>
				<div className="home-box--right">
					<h1>Instantly Divide Your Bill</h1>
					<div className="home-box__buttons">
						<Link to="/new" className="form-btn btn-scale">
							Create New Bill
						</Link>
						<Link to="/bills" className="form-btn btn-scale">
							My Bills
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
