import axios, { AxiosResponse } from 'axios';
import envConfig from '@/src/config';
import { UserProps } from '@/src/types';
import { ParseJSON } from '../auth/ParseJSON';

const UsersUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/customers';
const accessToken = localStorage.getItem('access_token');

export const GetAllCustomers = async (): Promise<UserProps[]> => {
  if (accessToken) {
    const parsedToken = ParseJSON(accessToken);
    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: UsersUrl,
        headers: {
          'Authorization': `Bearer ${parsedToken}`,
          
        }
      };
  
      const response: AxiosResponse<UserProps[]> = await axios.request(config);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  } else {
    console.error('No access token found');
    return [];
  }
};
