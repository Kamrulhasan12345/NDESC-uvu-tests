import assert from "assert";
import bcrypt from "bcrypt";
import sinon, { SinonSpy, SinonStub } from "sinon";

import { describe } from "../../helpers/describe.js";
import * as DBHandler from "../../../src/lib/DBHandler.js";
import { db, users } from "../../../src/lib/initDB.js";
import Mail from "nodemailer/lib/mailer/index.js";
import {
	userValues,
	data,
	invalidData,
	userRefData,
	aUser,
	invalidRefData,
} from "../../helpers/variables.js";
import { initJobs } from "../../../src/lib/utils.js";

describe("Function: registerUser", (it) => {
	initJobs();

	let UserChild: SinonStub;
	let UserOnce: SinonStub;
	let BcryptHash: SinonStub;

	it.before.each(() => {
		UserChild = sinon.stub(users, "child").returns(users);
		UserOnce = sinon.stub(users, "once").resolves(data);
		BcryptHash = sinon.stub(bcrypt, "hash").resolves(aUser.user.password);
	});

	it.after.each(
		() => (UserChild.restore(), UserOnce.restore(), BcryptHash.restore())
	);

	it("is returning 201 on correctly registering user", async () => {
		const userRegistered = await DBHandler.registerUser(aUser.user);
		assert.equal(userRegistered.code, 200);
	});
	// db.goOffline();
});

describe("Function: fetchUser", (it) => {
	// db.goOnline();

	let UserChild: SinonStub;
	let UserOrderChild: SinonStub;
	let UserEqualTo: SinonStub;
	let UserOnce: SinonStub;

	it.before.each(() => {
		UserChild = sinon.stub(users, "child").returns(users);
		UserOnce = sinon.stub(users, "once").resolves(data);
		UserOrderChild = sinon.stub(users, "orderByChild").returns(users);
		UserEqualTo = sinon.stub(users, "equalTo").returns(users);
	});

	it.after.each(
		() => (
			UserChild.restore(),
			UserOrderChild.restore(),
			UserEqualTo.restore(),
			UserOnce.restore()
		)
	);

	it("is returning correct data and calling correct functions while passing username only", async () => {
		const user = await DBHandler.fetchUser(userValues.username);
		assert.deepStrictEqual(
			user,
			aUser,
			"The user should return correct datas:"
		);
		assert(UserChild.calledOnce, "Function child() should be called once:");
		assert(UserOnce.calledOnce, "Function once() should be called once:");
		assert(
			!UserOrderChild.calledOnce,
			"Function orderByChild() should not be called:"
		);
		assert(!UserEqualTo.calledOnce, "Function equalTo() should not be called:");
	});

	it("is returning correct data and calling correct functions while passing sessionkey only", async () => {
		UserOnce.resolves(userRefData);
		const user = await DBHandler.fetchUser(undefined, userValues.sessionkey);
		assert.deepStrictEqual(
			user,
			aUser,
			"The user should return correct datas:"
		);
		assert(
			UserOrderChild.calledOnce,
			"Function orderByChild() should be called once:"
		);
		assert(UserOnce.calledOnce, "Function once() should be called once:");
		assert(UserEqualTo.calledOnce, "Function equalTo() should be called once:");
		assert(!UserChild.calledOnce, "Function child() should not be called:");
	});

	it("is returning code 404 when username not found", async () => {
		UserOnce.resolves(invalidData);
		const user = await DBHandler.fetchUser("auser");
		assert.equal(user.code, 404, "The user code should be 404:");
		assert(UserChild.calledOnce, "Function child() should be called once:");
		assert(UserOnce.calledOnce, "Function once() should be called once:");
		assert(
			!UserOrderChild.calledOnce,
			"Function orderByChild() should not be called:"
		);
		assert(!UserEqualTo.calledOnce, "Function equalTo() should not be called:");
	});

	it("is returning code 404 when sessionkey not found", async () => {
		UserOnce.resolves(invalidRefData);
		const user = await DBHandler.fetchUser(undefined, "akey");
		assert.equal(user.code, 404, "The user code should be 404:");
		assert(
			UserOrderChild.calledOnce,
			"Function orderByChild() should be called once:"
		);
		assert(UserOnce.calledOnce, "Function once() should be called once:");
		assert(UserEqualTo.calledOnce, "Function equalTo() should be called once:");
		assert(!UserChild.calledOnce, "Function child() should not be called:");
	});

	it("is returning undefined if no param is passed in it", async () => {
		const user = await DBHandler.fetchUser();
		assert(!user, "The function return value should be falsy:");
		assert(
			!UserOrderChild.calledOnce,
			"Function orderByChild() should not be called:"
		);
		assert(!UserOnce.calledOnce, "Function once() should not be called:");
		assert(!UserEqualTo.calledOnce, "Function equalTo() should not be called:");
		assert(!UserChild.calledOnce, "Function child() should not be called:");
	});

	it("is handling errors", async () => {
		const stubMailer = sinon.stub(Mail.prototype, "sendMail").resolves(true);
		const stubConsole = sinon.stub(console, "error");
		UserOnce.resolves({});
		const user = await DBHandler.fetchUser(userValues.username);
		assert.equal(user.code, 500, "The user should return 500");
		assert(stubMailer.calledOnce, "Function handleE() should be called once:");
		assert(stubConsole.calledOnce, "Function handleE() should be called once:");
		stubMailer.restore();
		stubConsole.restore();
	});
});

describe("Function: checkUser", (it) => {
	let UserChild: SinonStub;
	let UserOrderChild: SinonStub;
	let UserEqualTo: SinonStub;
	let UserOnce: SinonStub;

	it.before.each(() => {
		UserChild = sinon.stub(users, "child").returns(users);
		UserOnce = sinon.stub(users, "once").returns(Promise.resolve(data));
		UserOrderChild = sinon.stub(users, "orderByChild").returns(users);
		UserEqualTo = sinon.stub(users, "equalTo").returns(users);
	});

	it.after.each(
		() => (
			UserChild.restore(),
			UserOrderChild.restore(),
			UserEqualTo.restore(),
			UserOnce.restore()
		)
	);

	it("is returning and calling correct functions while passing username only", async () => {
		const userExists = await DBHandler.checkUser(userValues.username);
		assert.equal(
			userExists.exists,
			true,
			"The user should be found in the database:"
		);
		assert.equal(userExists.code, 200, "The return code should be 200:");
		assert(UserChild.calledOnce, "Function child() should be called once:");
		assert(UserOnce.calledOnce, "Function once() should be called once:");
		assert(
			!UserOrderChild.calledOnce,
			"Function orderByChild() should not be called:"
		);
		assert(!UserEqualTo.calledOnce, "Function equalTo() should not be called:");
	});

	it("is returning and calling correct functions while passing sessionkey only", async () => {
		UserOnce.resolves(userRefData);
		const userExists = await DBHandler.checkUser(
			undefined,
			userValues.sessionkey
		);
		assert.equal(
			userExists.exists,
			true,
			"The user should be found in the database:"
		);
		assert.equal(userExists.code, 200, "The return code should be 200:");
		assert(
			UserOrderChild.calledOnce,
			"Function orderByChild() should be called once:"
		);
		assert(UserOnce.calledOnce, "Function once() should be called once:");
		assert(UserEqualTo.calledOnce, "Function equalTo() should be called once:");
		assert(!UserChild.calledOnce, "Function child() should not be called:");
	});

	it("is returning false when username not found", async () => {
		UserOnce.resolves(invalidData);
		const userExists = await DBHandler.checkUser("auser");
		assert.equal(userExists.code, 200, "The return code should be 200:");
		assert(!userExists.exists, "The user should not be found in the database:");
		assert(UserChild.calledOnce, "Function child() should be called once:");
		assert(UserOnce.calledOnce, "Function once() should be called once:");
		assert(
			!UserOrderChild.calledOnce,
			"Function orderByChild() should not be called:"
		);
		assert(!UserEqualTo.calledOnce, "Function equalTo() should not be called:");
	});

	it("is returning false when sessionkey not found", async () => {
		UserOnce.resolves(invalidRefData);
		const userExists = await DBHandler.checkUser(undefined, "akey");
		assert.equal(userExists.code, 200, "The return code should be 200:");
		assert(!userExists.exists, "The user should not be found in the database:");
		assert(
			UserOrderChild.calledOnce,
			"Function orderByChild() should be called once:"
		);
		assert(UserOnce.calledOnce, "Function once() should be called once:");
		assert(UserEqualTo.calledOnce, "Function equalTo() should be called once:");
		assert(!UserChild.calledOnce, "Function child() should not be called:");
	});

	it("is returning code 400 if no param is passed in it", async () => {
		const userExists = await DBHandler.checkUser();
		assert.equal(userExists.code, 400, "The function return code 400:");
		assert(
			!UserOrderChild.calledOnce,
			"Function orderByChild() should not be called:"
		);
		assert(!UserOnce.calledOnce, "Function once() should not be called:");
		assert(!UserEqualTo.calledOnce, "Function equalTo() should not be called:");
		assert(!UserChild.calledOnce, "Function child() should not be called:");
	});

	it("is handling errors", async () => {
		const stubMailer = sinon.stub(Mail.prototype, "sendMail").resolves(true);
		const stubConsole = sinon.stub(console, "error");
		UserOnce.resolves({});
		const userExists = await DBHandler.checkUser(userValues.username);
		assert.equal(
			userExists.code,
			500,
			"Function checkUser() code should return 500"
		);
		assert(stubMailer.calledOnce, "Function handleE() should be called once:");
		assert(stubConsole.calledOnce, "Function handleE() should be called once:");
		stubMailer.restore();
		stubConsole.restore();
	});

	db.goOffline();
});

process.on("SIGTERM", () => {
	db.goOffline();
});
process.on("exit", () => {
	db.goOffline();
});
