import React, { useEffect, useState } from "react";
import BillsApi from "../Api";
import dateFormat from "dateformat";
import "./MyBills.css";
import { Link } from "react-router-dom";

const MyBills = () => {
	const [bills, setBills] = useState([]);

	//get current user username
	const username = "cstaton";

	useEffect(() => {
		const getBills = async (username) => {
			const result = await BillsApi.getBillsByUsername(username);
			setBills(result);
		};
		getBills(username);
	}, [username]);

	return (
		<div className="wrap flex-col">
			<div className="allbills__card">
				<div className="bill__h1">
					<h1>My Bills</h1>
				</div>
				<div className="bill_preview__card">
					<div className="bill__li bill__li--top">
						<div>Name</div>
						<div>Date Created</div>
					</div>
					{bills
						.slice(0)
						.reverse()
						.map((b) => (
							<Link className="bill__li" to={`/bills/${username}/${b.id}`}>
								<div className="bill__li__name--container">
									<span className="bill_preview--name">{b.bill_name}</span>
								</div>
								<div>
									<i>{dateFormat(b.created_date, "mmm dS, yyyy")}</i>
								</div>
							</Link>
						))}
					<div className="bill__ft">
						<span>{username}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MyBills;
