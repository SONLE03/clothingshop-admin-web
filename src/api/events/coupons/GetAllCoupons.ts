import axios from 'axios';
import envConfig from '@/src/config';
import { ExistedCoupon } from '@/src/types';
import { ParseJSON } from '../../auth/ParseJSON';


const GetAllCouponsUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/coupons';

export const GetAllCoupons = async () => {
    
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
        throw new Error('No access token found');
    }

    const parseToken = ParseJSON(accessToken);

    const config = {
        method: 'get',
        url: GetAllCouponsUrl,
        headers: {
            'Authorization': `Bearer ${parseToken}`,
        }
    };
    try {
        const response = await axios.request<ExistedCoupon[]>(config);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}


