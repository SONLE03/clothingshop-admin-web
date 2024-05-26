import axios from 'axios';
import envConfig from '@/src/config';
import { ExistedCoupon } from '@/src/types';

export const EditCoupon = async (couponId: string, coupon: ExistedCoupon): Promise<ExistedCoupon> => {
    const EditCouponUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + `coupons/couponId/${couponId}`;
    
    try {
        const response = await axios.put<ExistedCoupon>(EditCouponUrl, coupon);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}