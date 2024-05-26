import axios from 'axios';
import envConfig from '@/src/config';
import { Size } from '@/src/types';

const SizeURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/size';
const accessToken = localStorage.getItem('access_token');


export const GetAllSize = async (): Promise<Size[]> => {

    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: SizeURL,
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    };
    try {
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Get all size failed');
    }
}