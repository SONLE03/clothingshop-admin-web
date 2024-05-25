import axios from "axios";
import envConfig from "@/src/config";
import { UserProps } from "@/src/types";

const GetMeUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + "/auth/me";
const accessToken = localStorage.getItem("access_token");

export const GetMe = async (): Promise<UserProps> => {
    //console.log(accessToken);
    try {
        const config = {
            method: "get",
            maxBodyLength: Infinity,
            url: GetMeUrl,
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            },
        };
        const response = await axios.request(config);
        return response.data;
        
    } catch (error) {
        console.error(error);
        throw error;
    }
}