// src/api/apiLogout.ts

import axios from 'axios';
import { LogOutURL, TOKEN_TYPE } from '@/src/constant/ApiConstants';

const apiLogout = async (): Promise<void> => {
  const accessToken = localStorage.getItem('access_token');

  if (!accessToken) {
    throw new Error('No access token found');
  }

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: LogOutURL,
    headers: {
      'Authorization': `${TOKEN_TYPE} ${accessToken}`,
      'Cookie': 'clothing-shop-jwt='
    }
  };

  try {
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
  } catch (error) {
    console.error(error);
    throw new Error('Logout failed');
  }
};

export default apiLogout;
