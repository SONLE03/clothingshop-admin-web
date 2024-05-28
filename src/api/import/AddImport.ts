import axios from 'axios';
import envConfig from '@/src/config';
import Cookies from 'js-cookie';
import { AddImportItem } from '@/src/types';

const accessToken = Cookies.get('access_token');

export const AddNewImport = async (items: AddImportItem[]): Promise<void> => {
    const url = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/imports';

    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: url,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            
        },
        data: JSON.stringify(items)
    };

    try {
        const response = await axios.request(config);
        console.log(JSON.stringify(response.data));
    } catch (error) {
        console.error(error);
        throw new Error('Failed to add new import');
    }
};
