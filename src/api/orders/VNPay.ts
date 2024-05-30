import axios from 'axios';
import envConfig from '@/src/config';
import qs from 'qs';

const accessToken = localStorage.getItem('access_token');
const getVNPayUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/vnpay/submitOrder';

export const GetVNPayUrl = async (amount: number, orderInfo: string, orderId: string) => {
  if (!accessToken) {
    throw new Error('No access token found');
  }

  const parsedToken = JSON.parse(accessToken);
  const data = qs.stringify({
    amount,
    orderInfo,
    orderId,
  });

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: getVNPayUrl,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${parsedToken}`,
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    return response.data; // This should be the URL
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get VNPay URL');
  }
};
