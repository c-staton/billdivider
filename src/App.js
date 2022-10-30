import { Route, Routes } from "react-router";
import Bill from "./MyBills/Bill";
import "./App.css";
import CreateBill from "./Create/CreateBill";
import Home from "./Home/Home";
import MyBills from "./MyBills/MyBills";
import NavBar from "./NavBar";
import Login from "./Login";
import Register from "./Register";
import BillEdit from "./MyBills/BillEdit";

function App() {
	return (
		<div className="App">
			<NavBar />
			<Routes>
				<Route path="/" exact element={<Home />} />
				<Route path="/new" exact element={<CreateBill />} />
				<Route path="/bills" exact element={<MyBills />} />
				<Route path="/bills/:username/:id" exact element={<Bill />} />
				<Route path="/bills/:username/:id/edit" exact element={<BillEdit />} />
				<Route path="/login" exact element={<Login />} />
				<Route path="/register" exact element={<Register />} />
			</Routes>
		</div>
	);
}

export default App;
