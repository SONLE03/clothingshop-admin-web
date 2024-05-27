import axios from 'axios';
import envConfig from '@/src/config';


interface CreateUserParams {
  email: string;
  fullName: string;
  phone: string;
}

const CREATECUSTOMERURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/customers';

export const CreateCustomer = async ({ email, fullName, phone }: CreateUserParams) => {
  const data = JSON.stringify({
    email,
    fullName,
    phone,
  });

  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('Access token is not available');
  }

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: CREATECUSTOMERURL,
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}`
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
