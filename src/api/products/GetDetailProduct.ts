// Update GetDetailProduct.ts to return a list of product items
import axios from 'axios';
import envConfig from '@/src/config';
import Cookies from 'js-cookie';
import { ProductItem } from '@/src/types';

const accessToken = Cookies.get('access_token');

export const GetDetailProduct = async (productId: string) => {
    const GetProductUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + `/products/${productId}`;
    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: GetProductUrl,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Cookie': `clothing-shop-jwt=${accessToken}`
        }
    };
    const response = await axios.request(config);
    return response.data;
};
