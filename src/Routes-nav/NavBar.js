import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./NavBar.css";

const NavBar = ({ logout }) => {
	const { currentUser } = useContext(UserContext);

	const loggedIn = () => {
		return (
			<div className="navbar__item">
				<NavLink to="/bills">My Bills</NavLink>
				<Link to="/" onClick={logout}>
					Log out ({currentUser.username})
				</Link>
			</div>
		);
	};

	const loggedOut = () => {
		return (
			<div className="navbar__item">
				<NavLink to="/register">Sign Up</NavLink>
				<NavLink to="/login">Login</NavLink>
			</div>
		);
	};

	return (
		<div className="navbar">
			<div className="navbar__item">
				<NavLink to="/">Home</NavLink>
				<NavLink to="/new">Create New Bill</NavLink>
			</div>
			{currentUser ? loggedIn() : loggedOut()}
		</div>
	);
};

export default NavBar;
