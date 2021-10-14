export default {
	prefix: "ERR_NDESC_API_",
	codes: {
		lib: {
			DBHandler: {
				RU502_46: "registerUser()",
				FU501_33: "fetchUser()",
				CU500_29: "checkUser()",
			},
		},
		routes: {
			users: {
				SK14_45: "POST /users/signup",
				UN12_38: "GET /users/un/:username",
				SK13_34: "GET /users/sk/:sessionkey",
			},
		},
	},
};
