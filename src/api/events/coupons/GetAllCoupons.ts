import axios from 'axios';
import envConfig from '@/src/config';
import { ExistedCoupon } from '@/src/types';

const GetAllCouponsUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/coupons';

export const GetAllCoupons = async () => {
    try {
        const response = await axios.get<ExistedCoupon[]>(GetAllCouponsUrl);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


