"use client";
import axios, { AxiosResponse } from 'axios';
import envConfig from '@/src/config';

const ProductURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/products';

export const GetAllProducts = async (): Promise<number> => {
  try {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: ProductURL,
      headers: {}
    };

    const response: AxiosResponse<any> = await axios.request(config);
    return response.data.length; // Trả về số lượng sản phẩm
  } catch (error) {
    console.error(error);
    return 0;
  }
};
