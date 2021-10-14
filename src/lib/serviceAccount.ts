import { ServiceAccount } from "firebase-admin/lib/credential/index";

const serviceAccount = {
	type: "service_account",
	project_id: "uvu-tests",
	private_key_id: "83d78f9672754b76054f13a09737733e31ac12a0",
	private_key:
		"-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDFPWcVbZMFCZvd\nie18mOC7+9mqfysMCeuQaRV+jpbgpCy2sfiydFZYd4222uriJo8/eKWuT9WyfaYq\n5YyU/idzu4YUJsliFMbpXGdymVct+KS9UWahw2iQKKYEF3vEG45XU1dhhZDLb00G\npyq2l+LQHeaYNySTeMrcP8S4OoiQkE1MeiOHrEEjIDFm8VzvtiQJe7FyySAqNjzJ\nlhEy7ZGxewoNNEqxgIgUI3Iw8tFiVhavYMTJtPl0mo8BIyfONF7+pnZKGUrW71OI\nysYl6dLSuqzGffj6nGAjiaI4y55twnnzOo4I27R3IlvBfoUXenWvdg6kGTSSutOQ\neZLbd2PlAgMBAAECggEAB0y992+OPOX9pEXaCb34t0xbYnGBbNkjJD2XY48wa1D4\nLKzKiQRAO9b04jsY7VTDAXTcIObogEohL74+JTeAy0o57J4A3wXo1LMsSvP844Er\ny6vrEfqS8J7oggdCd+ATNQ0rEztnv/e3EJN4Q7i8Vrp8kc6cpm6Wh28+vxi/fCYi\nX769nAiQ4RepJZVpsg8KCvUjfxkxNVOffBKgg6k422FucEV22x60EyMGBlDAMrz1\nmVSPC/+Nmk+HJtLnBUPT94XntOX997a/FgGN+uxOb1UNFLXsTm+VZAycjoTjjWhk\nwTy6GxcEWhBMlJF4Wea28Ev9SkOcdE97qwiQetrdwwKBgQDykrLOF1G6qZOGuE9H\nAlZV0H7zZ4V4MCYS6dqnND2tRDgjj+aEGU54CzNP9Ko6yXwMX7RimeGq1V3QkcEe\n0vkWCQ4VwQpGJWlRsfDRhLtLiYs3ec5FNDnWa5CE7sqSe0SCCftfLASsQFpvabCw\ntr30dgNF73DU/GkuqXUlqn1hVwKBgQDQKFM/03EsiJXgboITcy5LS0e8sx00j6N4\nzRdwuChsTjNZ/MKMUxwkNf7XGrDrFlQRWiiSC6plzbdWsyMlg4GoweQ9aNitOjwY\nB6a2/lkUBA4CcE60UUtIlU0eA5x0Wlqy+ezEzxsq7gtZ9zmMCkmwPl0jV6FHX3Em\n062Pto9zIwKBgC9/vFWQyWc0x3eM5bEw6vj4z7MX5VHIk9wGQNOW7jDcd+W2ytu5\nHN1yzARvE1pZk9nUb70TBtZt22X49Ij1pOLEuSZXW4yqzLm7jz1nsUk0ULd3OYXh\nmSW8gFsXa0FNs/eGvts/Alc8brj8SCYCUqXo6fEq1rxOBManVhIfFVgXAoGAPzgA\nEKJm/N9+pWrqln2k0blLUEQV2qDFRSsEs3c6z6nwbqQVcgjLwzOi8jFpCfz+C0cW\ni0R/u+t+gxZk1j/aYSaB6ySsqe/F0IaCW5Fj/HA+0P7K6HjIJIMzqKnwGmZWpYTC\nJAPCfIdPa0Nqdt2pA53tK46xrLuP4frn+322k4ECgYBbfwWVpDRwEcX/K4CC3fve\nVBhnk9dhVK5aR8d1WyiGD1/yxha2hDv7iTEZ9gv2iTcBTTFZszHs4aNQaZ0B/H/X\n/qtkg3FgfCvJcXGoqKvt4eP7jBGA266Ma1nOvaJw3bSmXFkypqySoRnj6RWxdqZX\nyzTKvlJE3jtj/RluVHw5gQ==\n-----END PRIVATE KEY-----\n",
	client_email: "firebase-adminsdk-bjjqo@uvu-tests.iam.gserviceaccount.com",
	client_id: "113534963447467854835",
	auth_uri: "https://accounts.google.com/o/oauth2/auth",
	token_uri: "https://oauth2.googleapis.com/token",
	auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
	client_x509_cert_url:
		"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-bjjqo%40uvu-tests.iam.gserviceaccount.com",
} as ServiceAccount;

export default serviceAccount;
