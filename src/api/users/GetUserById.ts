import axios from 'axios';
import envConfig from '@/src/config';
import { ParseJSON } from '../auth/ParseJSON';

const accessToken = localStorage.getItem('access_token');

export const GetUserById = async (id: string) => {
    const GetUserByIdUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + `/users/${id}`;
    if (accessToken) {
        const parsedToken = ParseJSON(accessToken);
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: GetUserByIdUrl,
            headers: {
                'Authorization': `Bearer ${parsedToken}`
            }
        };
        try {
            const response = await axios.request(config);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    } else {
        console.error('No access token found');
    }
}