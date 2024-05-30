import axios from 'axios';
import envConfig from '@/src/config';
import { ParseJSON } from '../../auth/ParseJSON';
import { DailyRevenueResponse } from '@/src/types';


const accessToken = localStorage.getItem('access_token');


export const GetDailyRevenue = async (startDate: string, endDate: string) => {
    const GetDailyRevenueUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/reports/daily-revenue';
    if(accessToken) {
        const parsedToken = ParseJSON(accessToken);
        
        let data = JSON.stringify({
            "startDate": startDate,
            "endDate": endDate
        });

        let config = {
            method: 'post', // Change to 'post'
            maxBodyLength: Infinity,
            url: GetDailyRevenueUrl,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${parsedToken}`
            },
            data: data
        };

        const response = await axios.request(config);
        return response.data;
    }
};