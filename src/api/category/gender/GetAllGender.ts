import axios, { AxiosResponse } from "axios";
import envConfig from "@/src/config";
import { Gender } from "@/src/types";
import { ParseJSON } from "../../auth/ParseJSON";

const BranchURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/productGender';
const accessToken = localStorage.getItem('access_token');

export const GetAllGender = async (): Promise<Gender[]> => {

    if (!accessToken) {
        throw new Error('No access token found');
    }

    const parseToken = ParseJSON(accessToken);
    
    try {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: BranchURL,
            headers: {
              "Authorization": `Bearer ${parseToken}`,
            }
          };
        
          const response: AxiosResponse<Gender[]> = await axios.request(config);
          return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Get all Product Gender failed');
    }
};
    