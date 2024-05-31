import axios from 'axios';
import envConfig from '@/src/config';
import { Category } from '@/src/types';
import { ParseJSON } from '../../auth/ParseJSON';


const CreateCategoryURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/category';
const accessToken = localStorage.getItem('access_token');

export const CreateCategory = async ({ name, productGender }: Category) => {

  if (!accessToken) {
    throw new Error('No access token found');
  }
  
  const parseToken = ParseJSON(accessToken);

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: CreateCategoryURL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${parseToken}`
    },
    data: JSON.stringify({ name, productGender })
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create category');
  }
};
