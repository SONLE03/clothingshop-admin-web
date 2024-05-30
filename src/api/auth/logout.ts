// src/api/apiLogout.ts

import axios from 'axios';
import { LogOutURL, TOKEN_TYPE } from '@/src/constant/ApiConstants';
import { ParseJSON } from './ParseJSON';

const accessToken = localStorage.getItem('access_token');

const apiLogout = async (): Promise<void> => {
  
  

  if (!accessToken) {
    throw new Error('No access token found');
    return;
    
  }

  const parseToken = ParseJSON(accessToken);

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: LogOutURL,
    headers: {
      'Authorization': `Bearer ${parseToken}`,
      
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


