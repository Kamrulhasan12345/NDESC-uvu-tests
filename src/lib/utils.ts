import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
	service: "Gmail",
	auth: {
		user: process.env.MAIL,
		pass: process.env.PASSWORD,
	},
});

export const dateOptions = {
	timeZone: "Asia/Dhaka",
	year: "numeric",
	month: "long",
	day: "numeric",
	hour: "2-digit",
	minute: "2-digit",
	second: "2-digit",
} as unknown;

// export const calcTime = async (): Promise<string> => {
// 	return new Promise((resolve) => {
// 		resolve(
// 			new Date().toLocaleString("en-US", {
// 				timeZone: "Asia/Dhaka",
// 				year: "numeric",
// 				month: "long",
// 				day: "numeric",
// 				hour: "2-digit",
// 				minute: "2-digit",
// 				second: "2-digit",
// 			})
// 		);
// 	});
// };

export const handleE = async (e: Error, procPath: string): Promise<boolean> => {
	console.error(e);
	return await transport
		.sendMail({
			from: "NDESC API error <ndescweb@gmail.com>",
			to: ["ndescweb@gmail.com", "kamrulhasan59246@gmail.com"],
			subject: `${procPath}: ${e.message} at ${new Date().toLocaleString(
				"en-US",
				dateOptions
			)}`,
			text: `\`\`\`${e.stack}\`\`\``,
			html: `<pre>${e.stack}</pre>`,
		})
		.then(async () => {
			return true;
		})
		.catch(async (e) => {
			console.error(e);
			return false;
		});
};

export const initJobs = async (): Promise<number> =>
	process.env.SALTR ? (global.saltR = parseInt(process.env.SALTR)) : undefined;
