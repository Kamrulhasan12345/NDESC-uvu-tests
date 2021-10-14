/* eslint-disable @typescript-eslint/no-unused-vars */
import * as bcrypt from "bcrypt";
import { DataSnapshot } from "@firebase/database-types";

import { users } from "./initDB.js";
import { User, UserExistsResp, UserResp } from "./types.js";
import { handleE } from "./utils.js";

export const registerUser = async (
	user: User
): Promise<Record<string, number>> => {
	try {
		const dataExists = await (
			await users.child(user.username).once("value")
		).exists();
		if (!dataExists) {
			return { code: 400 };
		}
		const password = await bcrypt.hash(user.password, global.saltR);
		return { code: 200 };
	} catch (e) {
		await handleE(e, "ERR RU502 (in registerUser())");
		return await { code: 500 };
	}
};

// export const loginUser = async (
// 	username: string,
// 	password: string
// ): Promise<string | boolean> => {
// 	return;
// };

// export const deleteUser = async (username: string): Promise<void> => {
// 	return;
// };

export const fetchUser = async (
	username?: string,
	sessionkey?: string
): Promise<UserResp> => {
	try {
		let data: DataSnapshot;
		let user: User;
		let temp: unknown;
		if (username) {
			data = await users.child(username).once("value");
			if (!data.exists()) {
				return { code: 404 };
			}
			user = await data.val();
		} else if (sessionkey) {
			data = await users
				.orderByChild("sessionkey")
				.equalTo(sessionkey)
				.once("value");
			if (!data.exists()) {
				return { code: 404 };
			}
			temp = await data.val();
			username = Object.keys(temp)[0];
			user = temp[username];
		} else {
			return;
		}
		return {
			code: 200,
			user: {
				username: username,
				first_name: user.first_name,
				last_name: user.last_name,
				email: user.email,
				password: user.password,
				col_no: user.col_no,
				avatar: user.avatar,
			},
		};
	} catch (e) {
		await handleE(e, "ERR FU501 (in fetchUser())");
		return { code: 500 };
	}
};

export const checkUser = async (
	username?: string,
	sessionkey?: string
): Promise<UserExistsResp> => {
	try {
		let data: DataSnapshot;
		if (username) {
			data = await users.child(username).once("value");
		} else if (sessionkey) {
			data = await users
				.orderByChild("sessionkey")
				.equalTo(sessionkey)
				.once("value");
		} else {
			return { code: 400 };
		}
		return { code: 200, exists: data.exists() };
	} catch (e) {
		await handleE(e, "ERR CU500 (in checkUser())");
		return { code: 500 };
	}
};
