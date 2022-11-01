import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import BillsApi from "../Api";
import "./Bill.css";

const BillEdit = () => {
	const [bill, setBill] = useState({
		bill_name: "",
		created_date: "",
		last_modified: "",
		username: "",
		fields: [],
		split_by: "",
		id: "",
	});

	const { username, id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchBill() {
			try {
				const result = await BillsApi.getBillById(username, id);
				setBill(result);
			} catch (err) {
				console.log(err);
			}
		}
		fetchBill();
	}, [username, id]);

	const handleSplitByChange = (e) => {
		const { value } = e.target;
		setBill((data) => ({
			...data,
			split_by: value,
		}));
	};

	const handleFieldChange = (e, idx, type) => {
		const { value } = e.target;
		const updatedFields = bill.fields;
		updatedFields[idx] = { ...updatedFields[idx], [type]: value };
		setBill((data) => ({
			...data,
			fields: updatedFields,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const result = await BillsApi.update(
			username,
			id,
			bill.fields,
			bill.bill_name,
			bill.split_by
		);
		console.log(result);
		navigate(`/bills/${username}/${id}`);
	};

	return (
		<div className="wrap">
			<form className="billdetails__card" onSubmit={handleSubmit}>
				<div className="bill__header">
					<h1>Editing {bill.bill_name}</h1>
				</div>
				<div className="table">
					<div className="table-head">
						<div className="table-row">
							<p className="head--left category">Category</p>
							<p className="head--right amount">Amount</p>
						</div>
					</div>
					<div className="table-body">
						{bill.fields.map((f, idx) => (
							<div key={idx} className="table-row input-container">
								<input
									className="category"
									value={f.category}
									type="text"
									onChange={(e) => handleFieldChange(e, idx, "category")}
								/>
								<input
									className="amount"
									value={f.amount}
									min="0"
									step="0.01"
									type="number"
									onChange={(e) => handleFieldChange(e, idx, "amount")}
								/>
							</div>
						))}
					</div>
					<div>
						<div className="table-row input-container">
							<p className="category"># of People</p>
							<input
								className="amount"
								value={bill.split_by}
								min="1"
								max="50"
								name="split_by"
								type="number"
								onChange={handleSplitByChange}
							/>
						</div>
					</div>
				</div>

				<div className="bill__footer">
					<button
						className="form-btn btn-scale"
						onClick={() => navigate(`/bills/${username}/${id}`)}
					>
						Cancel
					</button>
					<button className="form-btn btn-scale" type="submit">
						Save Changes
					</button>
				</div>
			</form>
		</div>
	);
};

export default BillEdit;
