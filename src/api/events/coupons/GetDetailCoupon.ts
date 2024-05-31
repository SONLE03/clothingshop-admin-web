import axios from 'axios';
import envConfig from '@/src/config';
import { ExistedCoupon } from '@/src/types';
import { ParseJSON } from '../../auth/ParseJSON';

export const GetDetailCoupon = async (couponId: string): Promise<ExistedCoupon> => {
    const GetDetailCouponUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + `/coupons/couponId/${couponId}`
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
        throw new Error('No access token found');
    }

    const parseToken = ParseJSON(accessToken);

    try {
        const config = {
            method: 'get',
            url: GetDetailCouponUrl,
            headers: {
                'Authorization': `Bearer ${parseToken}`,
            }
          };
        const response = await axios.request<ExistedCoupon>(config);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }

};