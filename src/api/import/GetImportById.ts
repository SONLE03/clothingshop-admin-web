import axios from 'axios';
import envConfig from '@/src/config';
import { ParseJSON } from '../auth/ParseJSON';

const accessToken = localStorage.getItem('access_token');

export const GetImportById = (id: string) => {

    const GetImportByIdUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + `/imports/${id}`;
    
    if (!accessToken) {
        throw new Error('No access token found');
    }

    const parseToken = ParseJSON(accessToken);

    try {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: GetImportByIdUrl,
            headers: {
                'Authorization': `Bearer ${parseToken}`,
            }
        };

        return axios.request(config);
    } catch (error) {
        console.error(error);
        throw error;
    }
}