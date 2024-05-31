import axios, { AxiosResponse } from "axios";
import envConfig from "@/src/config";
import { UserProps } from "@/src/types";
import { ParseJSON } from "../auth/ParseJSON";

const UsersUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + "/users/all/1";
const accessToken = localStorage.getItem("access_token");

export const GetAllStaffs = async (): Promise<UserProps[]> => {

    if (!accessToken) {
        throw new Error("No access token found");
    }

    const parseToken = ParseJSON(accessToken);


    try {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: UsersUrl,
            headers: {
                'Authorization': `Bearer ${parseToken}`,  
            }
        };
        const response: AxiosResponse<UserProps[]> = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}