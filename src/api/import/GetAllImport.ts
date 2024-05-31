import axios from 'axios';
import envConfig from '@/src/config';
import { ImportInvoice } from '@/src/types';
import { ParseJSON } from '../auth/ParseJSON';


const GetAllImportUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/imports';
const accessToken = localStorage.getItem('access_token');

export const GetAllImport = async (): Promise<ImportInvoice[]> => {

    if (!accessToken) {
        throw new Error('No access token found');
    }

    const parseToken = ParseJSON(accessToken);

    try {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: GetAllImportUrl,
            headers: {
                'Authorization': `Bearer ${parseToken}`,
            }
        };

        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}