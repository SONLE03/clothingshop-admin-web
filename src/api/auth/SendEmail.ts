import axios from 'axios';
import envConfig from '@/src/config';
import { ParseJSON } from './ParseJSON';

const accessToken = localStorage.getItem('access_token');


export const SendOtp = async (email: string) => {

    const Emailurl = envConfig.NEXT_PUBLIC_API_ENDPOINT + `/email/verifyEmail/${email}`;

    if (!accessToken) {
        throw new Error('No access token found');
    }

    const parseToken = ParseJSON(accessToken);

    try {
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: Emailurl,
            headers: {
                'Authorization': `Bearer ${parseToken}`,
            }
        };
    
        return axios.request(config);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

//export default SendOtp;

