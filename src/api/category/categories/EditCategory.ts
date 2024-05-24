import axios from 'axios';
import { Category } from '@/src/types';
import envConfig from '@/src/config';

const accessToken = localStorage.getItem('access_token');

export const UpdateCategory = async ({ id, name, productGender }: Category): Promise<void> => {
  
    const UpdateURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + `/category/${id}`;
  
  const config = {
    method: 'put',
    url: UpdateURL,
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${accessToken}`
    },
    data: JSON.stringify({ name, productGender }),
    maxBodyLength: Infinity
  };

  try {
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
  } catch (error) {
    console.error(error);
    throw error; // throw the error to be caught in the calling function
  }
};
