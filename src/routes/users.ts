import { Request, Response } from "@tinyhttp/app";
import { App } from "@tinyhttp/app";

import { checkUser, fetchUser, registerUser } from "../lib/DBHandler.js";
import { handleE } from "../lib/utils.js";
import messages from "../lib/messages.js";
import { User } from "../lib/types.js";
import bodyParser from "body-parser";

const router = new App();

router.use(bodyParser.json());

router.post("/signup", async (req: Request, res: Response) => {
	try {
		if (
			!req.body.username &&
			!req.body.first_name &&
			!req.body.last_name &&
			!req.body.email &&
			!req.body.password &&
			!req.body.col_no &&
			!req.body.avatar
		) {
			return await res.status(400).json({ code: 400, message: messages[400] });
		}
		// first check if user exists
		const userExists = await checkUser();
		if (userExists.code == 500) {
			return await res
				.status(500)
				.json({ ...userExists, message: messages[500], error: "CU500_29" });
		} else if (userExists.exists) {
			return await res
				.status(400)
				.json({ code: 400, message: messages[400][1] });
		}
		// now register
		const user = Object.assign(req.body) as User;
		const userRegistered = await registerUser(user);
		if (userRegistered.code == 500) {
			return await res
				.status(500)
				.json({ code: 500, message: messages[500], error: "RU502_46" });
		}
		return await res.status(201).json({ code: 201, message: messages[201][0] });
	} catch (e) {
		await handleE(e, "ERR SU14 (in POST /users/signup)");
		return await res.status(500).json({
			code: 500,
			message: messages[500],
			error: "SU14_45",
		});
	}
});

router.get("/un/:username", async (req: Request, res: Response) => {
	try {
		const username = req.params.username;
		const user = await fetchUser(username);
		if (user.code == 404) {
			return await res.status(404).json({ ...user, message: messages[404] });
		} else if (user.code == 500) {
			return await res.status(500).json({
				...user,
				message: messages[500],
				error: "FU501_33",
			});
		}
		return await res.status(200).json(user);
	} catch (e) {
		await handleE(e, "ERR UN12 (in GET /users/un/:username)");
		return await res.status(500).json({
			code: 500,
			message: messages[500],
			error: "UN12_38",
		});
	}
});

router.get("/sk/:sessionkey", async (req: Request, res: Response) => {
	try {
		const sessionkey = req.params.sessionkey;
		const user = await fetchUser(undefined, sessionkey);
		if (user.code == 404) {
			return await res.status(404).json({ ...user, message: messages[404] });
		} else if (user.code == 500) {
			return await res.status(500).json({
				...user,
				message: messages[500],
				error: "FU501_33",
			});
		}
		return await res.status(200).json(user);
	} catch (e) {
		await handleE(e, "ERR SK13 (in GET /users/sk/:sessionkey)");
		return await res.status(500).json({
			code: 500,
			message: messages[500],
			error: "SK13_34",
		});
	}
});

export default router;
