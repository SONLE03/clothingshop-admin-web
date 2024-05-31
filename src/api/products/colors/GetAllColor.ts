import axios from 'axios';
import envConfig from '@/src/config';
import { Color } from '@/src/types';
import { ParseJSON } from '../../auth/ParseJSON';

const ColorURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/color';
const accessToken = localStorage.getItem('access_token');

export const GetAllColor = async (): Promise<Color[]> => {
    
    if (!accessToken) {
        throw new Error('No access token found');
    }

    const parseToken = ParseJSON(accessToken);
    
    try {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: ColorURL,
            headers: {
              "Authorization": `Bearer ${parseToken}`,
            }
          };
        
          const response = await axios.request<Color[]>(config);
          return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Get all color failed');
    }
}