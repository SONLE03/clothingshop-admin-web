import axios from 'axios';
import envConfig from '@/src/config';
import { ExistedCoupon } from '@/src/types';

export const GetDetailCoupon = async (couponId: string): Promise<ExistedCoupon> => {
    const GetDetailCouponUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + `/coupons/couponId/${couponId}`
  try {
    const response = await axios.get<ExistedCoupon>( GetDetailCouponUrl );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};