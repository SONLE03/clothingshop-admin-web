import axios from 'axios';
import envConfig from '@/src/config';
import { OrderDetail } from '@/src/types';

export const GetOrderDetails = async (orderId: string) => {
    
    const OrderDetailURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + `/orders/${orderId}`;

    try {
        const response = axios.get<OrderDetail[]>(OrderDetailURL);
        return response;
    } catch (error) {
        console.error(error);
    }

}
    