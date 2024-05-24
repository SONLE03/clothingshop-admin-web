import axios, { AxiosResponse } from "axios";
import envConfig from "@/src/config";
import { Gender } from "@/src/types";

const BranchURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/productGender';
const accessToken = localStorage.getItem('access_token');

export const GetAllGender = async (): Promise<Gender[]> => {
    
    try {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: BranchURL,
            headers: {
              "Authorization": `Bearer ${accessToken}`,
            }
          };
        
          const response: AxiosResponse<Gender[]> = await axios.request(config);
          return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Get all Product Gender failed');
    }
};
    