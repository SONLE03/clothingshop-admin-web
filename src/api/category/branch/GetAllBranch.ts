import axios, { AxiosResponse } from "axios";
import envConfig from "@/src/config";
import { Branch } from "@/src/types";

const BranchURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/branch';
const accessToken = localStorage.getItem('access_token');

export const GetAllBranch = async (): Promise<Branch[]> => {
    
    try {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: BranchURL,
            headers: {
              "Authorization": `Bearer ${accessToken}`,
            }
          };
        
          const response: AxiosResponse<Branch[]> = await axios.request(config);
          return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Get all branch failed');
    }
};
    