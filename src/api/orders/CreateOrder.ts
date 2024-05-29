import axios from 'axios';
import envConfig from '@/src/config';
import { CreateOrderRequest } from '@/src/types';
import { ParseJSON } from '../auth/ParseJSON';


const accessToken = localStorage.getItem('access_token');

export const CreateOrder = async (order: CreateOrderRequest) => {

    if (accessToken) {
        const parsedToken = ParseJSON(accessToken);

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/orders`,
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${parsedToken}`
            },
            data: JSON.stringify(order)
        };

        try {
            const response = await axios.request(config);
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to create order');
        }
    }
};
