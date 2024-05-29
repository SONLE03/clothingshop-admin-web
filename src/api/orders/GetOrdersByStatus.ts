import axios from 'axios';
import envConfig from '@/src/config';

export const GetOrdersByStatus = async (status: number) => {
    const GetOrdersByStatusUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + `/orders/status/${status}`;
    try {
        const response = await axios.get(GetOrdersByStatusUrl);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}