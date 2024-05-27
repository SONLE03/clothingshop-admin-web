import axios from 'axios';
import envConfig from '@/src/config';

export const AddExistedProduct = async (id: string, sizeId: string, colorId: string) => {
    const AddExistedProductUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + `/products/${id}/`;
    try {
        const config = {
            method: "post",
            maxBodyLength: Infinity,
            url: AddExistedProductUrl,
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                sizeId,
                colorId
            }
        };
        await axios.request(config);
    } catch (error) {
        console.error(error);
    }
};
