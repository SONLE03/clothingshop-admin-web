import axios from 'axios';
import envConfig from '@/src/config';
import { ImportInvoice } from '@/src/types';
import Cookies from 'js-cookie';

const GetAllImportUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/imports';
const accessToken = Cookies.get('access_token');


export const GetAllImport = async (): Promise<ImportInvoice[]> => {
    if (!accessToken) {
        console.error('No access token found');
        return [];
    }

    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: GetAllImportUrl,
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    };
    try {
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}