export interface User {
	username: string;
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	col_no: number;
	avatar: string;
}

export interface UserResp {
	code: number;
	user?: User;
}

export interface UserExistsResp {
	code: number;
	exists?: boolean;
}

export interface CodeResp {
	code: number;
}
