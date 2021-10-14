import assert from "assert";
import sinon, { SinonStub } from "sinon";
import supertest from "supertest";

import { describe } from "../../helpers/describe.js";
import router from "../../../src/routes/users.js";
import { db, users } from "../../../src/lib/initDB.js";
import messages from "../../../src/lib/messages.js";
import {
	userValues,
	data,
	invalidData,
	userRefData,
	aUser,
	invalidRefData,
} from "../../helpers/variables.js";
import Mail from "nodemailer/lib/mailer/index.js";

const server = router.listen(0);
const fetch = supertest(server);

// describe("POST /users/signup", (it) => {
// 	it.skip();
// });

describe("GET /users/un/:username", (it) => {
	// db.goOnline();

	let UserChild: SinonStub;
	let UserOnce: SinonStub;

	it.before.each(() => {
		UserChild = sinon.stub(users, "child").returns(users);
		UserOnce = sinon.stub(users, "once").resolves(data);
	});

	it.after.each(() => (UserChild.restore(), UserOnce.restore()));

	it("is returning correct data", async () => {
		await fetch.get("/un/" + userValues.username).expect(200, aUser);
	});

	it("is returning user not found in some cases", async () => {
		UserOnce.resolves(invalidData);
		await fetch.get("/un/auser").expect(404, {
			code: 404,
			message: messages[404],
		});
	});

	it("is returning 500 in some cases", async () => {
		const stubMailer = sinon.stub(Mail.prototype, "sendMail").resolves(true);
		const stubConsole = sinon.stub(console, "error");
		UserOnce.resolves({});
		await fetch.get("/un/auser").expect(500, {
			code: 500,
			message: messages[500],
			error: "FU501_33",
		});
		assert(stubMailer.calledOnce, "Function handleE() should be called once:");
		assert(stubConsole.calledOnce, "Function handleE() should be called once:");
		stubMailer.restore();
		stubConsole.restore();
	});

	// it("is handling errors", async () => {
	// 	const stubMailer = sinon
	// 		.stub(Mail.prototype, "sendMail")
	// 		.returns(Promise.resolve(true));
	// 	const stubConsole = sinon.stub(console, "error");
	// 	UserOnce.returns(Promise.resolve({}));
	// 	await fetch.get("/un/auser").expect(500, { message: messages.SERVER_500 });
	// 	stubMailer.calledOnce, "Function handleE() should be called once:";
	// 	assert(stubConsole.calledOnce, "Function handleE() should be called once:");
	// 	stubMailer.restore();
	// 	stubConsole.restore();
	// });

	db.goOffline();
});

describe("GET /users/sk/:sessionkey", (it) => {
	db.goOnline();

	let UserOnce: SinonStub;
	let UserOrderChild: SinonStub;
	let UserEqualTo: SinonStub;

	it.before.each(() => {
		UserOnce = sinon.stub(users, "once").resolves(userRefData);
		UserOrderChild = sinon.stub(users, "orderByChild").returns(users);
		UserEqualTo = sinon.stub(users, "equalTo").returns(users);
	});

	it.after.each(
		() => (UserOrderChild.restore(), UserEqualTo.restore(), UserOnce.restore())
	);

	it("is returning correct data", async () => {
		await fetch.get("/sk/" + userValues.sessionkey).expect(200, aUser);
	});

	it("is returning user not found in some cases", async () => {
		UserOnce.resolves(invalidRefData);
		await fetch.get("/sk/akey").expect(404, {
			code: 404,
			message: messages[404],
		});
	});

	it("is returning 500 in function fetchUser error cases", async () => {
		const stubMailer = sinon.stub(Mail.prototype, "sendMail").resolves(true);
		const stubConsole = sinon.stub(console, "error");
		UserOnce.resolves({});
		await fetch.get("/sk/akey").expect(500, {
			code: 500,
			message: messages[500],
			error: "FU501_33",
		});
		assert(stubMailer.calledOnce, "Function handleE() should be called once:");
		assert(stubConsole.calledOnce, "Function handleE() should be called once:");
		stubMailer.restore();
		stubConsole.restore();
		// log();
		// process.exit(0);
	});

	db.goOffline();
});
