import axios from 'axios';
import envConfig from '@/src/config';
import { ParseJSON } from '../auth/ParseJSON';

const access_token = localStorage.getItem('access_token');


export const DeleteProduct = async (id: string) => {
    const DeleteURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + `/products/${id}`;
    if (!access_token) {
        throw new Error('No access token found');
    }

    const parseToken = ParseJSON(access_token);

    const config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: DeleteURL,
        headers: {
            'Authorization': `Bearer ${parseToken}`,
        },
    };
    try {
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}