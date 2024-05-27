import axios from 'axios';
import envConfig from '@/src/config';

const access_token = localStorage.getItem('access_token');

export const DeleteUser = async (userId: string) => {
    const DeleteUserUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + `/users/${userId}`;
    const config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: DeleteUserUrl,
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Cookie': 'clothing-shop-jwt='
        }
    };
    try {
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}