import "./App.css";
import { useEffect, useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import UserContext from "./auth/UserContext";
import BillsApi from "./Api";
import { decodeToken } from "react-jwt";
import AllRoutes from "./Routes-nav/Routes";
import NavBar from "./Routes-nav/NavBar";

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "bills-token";

function App() {
	const [currentUser, setCurrentUser] = useState(null);
	const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

	useEffect(
		function loadUserInfo() {
			console.debug("App useEffect loadUserInfo", "token=", token);
			async function getCurrentUser() {
				if (token) {
					try {
						let { username } = decodeToken(token);
						// put the token on the Api class so it can use it to call the API.
						BillsApi.token = token;
						let currentUser = await BillsApi.getCurrentUser(username);
						setCurrentUser(currentUser);
					} catch (err) {
						console.error("App loadUserInfo: problem loading", err);
						setCurrentUser(null);
					}
				}
			}
			getCurrentUser();
		},
		[token]
	);

	/** Handles site-wide logout. */
	function logout() {
		setCurrentUser(null);
		setToken(null);
	}

	/** Handles site-wide signup.
	 *
	 * Automatically logs them in (set token) upon signup.
	 *
	 * Make sure you await this function and check its return value!
	 */
	async function signup(signupData) {
		try {
			let token = await BillsApi.signup(signupData);
			setToken(token);
			return { success: true };
		} catch (errors) {
			console.error("signup failed", errors);
			return { success: false, errors };
		}
	}

	/** Handles site-wide login.
	 *
	 * Make sure you await this function and check its return value!
	 */
	async function login(loginData) {
		try {
			let token = await BillsApi.login(loginData);
			setToken(token);
			return { success: true };
		} catch (errors) {
			console.error("login failed", errors);
			return { success: false, errors };
		}
	}

	return (
		<UserContext.Provider value={{ currentUser, setCurrentUser }}>
			<div className="App">
				<NavBar logout={logout} />
				<AllRoutes login={login} signup={signup} />
			</div>
		</UserContext.Provider>
	);
}

export default App;
