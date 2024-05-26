import axios from 'axios';
import { Coupon } from '@/src/types';
import envConfig from '@/src/config';

const AddCouponURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/coupons';

export const AddCoupon = async (coupon: Coupon) => {
  try {
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: AddCouponURL,
      headers: {
        'Content-Type': 'application/json',
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