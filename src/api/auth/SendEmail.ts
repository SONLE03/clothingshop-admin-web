import axios from 'axios';
import envConfig from '@/src/config';


export const SendOtp = async (email: string) => {

    const accessToken = localStorage.getItem('access_token');

    const Emailurl = envConfig.NEXT_PUBLIC_API_ENDPOINT + `/email/verifyEmail/${email}`;

    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: Emailurl,
        headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Cookie': 'clothing-shop-jwt='
        }
    };

    return axios.request(config);
};

//export default SendOtp;

