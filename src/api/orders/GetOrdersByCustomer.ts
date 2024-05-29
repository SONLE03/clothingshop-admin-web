import axios from 'axios';
import envConfig from '@/src/config';

export const GetOrdersByCustomer = async (customerId: string) => {
    const GetOrdersByCustomerUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + `/orders/customer/${customerId}`;
    try {
        const response = await axios.get(GetOrdersByCustomerUrl);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}