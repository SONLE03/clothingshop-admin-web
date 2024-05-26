import axios from 'axios';
import envConfig from '@/src/config';
import { Size } from '@/src/types';

const SizeURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/size';

export const AddSize = async (data: string) => {
    
    try {
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: SizeURL,
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(data),
        };
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}