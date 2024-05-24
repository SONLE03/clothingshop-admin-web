import axios, { AxiosResponse } from "axios";
import envConfig from "@/src/config";
import { Category } from "@/src/types";

const GetCategoryURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/category';
const accessToken = localStorage.getItem('access_token');

export const GetAllCategory = async (): Promise<Category[]> => {
    
    try {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: GetCategoryURL,
            headers: {
              "Authorization": `Bearer ${accessToken}`,
            }
          };
        
          const response: AxiosResponse<Category[]> = await axios.request(config);
          return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Get all Category failed');
    }
};
    