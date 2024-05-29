import axios from 'axios';
import envConfig from '@/src/config';
import { Orders } from '@/src/types';


const OrdersURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/orders';


export const GetAllOrders = async () => {    
    const config = {
        method: 'get',
        url: OrdersURL,
        headers: {}
    };
    try {
        const response = await axios.request<Orders[]>(config);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
