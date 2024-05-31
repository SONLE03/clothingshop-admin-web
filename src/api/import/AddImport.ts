import axios from 'axios';
import envConfig from '@/src/config';
//import Cookies from 'js-cookie';
import { AddImportItem } from '@/src/types';
import { ParseJSON } from '../auth/ParseJSON';

const accessToken = localStorage.getItem('access_token');

export const AddNewImport = async (items: AddImportItem[]) => {
    const url = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/imports';

    if (accessToken) {
        
        const parseToken = ParseJSON(accessToken);

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: url,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${parseToken}`,
            },
            data: JSON.stringify(items),
        };
        try {
            const response = await axios.request(config);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
    else {
        console.log('No access token found');
    }
};
