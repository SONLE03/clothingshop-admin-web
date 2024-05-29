import axios from 'axios';
import envConfig from '@/src/config';
import { ImportInvoice } from '@/src/types';
import { ParseJSON } from '../auth/ParseJSON';
//import Cookies from 'js-cookie';

const GetAllImportUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/imports';
const accessToken = localStorage.getItem('access_token');


export const GetAllImport = async (): Promise<ImportInvoice[]> => {
    if (accessToken) {
        const parsedToken = ParseJSON(accessToken);
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: GetAllImportUrl,
            headers: {
                'Authorization': `Bearer ${parsedToken}`
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
    else {
        console.error('No access token found');
        return [];
    }

    
}