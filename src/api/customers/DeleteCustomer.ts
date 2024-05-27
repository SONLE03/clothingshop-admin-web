import axios from 'axios';
import envConfig from '@/src/config';

const DeleteCustomer = async (userId: string): Promise<void> => {
  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    throw new Error('No access token found');
  }

  const config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/users/${userId}`,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Cookie': 'clothing-shop-jwt='
    }
  };

  try {
    await axios.request(config);
  } catch (error) {
    console.error(error);
    throw new Error('Delete user failed');
  }
};

export default DeleteCustomer;
