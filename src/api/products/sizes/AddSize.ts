import axios from 'axios';
import envConfig from '@/src/config';
import { Size } from '@/src/types';
import { ParseJSON } from '../../auth/ParseJSON';

const SizeURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/size';
const accessToken = localStorage.getItem('access_token');

export const AddSize = async (data: string) => {
    
    if (!accessToken) {
        throw new Error('No access token found');
    }

    const parseToken = ParseJSON(accessToken);

    try {
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: SizeURL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${parseToken}`,
            },
            data: JSON.stringify(data),
        };
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}