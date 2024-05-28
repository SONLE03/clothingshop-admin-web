import axios from 'axios';
import envConfig from '@/src/config';
import Cookie from 'js-cookie'

const accessToken = Cookie.get('access_token');

export const GetUserById = async (id: string) => {

    const GetUserByIdUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + `/users/${id}`;

    if (accessToken) {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: GetUserByIdUrl,
            headers: {
                'Cookie': `clothing-shop-jwt=${accessToken}`
            }
        };
        try {
            const response = await axios.request(config);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
    else {
        console.error('No access token found');
    }
    

}