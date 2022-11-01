import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import BillsApi from "../Api";
import "./Bill.css";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import ReactToPrint from "react-to-print";
import BillToPrint from "./BillToPrint";

const Bill = () => {
	const [bill, setBill] = useState({
		bill_name: "",
		created_date: "",
		last_modified: "",
		username: "",
		fields: [],
		split_by: "",
		id: "",
	});
	const [billTotal, setBillTotal] = useState(0);
	const componentRef = useRef();

	const { username, id } = useParams();

	useEffect(() => {
		async function fetchBill() {
			const result = await BillsApi.getBillById(username, id);
			setBill(result);
		}
		fetchBill();
	}, [username, id]);

	useEffect(() => {
		let total = 0;
		for (let field of bill.fields) {
			total = +field.amount + total;
		}
		setBillTotal(total);
	}, [bill]);

	function addCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	return (
		<>
			<div className="wrap">
				<div className="billdetails__card">
					<div className="bill__header">
						<h1>{bill.bill_name}</h1>
						<p>Created on {dateFormat(bill.created_date, "mmmm dS, yyyy")}</p>
					</div>
					<div className="table">
						<div className="table-head">
							<div className="table-row">
								<p className="head--left category">Category</p>
								<p className="head--right amount">Amount</p>
							</div>
						</div>
						<div className="table-body">
							{bill.fields.map((f) => (
								<div key={f.category + f.amount} className="table-row">
									<p className="category">{f.category}</p>
									<p className="amount">${addCommas(f.amount)}</p>
								</div>
							))}
						</div>
						<div className="table-foot">
							<div className="table-row">
								<p className="category">Total</p>
								<p className="amount">${addCommas(billTotal)}</p>
							</div>
							<div className="table-row">
								<p className="category">Per Person ({bill.split_by})</p>
								<p className="amount">
									$
									{addCommas(
										Math.round((billTotal / bill.split_by) * 100) / 100
									)}
								</p>
							</div>
						</div>
					</div>

					<div className="bill__footer">
						<div>
							<ReactToPrint
								trigger={() => (
									<button className="form-btn btn-scale">Save as PDF</button>
								)}
								copyStyles={true}
								content={() => componentRef.current}
								documentTitle={bill.bill_name}
							/>
							<div style={{ display: "none" }}>
								<BillToPrint
									ref={componentRef}
									bill={bill}
									addCommas={addCommas}
									billTotal={billTotal}
								/>
							</div>
						</div>

						<div className="bill__footer--right">
							{bill.created_date !== bill.last_modified ? (
								<p>
									<i>
										last edited on{" "}
										{dateFormat(bill.last_modified, "mmm dS, yyyy")}
									</i>
								</p>
							) : null}
							<Link
								to={`/bills/${username}/${id}/edit`}
								className="form-btn btn-scale"
							>
								Edit Bill
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Bill;
