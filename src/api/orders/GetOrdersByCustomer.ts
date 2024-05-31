import axios from 'axios';
import envConfig from '@/src/config';
import { ParseJSON } from '../auth/ParseJSON';

const accessToken = localStorage.getItem('access_token');

export const GetOrdersByCustomer = async (customerId: string) => {
    const GetOrdersByCustomerUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + `/orders/customer/${customerId}`;
    
    if (!accessToken) {
        throw new Error('No access token found');
    }

    const parseToken = ParseJSON(accessToken);

    const config = {
        method: 'get',
        url: GetOrdersByCustomerUrl,
        headers: {
            'Authorization': `Bearer ${parseToken}`,
        }
    };

    try {
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}