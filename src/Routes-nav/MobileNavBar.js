import React, { useContext } from "react";
import UserContext from "../auth/UserContext";

const MobileNavBar = () => {
	const { currentUser } = useContext(UserContext);

	const loggedIn = () => {
		return (
			<div>
				<></>
			</div>
		);
	};

	const loggedOut = () => {
		return (
			<div>
				<></>
			</div>
		);
	};

	return (
		<div>
			<></>
		</div>
	);
};

export default MobileNavBar;
