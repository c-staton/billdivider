import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class BillsApi {
	static token;

	static async request(endpoint, data = {}, method = "get") {
		console.debug("API Call:", endpoint, data, method);

		const url = `${BASE_URL}/${endpoint}`;
		const headers = { Authorization: `Bearer ${BillsApi.token}` };
		const params = method === "get" ? data : {};

		try {
			return (await axios({ url, method, data, params, headers })).data;
		} catch (err) {
			console.error("API Error:", err.response);
			let message = err.response.data.error.message;
			throw Array.isArray(message) ? message : [message];
		}
	}

	/** Get the current user. */
	static async getCurrentUser(username) {
		let result = await this.request(`users/${username}`);
		const user = result.user;
		return user;
	}

	/** Get token for login from username, password. */
	static async login(data) {
		let res = await this.request(`auth/token`, data, "post");
		return res.token;
	}

	/** Signup for site. */
	static async signup(data) {
		let res = await this.request(`auth/register`, data, "post");
		return res.token;
	}

	/** Save user profile page. */
	static async saveProfile(username, data) {
		let res = await this.request(`users/${username}`, data, "patch");
		return res.user;
	}

	/** Get all bills from specific user */
	static async getBillsByUsername(username) {
		const result = await this.request(`bills/${username}`);
		const bills = result.bills;
		return bills;
	}

	/** Create a new bill */
	static async create(username, fields, billName, split_by) {
		const result = await this.request(
			`bills/${username}`,
			{
				username,
				fields,
				billName,
				split_by,
			},
			"post"
		);
		const bill = result.bill;
		return bill;
	}

	/** Get a specific bill by id */
	static async getBillById(username, billId) {
		const result = await this.request(`bills/${username}/${billId}`);
		const bill = result.bill;
		return bill;
	}

	/** Update a specific bill*/
	static async update(username, billId, fields, billName, split_by) {
		const result = await this.request(
			`bills/${username}/${billId}`,
			{
				id: billId,
				fields,
				billName,
				split_by,
			},
			"patch"
		);
		const bill = result.bill;
		return bill;
	}
}

export default BillsApi;
