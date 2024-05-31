"use client";
import axios, { AxiosResponse } from 'axios';
import envConfig from '@/src/config';
import { Product } from '@/src/types';
import { ParseJSON } from '../auth/ParseJSON';

const ProductURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/products';
const accessToken = localStorage.getItem('access_token');

export const GetAllProducts = async (): Promise<AxiosResponse<Product[]>> => {
      
      if (!accessToken) {
          throw new Error('No access token found');
      }
  
      const parseToken = ParseJSON(accessToken);
      
      try {
          const config = {
              method: 'get',
              maxBodyLength: Infinity,
              url: ProductURL,
              headers: {
                "Authorization": `Bearer ${parseToken}`,
              }
            };
          
            const response: AxiosResponse<Product[]> = await axios.request(config);
            return response;
      } catch (error) {
          console.error(error);
          throw new Error('Get all products failed');
      }
}
