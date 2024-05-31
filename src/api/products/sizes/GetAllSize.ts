import axios from 'axios';
import envConfig from '@/src/config';
import { Size } from '@/src/types';
import { ParseJSON } from '../../auth/ParseJSON';

const SizeURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/size';
const accessToken = localStorage.getItem('access_token');


export const GetAllSize = async (): Promise<Size[]> => {

    if (!accessToken) {
        throw new Error('No access token found');
    }

    const parseToken = ParseJSON(accessToken);

    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: SizeURL,
        headers: {
            'Authorization': `Bearer ${parseToken}`
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