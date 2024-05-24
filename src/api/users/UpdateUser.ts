import { UpdateUserParams } from '@/src/types';
import envConfig from '@/src/config';
import axios from 'axios';


export const UpdateUser = async ({ id, email, fullName, phone }: UpdateUserParams) => {

    const UpdateURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + `/customers/${id}`;
    const token = localStorage.getItem('access_token');
    const config = {
        method: 'put',
        url: UpdateURL,
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        },
        data: JSON.stringify({ email, fullName, phone })
    };

    try {
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
