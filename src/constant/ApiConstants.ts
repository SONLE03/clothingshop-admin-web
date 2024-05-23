import envConfig from "../config";

export const LogOutURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + "/auth/logout";

export const TOKEN_TYPE = "Bearer";
