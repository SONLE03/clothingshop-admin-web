import axios from 'axios';
import envConfig from '@/src/config';
import { OrderDetail } from '@/src/types';
import { ParseJSON } from '../auth/ParseJSON';

const accessToken = localStorage.getItem('access_token');

export const GetOrderDetails = async (orderId: string) => {
    
    const OrderDetailURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + `/orders/${orderId}`;

    if (!accessToken) {
        throw new Error('No access token found');
    }

    const parseToken = ParseJSON(accessToken);

    const config = {
        method: 'get',
        url: OrderDetailURL,
        headers: {
            'Authorization': `Bearer ${parseToken}`,
        }
    };
    try {
        const response = await axios.request<OrderDetail>(config);
        return response.data;
    } catch (error) {
        console.error(error);
    }

}
    