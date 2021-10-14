import { DataSnapshot } from "@firebase/database-types";

export const userValues = {
	username: "testuser",
	sessionkey: "d5a39915-11e9-44af-b63d-57d99f9a6c4b",
};

export const data = {
	async val(): Promise<Record<string, string | number>> {
		return {
			col_no: 0o0,
			email: "testuser@testdomain.com",
			first_name: "test",
			last_name: "user",
			password: "$2b$10$mHpTwpZzt/WDNLySlP4MZ.9TSJ/1MBRpCwrUZ1WwRrPz4aHzjviDG",
			avatar: "testpic",
		};
	},
	exists(): boolean {
		return true;
	},
} as unknown as DataSnapshot;

export const userRefData = {
	async val(): Promise<Record<string, Record<string, string | number>>> {
		return {
			testuser: {
				col_no: 0o0,
				email: "testuser@testdomain.com",
				first_name: "test",
				last_name: "user",
				password:
					"$2b$10$mHpTwpZzt/WDNLySlP4MZ.9TSJ/1MBRpCwrUZ1WwRrPz4aHzjviDG",
				avatar: "testpic",
			},
		};
	},
	exists(): boolean {
		return true;
	},
} as unknown as DataSnapshot;

export const invalidData = {
	async val(): Promise<Record<string, string>> {
		return null;
	},
	exists(): boolean {
		return false;
	},
} as unknown as DataSnapshot;

export const invalidRefData = {
	async val(): Promise<Record<string, string>> {
		return {};
	},
	exists(): boolean {
		return false;
	},
} as unknown as DataSnapshot;

export const aUser = {
	code: 200,
	user: {
		username: "testuser",
		col_no: 0o0,
		email: "testuser@testdomain.com",
		first_name: "test",
		last_name: "user",
		password: "$2b$10$mHpTwpZzt/WDNLySlP4MZ.9TSJ/1MBRpCwrUZ1WwRrPz4aHzjviDG",
		avatar: "testpic",
	},
};
