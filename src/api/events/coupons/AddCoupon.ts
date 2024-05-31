import axios from 'axios';
import { Coupon } from '@/src/types';
import envConfig from '@/src/config';
import { ParseJSON } from '../../auth/ParseJSON';


const AddCouponURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/coupons';
const accessToken = localStorage.getItem('access_token');

export const AddCoupon = async (coupon: Coupon) => {
  if (!accessToken) {
    throw new Error('No access token found');
  }

  const parseToken = ParseJSON(accessToken);

  try {
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: AddCouponURL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${parseToken}`,
      },
      data: JSON.stringify(coupon),
    };

    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to add coupon');
  }

};