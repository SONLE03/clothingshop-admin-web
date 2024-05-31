import axios from 'axios';
import envConfig from '@/src/config';
import { ParseJSON } from '../auth/ParseJSON';

const access_token = localStorage.getItem('access_token');

export const DeleteUser = async (userId: string) => {
    const DeleteUserUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + `/users/${userId}`;

    if (!access_token) {
        throw new Error('No access token found');
    }

    const parseToken = ParseJSON(access_token);

    const config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: DeleteUserUrl,
        headers: {
            'Authorization': `Bearer ${parseToken}`,
            
        }
    };
    try {
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}