import { ServiceAccount } from "firebase-admin/lib/credential/index";

const serviceAccount = {
	type: "service_account",
	project_id: "ndesc-db",
	private_key_id: "7087e533bda0ef3eea58a4f96d45a07978fb67e0",
	private_key:
		"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCY8oDrimU08McJ\n1kAncDBOE2/ZlXYIYEzf2KeziUGM5hZ4EpMGyO3qESWJD9pcFXWOU6GYTbadVidw\nvRsYaqvAKJxsyGRfKzOy3Q51fp9YPY92R/LHJp24VVhWgNIFBZLR78zia16ci58g\n98QLQGhJLw/+v3RdSLH0P0BE84DLEQa7K0BxTRPwxitizVySAuWRCHgvLpy07fXi\n/vxiYHZheY9pNYXjYSiEz7wF2IoK7d1BvoTstwYVjEkZHy93nOCvslPXU1YlZ9GP\ndLyXRnJsad0iiHzsH48Aae6CFVCj/J9dbssFVKtKJpASVg4ORNuBraJZH5VNXEFs\nKkbNkLwxAgMBAAECggEAJEZTxEmBInK+yjr54UCu/D2I6CKWKXtpkCeq8p5poRjL\nGHRTUacjIkIp1F2hrPhb9sMoDt7TonJWDVuUixB1prAbFYPbpmSxMMlUDhLXiQ6k\nsWl0D769ZoQ7XNzVsuI1Bbypq8PKXzeQKLoK0Z5XfY//a6yN1TgSGLtNq2zTTZXg\nozDFlA8Cq2bvfGkUCKmI3gSO6WZiElKUoMULClA+qSbO1TVTuWomniI+TGvmNjAJ\nioAx8/fRTS0Q94JrYRCk8O5M5yjxgBWzg1jeBMjCjGnXnTxoHfk1xzOl4RMV0Ty5\nRypjYPq+HBEyocyKGSR9C1GFT0XDWjyugRYAjKJRSQKBgQDTHtO2ySLVWFxkI5LU\nWpV+ENB3EcbQkGOSaSGsQeN/PvId/cf2mWSHqOG6eVw0TO1s5pPwecSZqUK1Fgzd\nLhXNtynaahAmQCms9N0WVejFpy3Oo3aZl87g4Bp2yjDtUd+fHiUyrNcUQkppuWmk\nGVhmfp4dZYlR6u8FZF03WX1sTQKBgQC5deT6EzWv9Yx9kCs/un5mmBnyq+PXTDbN\n+yzXUHO55sbaOcKk9Z0RxagNHb0gFwznINN2i5LA7iFOkL1FzaP+wtIdMBAUDXm0\nbTHu+ch6DGtZeW236I4u0tIbCdrvn2GU1y2vpP/hxjbOHCFXdUF4vt2rynwwdebc\nXFD1F1GxdQKBgQCqXdgPSuSXMYTtMl/MiYTVhJAVZf0AVWRkw/3uWgVRq+QKG79/\n2mzrpHbz2fd0JRf7p15+0mS6c4JnS3H6ErR5m3Nk0+5QT7rR3Y+D9LOwvKYUeIi+\njWjewznX3nX5LPa+Gr9900iFCrGt+3eqeuGBZHAH3OYheuqDeWhXwBmciQKBgAlK\nWZ0ZZ0AYSeBkX3ZCzmAvUGVyrOg1Hi21Xmqu0g1G/UEjUZfX4fVo9GEr0zSPUwsk\n/tLabRCTHUIFSCX+BjAV7Faf+L44apdaPP0esCdFBf+mcJOc57p6vyGxnbERR98f\n5F7/If5aYpZynEz4R75XuV0IuK3oyhbR3RBaCbKdAoGAK40WfRuyVSpH46Tc75G9\nFkhjeY0sOujCSuPjRRipMv/MZBIsnDGKDn4JuvWSNpfsI9azwKQ7u1TW5T6ZRcyO\nzNWyPvagHyaqnAs6/t5DXXzbIpbVXSfkpPUt1wXFoczkkl8odIUj8oMUJUKXPeuI\nTAWhtDw92f58qDSAxXZBO3E=\n-----END PRIVATE KEY-----\n",
	client_email: "firebase-adminsdk-ou6pp@ndesc-db.iam.gserviceaccount.com",
	client_id: "102732880669028993560",
	auth_uri: "https://accounts.google.com/o/oauth2/auth",
	token_uri: "https://oauth2.googleapis.com/token",
	auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
	client_x509_cert_url:
		"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ou6pp%40ndesc-db.iam.gserviceaccount.com",
} as ServiceAccount;

export default serviceAccount;
