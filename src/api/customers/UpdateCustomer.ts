import { UpdateUserParams } from '@/src/types';
import envConfig from '@/src/config';
import axios from 'axios';
import { ParseJSON } from '../auth/ParseJSON';


export const UpdateCustomer = async ({ id, email, fullName, phone }: UpdateUserParams) => {

    const UpdateURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + `/customers/${id}`;
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
        throw new Error('No access token found');
    }

    const parseToken = ParseJSON(accessToken);

    const config = {
        method: 'put',
        url: UpdateURL,
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${parseToken}`
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
