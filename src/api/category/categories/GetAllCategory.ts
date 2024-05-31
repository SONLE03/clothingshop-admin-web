import axios, { AxiosResponse } from "axios";
import envConfig from "@/src/config";
import { Category } from "@/src/types";
import { ParseJSON } from "../../auth/ParseJSON";

const GetCategoryURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/category';
const accessToken = localStorage.getItem('access_token');

export const GetAllCategory = async (): Promise<Category[]> => {

    if (!accessToken) {
        throw new Error('No access token found');
    }

    const parseToken = ParseJSON(accessToken);
    
    try {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: GetCategoryURL,
            headers: {
              "Authorization": `Bearer ${parseToken}`,
            }
          };
        
          const response: AxiosResponse<Category[]> = await axios.request(config);
          return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Get all Category failed');
    }
};
    