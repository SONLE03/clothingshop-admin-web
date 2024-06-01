// src/api/products/AddExistedProduct.ts
import axios from 'axios';
import envConfig from '@/src/config';
import { ParseJSON } from '../auth/ParseJSON';

const accessToken = localStorage.getItem('access_token');

export const AddExistedProduct = async (id: string, sizeColorArray: { size: string, color: string }[]) => {
    const AddExistedProductUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + `/products/${id}`;
    if (!accessToken) {
        throw new Error('No access token found');
    }
    const parseToken = ParseJSON(accessToken);

    try {
        const config = {
            method: "post",
            maxBodyLength: Infinity,
            url: AddExistedProductUrl,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${parseToken}`
            },
            data: JSON.stringify(sizeColorArray),
        };
        await axios.request(config);
    } catch (error) {
        console.error(error);
    }
};
