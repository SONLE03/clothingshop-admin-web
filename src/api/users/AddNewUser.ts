import axios from 'axios';
import envConfig from '@/src/config';
import { UserProps } from '@/src/types';

const access_token = localStorage.getItem('access_token');

const AddNewUserUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/users';


export const AddNewUser = async (user: UserProps) => {
    try {
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: AddNewUserUrl,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`,
                
            },
            data: user
        };
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}