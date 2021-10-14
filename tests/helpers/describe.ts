import { Context, suite, uvu } from "uvu";

export const describe = (
	name: string,
	fn: (it: uvu.Test<Context>) => void
): void => {
	const describe = suite(name);
	fn(describe);
	describe.run();
};
