import React from "react";
import { Route, Routes } from "react-router";
import { Navigate } from "react-router";
import Home from "../Home/Home";
import CreateBill from "../Create/CreateBill";
import MyBills from "../MyBills/MyBills";
import Bill from "../MyBills/Bill";
import BillEdit from "../MyBills/BillEdit";
import Login from "../auth/Login";
import Register from "../auth/Register";
import PrivateRoute from "./PrivateRoute";

/** Site-wide routes.
 *
 * Parts of site should only be visitable when logged in. Those routes are
 * wrapped by <PrivateRoute>, which is an authorization component.
 *
 * Visiting a non-existant route redirects to the homepage.
 */

function AllRoutes({ login, signup }) {
	return (
		<Routes>
			<Route path="/" exact element={<Home />} />
			<Route
				path="/new"
				exact
				element={
					<PrivateRoute>
						<CreateBill />
					</PrivateRoute>
				}
			/>
			<Route
				path="/bills"
				exact
				element={
					<PrivateRoute>
						<MyBills />
					</PrivateRoute>
				}
			/>
			<Route
				path="/bills/:username/:id"
				exact
				element={
					<PrivateRoute>
						<Bill />
					</PrivateRoute>
				}
			/>
			<Route
				path="/bills/:username/:id/edit"
				exact
				element={
					<PrivateRoute>
						<BillEdit />
					</PrivateRoute>
				}
			/>
			<Route path="/login" exact element={<Login login={login} />} />
			<Route path="/register" exact element={<Register signup={signup} />} />
			<Route path="*" element={<Navigate to="/login" replace />} />
		</Routes>
	);
}

export default AllRoutes;
