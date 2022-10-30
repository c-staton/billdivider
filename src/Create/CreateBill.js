import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { toWordsOrdinal } from "number-to-words";
import NewFieldForm from "./NewFieldForm";
import "./styles/CreateBill.css";
import { Link } from "react-router-dom";
import BillsApi from "../Api";
import UserContext from "../auth/UserContext";

const CreateBill = () => {
	const [count, setCount] = useState(1);
	const [inputs, setInputs] = useState([]);
	const [haveName, setHaveName] = useState(false);
	const [billName, setBillName] = useState("");
	const [splitBy, setSplitBy] = useState("");

	const { currentUser } = useContext(UserContext);

	const navigate = useNavigate();

	const addField = (newField) => {
		let updatedInputs = [...inputs];
		updatedInputs.splice(count - 1);
		updatedInputs[count - 1] = newField;
		setInputs(updatedInputs);
	};

	const nextPrompt = () => {
		setCount(count + 1);
	};

	const lastPrompt = () => {
		if (count !== 1) {
			setCount(count - 1);
		}
	};

	const resetHaveName = () => {
		setHaveName(false);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (haveName) {
			const result = await BillsApi.create(
				currentUser.username,
				inputs,
				billName,
				splitBy
			);
			navigate(`/bills/${result.username}/${result.id}`);
		} else {
			setHaveName(true);
		}
	};

	if (haveName)
		return (
			<div className="wrap">
				<div key={count} className="card">
					<span className="card__header">Name your bill:</span>
					<NewFieldForm
						addField={addField}
						nextPrompt={nextPrompt}
						haveName={haveName}
						submit={handleSubmit}
						billName={billName}
						setBillName={setBillName}
						splitBy={splitBy}
						setSplitBy={setSplitBy}
					/>
					<div className="card__footer">
						<Link onClick={resetHaveName} className="back">
							Back
						</Link>
					</div>
				</div>
			</div>
		);

	return (
		<div className="wrap">
			<div key={count} className="card">
				<span className="card__header">
					Add your <span className="ordinal">{toWordsOrdinal(count)}</span>{" "}
					cost:
				</span>
				<NewFieldForm
					addField={addField}
					nextPrompt={nextPrompt}
					haveName={haveName}
				/>
				<div className="card__footer">
					{count > 1 ? (
						<>
							<Link onClick={lastPrompt} className="back">
								Back
							</Link>
							<Link to="/" className="finished" onClick={handleSubmit}>
								Finish
							</Link>
						</>
					) : (
						<div></div>
					)}
				</div>
			</div>
		</div>
	);
};

export default CreateBill;
