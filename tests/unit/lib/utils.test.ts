import assert from "assert";
import sinon from "sinon";
import Mail from "nodemailer/lib/mailer/index.js";

import { describe } from "../../helpers/describe.js";
import * as utils from "../../../src/lib/utils.js";

// describe("Function: calcTime", (it) => {
// 	it("is returning corrrectly in same timezone", async () => {
// 		const clock = sinon.useFakeTimers(new Date(2021, 9, 24, 6, 50, 30));
// 		try {
// 			const time = await utils.calcTime();
// 			assert.equal(time, "October 24, 2021, 06:50:30 AM");
// 		} finally {
// 			clock.restore();
// 		}
// 	});
// 	it("is returning correctly in different timezone", async () => {
// 		process.env.TZ = "Europe/London";
// 		const clock = sinon.useFakeTimers(new Date(2021, 9, 24, 6, 50, 30));
// 		try {
// 			const time = await utils.calcTime();
// 			assert.equal(time, "October 24, 2021, 11:50:30 AM");
// 		} finally {
// 			clock.restore();
// 			process.env.TZ = "Asia/Dhaka";
// 		}
// 	});
// });

describe("Function: handleE", (it) => {
	const e: Error = {
		name: "An error",
		message: "An error",
		stack: "Blah",
	};

	let stubMailer: sinon.SinonStub;
	let stubConsole: sinon.SinonStub;

	it.before.each(() => {
		stubMailer = sinon.stub(Mail.prototype, "sendMail");
		stubConsole = sinon.stub(console, "error");
	});

	it.after.each(() => (stubMailer.restore(), stubConsole.restore()));

	it("is consoling errors", async () => {
		stubMailer.returns(Promise.resolve(true));
		await utils.handleE(e, "Testing with uvu");
		assert(
			stubConsole.calledWith(e),
			"Function console.error() should be called with error"
		);
	});

	it("is mailing errors with correct parameters in same timezone", async () => {
		process.env.TZ = "Asia/Dhaka";
		const clock = sinon.useFakeTimers(new Date(2021, 9, 24, 6, 50, 30));
		stubMailer.returns(Promise.resolve(true));
		const expectedParams = {
			from: "NDESC API error <ndescweb@gmail.com>",
			to: ["ndescweb@gmail.com", "kamrulhasan59246@gmail.com"],
			subject: `${"Testing with uvu"}: ${
				e.message
			} at October 24, 2021, 06:50:30 AM`,
			text: `\`\`\`${e.stack}\`\`\``,
			html: `<pre>${e.stack}</pre>`,
		};
		try {
			const sentError = await utils.handleE(e, "Testing with uvu");
			assert(sentError, "The mailer should mail errors:");
			assert(
				stubMailer.calledWith(expectedParams),
				"the error should be sent with correct paramaters:"
			);
		} finally {
			clock.restore();
		}
	});

	it("is mailing errors with correct parameters in different timezone", async () => {
		process.env.TZ = "Europe/London";
		const clock = sinon.useFakeTimers(new Date(2021, 9, 24, 6, 50, 30));
		stubMailer.returns(Promise.resolve(true));
		const expectedParams = {
			from: "NDESC API error <ndescweb@gmail.com>",
			to: ["ndescweb@gmail.com", "kamrulhasan59246@gmail.com"],
			subject: `${"Testing with uvu"}: ${
				e.message
			} at October 24, 2021, 11:50:30 AM`,
			text: `\`\`\`${e.stack}\`\`\``,
			html: `<pre>${e.stack}</pre>`,
		};
		try {
			const sentError = await utils.handleE(e, "Testing with uvu");
			assert(sentError, "The mailer should mail errors:");
			assert(
				stubMailer.calledWith(expectedParams),
				"The error should be sent with correct paramaters:"
			);
		} finally {
			clock.restore();
		}
	});

	it("is consoling mailing errors", async () => {
		const error = new Error("An error");
		try {
			stubMailer.returns(Promise.reject(new Error("Mailing error")));
			await utils.handleE(error, "Testing with uvu");
		} catch (e) {
			assert.equal(e, "Mailing error");
			assert(stubConsole.calledOnce);
		}
	});
});

describe("Function: initJobs", (it) => {
	it.before.each(() => {
		global.saltR = undefined;
	});

	it("is setting salt to global if salt is in env", async () => {
		await utils.initJobs();
		assert.equal(global.saltR, 10, "The salt value should return 10");
	});

	it("is returning undefined if salt is not in env", async () => {
		process.env.SALTR = undefined;
		const isSet = await utils.initJobs();
		assert.equal(isSet, NaN, "Function initJobs() should return NaN:");
		assert.notEqual(global.saltR, 10, "The salt value should not return 10");
	});
});
