import axios from 'axios';
import envConfig from '@/src/config';
import { Color } from '@/src/types';

const AddColorUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/color';

export const AddColors = async ({ name }: Color): Promise<void> => {
    try {
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: AddColorUrl,
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({ name })
        };
        await axios.request(config);
    } catch (error) {
        console.error(error);
    }
}