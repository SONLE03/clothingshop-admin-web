import axios from 'axios';
import envConfig from '@/src/config';
import Cookies from 'js-cookie';

const accessToken = Cookies.get('access_token');

export const GetImportById = (id: string) => {

    const GetImportByIdUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + `/imports/${id}`;
    if (accessToken) {
        try {
            const response = axios.get(GetImportByIdUrl, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            return response;
        } catch (error) {
            console.error(error);
        }
    }
}