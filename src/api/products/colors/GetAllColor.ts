import axios from 'axios';
import envConfig from '@/src/config';
import { Color } from '@/src/types';

const ColorURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/color';

export const GetAllColor = async (): Promise<Color[]> => {
    try {
        const response = await axios.get<Color[]>(ColorURL);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}