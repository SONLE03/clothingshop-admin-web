import axios from 'axios';
import envConfig from '@/src/config';
import { ParseJSON } from './ParseJSON';

export const ChangePassword = async (email: string, password: string, repeatPassword: string) => {

    const ChangePasswordUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + `/users/changePassword/${email}`;
    const accessToken = localStorage.getItem('access_token');
    let data = JSON.stringify({
        password,
        repeatPassword
    });

    if (!accessToken) {
        throw new Error('No access token found');
    }

    const parseToken = ParseJSON(accessToken);

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: ChangePasswordUrl,
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${parseToken}`
        },
        data : data
    };

    try {
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};