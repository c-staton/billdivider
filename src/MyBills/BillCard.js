import React from "react";
import { Link } from "react-router-dom";
import "./BillCard.css";

const BillCard = ({ id, createdDate, modifiedDate, username, billName }) => {
	return (
		<Link className="billcard" to={`/bills/${username}/${id}`}>
			<h1>{billName}</h1>
			<p>created on: {createdDate}</p>
		</Link>
	);
};

export default BillCard;
