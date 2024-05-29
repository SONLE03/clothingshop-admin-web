import axios from 'axios';
import envConfig from '@/src/config';
//import Cookies from 'js-cookie';
import { ProductItem } from '@/src/types';
import { ParseJSON } from '../auth/ParseJSON';

const accessToken = localStorage.getItem('access_token');

export const GetDetailProduct = async (productId: string) => {
    const GetProductUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + `/products/${productId}`;
    if (accessToken) {
        const parseToken = ParseJSON(accessToken);
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: GetProductUrl,
            headers: {
                'Authorization': `Bearer ${parseToken}`,
            },
        };
        try {
            const response = await axios.request(config);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
};

