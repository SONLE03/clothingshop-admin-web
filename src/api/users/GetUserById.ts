import axios from 'axios';
import envConfig from '@/src/config';

const access_token = localStorage.getItem('access_token');

export const GetUserById = async (id: string) => {

    const GetUserByIdUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + `/users/${id}`;

    if (access_token) {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: GetUserByIdUrl,
            headers: {
                'Authorization': `Bearer ${access_token}`
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