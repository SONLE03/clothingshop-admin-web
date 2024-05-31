import axios from 'axios';
import { Category } from '@/src/types';
import envConfig from '@/src/config';
import { ParseJSON } from '../../auth/ParseJSON';

const accessToken = localStorage.getItem('access_token');

export const EditCategory = async ({ id, name, productGender }: Category): Promise<void> => {
  
  const UpdateURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + `/category/${id}`;

  if (!accessToken) {
    throw new Error('No access token found');
  }

  const parseToken = ParseJSON(accessToken);
  
  const config = {
    method: 'put',
    url: UpdateURL,
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${parseToken}`
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
