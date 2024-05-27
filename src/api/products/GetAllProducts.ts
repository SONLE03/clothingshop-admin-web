"use client";
import axios, { AxiosResponse } from 'axios';
import envConfig from '@/src/config';
import { Product } from '@/src/types';

const ProductURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/products';

export const GetAllProducts = async (): Promise<AxiosResponse<Product[]>> => {
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: ProductURL,
    headers: {}
  };
  return axios.request(config);
}
