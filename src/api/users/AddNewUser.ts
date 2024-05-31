import axios from 'axios';
import envConfig from '@/src/config';
import { UserProps } from '@/src/types';
import { ParseJSON } from '../auth/ParseJSON';

const access_token = localStorage.getItem('access_token');

const AddNewUserUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/users';


export const AddNewUser = async (user: UserProps) => {

    if (!access_token) {
        throw new Error('No access token found');
    }

    const parseToken = ParseJSON(access_token);

    try {
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: AddNewUserUrl,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${parseToken}`,
                
            },
            data: user
        };
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}