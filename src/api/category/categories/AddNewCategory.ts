import axios from 'axios';
import envConfig from '@/src/config';
import { Category } from '@/src/types';


const CreateCategoryURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/category';
const accessToken = localStorage.getItem('access_token');

export const CreateCategory = async ({ name, productGender }: Category) => {
  
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: CreateCategoryURL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
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
