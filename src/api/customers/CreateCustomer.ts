import axios from 'axios';
import envConfig from '@/src/config';
import { ParseJSON } from '../auth/ParseJSON';
import { Customer } from '@/src/types';

const CREATECUSTOMERURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/customers';

export const CreateCustomer = async ({ email, fullName, phone }: Customer) => {
  const data = JSON.stringify({
    email,
    fullName,
    phone,
  });

  const accessToken = localStorage.getItem('access_token');

  if (!accessToken) {
    throw new Error('Access token is not available');
  }

  const parseToken = ParseJSON(accessToken);

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: CREATECUSTOMERURL,
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${parseToken}`
    },
    data: data
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
};
