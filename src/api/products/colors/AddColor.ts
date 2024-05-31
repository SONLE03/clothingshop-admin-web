import axios from 'axios';
import envConfig from '@/src/config';
import { Color } from '@/src/types';
import { ParseJSON } from '../../auth/ParseJSON';

const AddColorUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/color';
const accessToken = localStorage.getItem('access_token');

export const AddColors = async ({ name }: Color): Promise<void> => {
    
    if (!accessToken) {
        throw new Error('No access token found');
    }

    const parseToken = ParseJSON(accessToken);
    
    const config = {
        method: 'post',
        url: AddColorUrl,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${parseToken}`,
        },
        data: JSON.stringify({ name }),
        maxBodyLength: Infinity,
    };

    try {
        const response = await axios.request(config);
        console.log(JSON.stringify(response.data));
    } catch (error) {
        console.error(error);
        throw error;
    }
}

