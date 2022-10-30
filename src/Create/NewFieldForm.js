import React, { useState } from "react";

const NewFieldForm = ({
	addField,
	nextPrompt,
	haveName,
	submit,
	billName,
	setBillName,
	splitBy,
	setSplitBy,
}) => {
	const [category, setCategory] = useState("Rent");
	const [amount, setAmount] = useState("");
	const [isCustom, setIsCustom] = useState(false);
	const [customField, setCustomField] = useState("");

	const handleSelectChange = (e) => {
		const val = e.target.value;
		setCategory(val);
		if (val === "Custom") {
			setIsCustom(true);
		} else {
			setIsCustom(false);
		}
	};

	const handleChange = (e, setVal) => {
		const val = e.target.value;
		setVal(val);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (category === "Custom") {
			addField({ category: customField, amount });
			nextPrompt();
		} else {
			addField({ category, amount });
			nextPrompt();
		}
	};

	if (haveName) {
		return (
			<form onSubmit={submit}>
				<div className="form__group">
					<input
						value={billName}
						onChange={(e) => handleChange(e, setBillName)}
						placeholder="Name"
						name="name"
						className="form__field"
						id="name"
						maxLength="30"
						required
					/>
					<label htmlFor="name" className="form__label">
						Name
					</label>
				</div>
				<div className="form__group">
					<input
						value={splitBy}
						onChange={(e) => handleChange(e, setSplitBy)}
						placeholder="# of People"
						name="splitBy"
						className="form__field"
						type="number"
						id="splitBy"
						min="1"
						max="50"
						step="1"
						required
					/>
					<label htmlFor="splitBy" className="form__label">
						# of People
					</label>
				</div>
				<button className="form-btn create-btn">Create Bill</button>
			</form>
		);
	} else
		return (
			<form onSubmit={handleSubmit}>
				<div className="form__group">
					<select
						value={category}
						onChange={handleSelectChange}
						className="form__field"
						name="category"
						id="category"
					>
						<option>Rent</option>
						<option>Food</option>
						<option>Utilities</option>
						<option>Insurance</option>
						<option>Transportation</option>
						<option>Custom</option>
					</select>
					<label htmlFor="category" className="form__label">
						Category
					</label>
				</div>
				{isCustom ? (
					<div className="form__group">
						<input
							value={customField}
							onChange={(e) => handleChange(e, setCustomField)}
							placeholder="Category"
							name="custom"
							className="form__field"
							id="custom"
							maxLength="20"
							required
						/>
						<label htmlFor="custom" className="form__label">
							Custom Category
						</label>
					</div>
				) : null}
				<div className="form__group">
					<input
						id="amount"
						className="form__field"
						placeholder="712"
						width="50px"
						name="amount"
						type="number"
						min="0.01"
						step="0.01"
						value={amount}
						onChange={(e) => handleChange(e, setAmount)}
						required
					/>
					<label htmlFor="amount" className="form__label">
						Amount
					</label>
				</div>
				<button className="form-btn finishBtn">Add</button>
			</form>
		);
};

export default NewFieldForm;
