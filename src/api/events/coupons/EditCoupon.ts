import axios from 'axios';
import envConfig from '@/src/config';
import { ExistedCoupon } from '@/src/types';
import { ParseJSON } from '../../auth/ParseJSON';

const accessToken = localStorage.getItem('access_token');

export const EditCoupon = async (couponId: string, coupon: ExistedCoupon): Promise<ExistedCoupon> => {
    const EditCouponUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + `coupons/couponId/${couponId}`;
    
    if (!accessToken) {
        throw new Error('No access token found');
    }

    const parseToken = ParseJSON(accessToken);

    try {
        const config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: EditCouponUrl,
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
        throw error;
    }
}