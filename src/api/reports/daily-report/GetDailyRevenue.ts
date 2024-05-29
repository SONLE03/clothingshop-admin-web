import axios from 'axios';
import envConfig from '@/src/config';
import { ParseJSON } from '../../auth/ParseJSON';


const accessToken = localStorage.getItem('access_token');

export const GetDailyRevenue = async (startDate: string, endDate: string) => {
    const data = JSON.stringify({ startDate, endDate });
    const GetDailyRevenueURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/reports/daily-revenue';
    if(accessToken) {
        const parseToken = ParseJSON(accessToken);
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: GetDailyRevenueURL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${parseToken}`
            },
            data: data
        };
        try {
            const response = await axios.request(config);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.response?.data || error.message);
            } else {
                console.error('Unexpected error:', error);
            }
            // Return a default value or throw an error if appropriate
            throw new Error('Error fetching daily revenue');
        }
    } else {
        console.error('Access token not found');
        throw new Error('Access token not found');
    }
};