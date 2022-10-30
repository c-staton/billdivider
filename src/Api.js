import axios from "axios";

const BASE_URL = "http://localhost:3001";

class BillsApi {
	static async request(endpoint, data = {}, method = "get", headers) {
		console.debug("API Call:", endpoint, data, method);

		const url = `${BASE_URL}/${endpoint}`;
		const params = method === "get" ? data : {};

		try {
			return (await axios({ url, method, data, params })).data;
		} catch (err) {
			console.error("API Error:", err.response);
			let message = err.response.data.error.message;
			throw Array.isArray(message) ? message : [message];
		}
	}

	static async getBillsByUsername(username) {
		const result = await this.request(`bills/${username}`);
		const bills = result.bills;
		return bills;
	}

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

	static async getBillById(username, billId) {
		const result = await this.request(`bills/${username}/${billId}`);
		const bill = result.bill;
		return bill;
	}

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
