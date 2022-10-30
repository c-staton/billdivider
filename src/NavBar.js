import { NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
	return (
		<div className="navbar">
			<div className="navbar__item">
				<NavLink to="/">Home</NavLink>
				<NavLink to="/new">Create New Bill</NavLink>
			</div>
			<div className="navbar__item">
				<NavLink to="/bills">My Bills</NavLink>
				<NavLink to="/">Logout</NavLink>
			</div>
		</div>
	);
};

export default NavBar;
