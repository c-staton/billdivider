import React, { useContext, useState } from "react";
import "./MobileNavBar.css";
import menuIcon from "../images/hamburger.png";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";

const MobileNavBar = ({ logout }) => {
	const [isNavExpanded, setIsNavExpanded] = useState(false);

	const { currentUser } = useContext(UserContext);

	const switchState = () => {
		setIsNavExpanded(!isNavExpanded);
	};

	const loggedIn = () => {
		return (
			<>
				<div className="nav-menu__item">
					<NavLink to="/bills" onClick={switchState}>
						My Bills
					</NavLink>
				</div>
				<div className="nav-menu__item">
					<Link
						to="/"
						onClick={() => {
							logout();
							switchState();
						}}
					>
						Log out
					</Link>
				</div>
			</>
		);
	};

	const loggedOut = () => {
		return (
			<>
				<div className="nav-menu__item">
					<NavLink to="/login" onClick={switchState}>
						Login
					</NavLink>
				</div>
				<div className="nav-menu__item">
					<NavLink to="/register" onClick={switchState}>
						Sign Up
					</NavLink>
				</div>
			</>
		);
	};

	return (
		<div className={`mobile-nav ${isNavExpanded ? "bg-white" : null}`}>
			<div className="top-bar">
				<div>
					<h1 className="mobile-nav__h1">Bill Divider</h1>
				</div>
				<div>
					<button onClick={switchState} className="mobile-nav__btn">
						<img src={menuIcon} alt="menu" />
					</button>
				</div>
			</div>
			<div className={`nav-menu ${isNavExpanded ? null : "display-none"}`}>
				<div className="nav-menu__item">
					<NavLink to="/" onClick={switchState}>
						Home
					</NavLink>
				</div>
				<div className="nav-menu__item">
					<NavLink to="/new" onClick={switchState}>
						Create New Bill
					</NavLink>
				</div>
				{currentUser ? loggedIn() : loggedOut()}
			</div>
		</div>
	);
};

export default MobileNavBar;
