import axios from 'axios';
import envConfig from '@/src/config';


export const DeleteProduct = async (id: string) => {
    const DeleteURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + `/products/${id}`;
    try {
        const response = await axios.delete(DeleteURL);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}