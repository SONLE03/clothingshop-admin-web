"use client";
import axios, { AxiosResponse } from 'axios';
import envConfig from '@/src/config';
import { UserProps } from '@/src/types';

const UsersUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/users/all/2';

export const GetAllUsers = async (): Promise<UserProps[]> => {
  try {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: UsersUrl,
      headers: {}
    };

    const response: AxiosResponse<UserProps[]> = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
