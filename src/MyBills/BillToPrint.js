import React from "react";
import "./BillToPrint.css";
import dateFormat from "dateformat";

const BillToPrint = React.forwardRef(({ bill, addCommas, billTotal }, ref) => {
	return (
		<div ref={ref} className="print">
			<div className="print__body">
				<h1>{bill.bill_name}</h1>
				<div className="print__body--info">
					<p>
						Created By: <b>{bill.username}</b>
					</p>
					<p>
						Created on: <b>{dateFormat(bill.created_date, "mmm dS, yyyy")}</b>
					</p>
				</div>
				<div className="table print__body--table">
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
								{addCommas(Math.round((billTotal / bill.split_by) * 100) / 100)}
							</p>
						</div>
					</div>
				</div>
				<div className="print__body--tag">
					<a href="https://www.billdivider.com">
						<p>
							Created using <b>billdivider.com</b>
						</p>
					</a>
				</div>
			</div>
		</div>
	);
});

export default BillToPrint;
