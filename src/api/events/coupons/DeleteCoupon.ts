import axios from 'axios';
import envConfig from '@/src/config';
import { ExistedCoupon } from '@/src/types';
import { ParseJSON } from '../../auth/ParseJSON';

const accessToken = localStorage.getItem('access_token');

export const DeleteCoupon = async (id: string) => {

    const DeleteCouponUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + `/coupons/couponId/${id}`
    if (!accessToken) {
        throw new Error('No access token found');
    }

    const parseToken = ParseJSON(accessToken);

    try {
        const config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: DeleteCouponUrl,
            headers: {
                'Authorization': `Bearer ${parseToken}`,
            }
        };
        return axios.request(config);
    } catch (error) {
        console.error(error);
    }
}