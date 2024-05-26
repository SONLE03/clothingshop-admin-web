import axios from 'axios';
import envConfig from '@/src/config';
import { ExistedCoupon } from '@/src/types';

export const DeleteCoupon = async (id: string) => {
    const DeleteCouponUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + `/coupons/couponId/${id}`
    try {
        const response = await axios.delete<ExistedCoupon>(DeleteCouponUrl);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}