import axios from 'axios';
import envConfig from '@/src/config';
import { Orders } from '@/src/types';
import { ParseJSON } from '../auth/ParseJSON';


const OrdersURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/orders';
const accessToken = localStorage.getItem('access_token');


export const GetAllOrders = async () => {    

    if (!accessToken) {
        throw new Error('No access token found');
    }

    const parseToken = ParseJSON(accessToken);

    const config = {
        method: 'get',
        url: OrdersURL,
        headers: {
            'Authorization': `Bearer ${parseToken}`,
        }
    };
    try {
        const response = await axios.request<Orders[]>(config);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
