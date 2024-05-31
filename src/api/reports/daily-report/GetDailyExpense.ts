import axios from 'axios';
import envConfig from '@/src/config';
import { DailyExpenseResponse } from '@/src/types';
import { ParseJSON } from '../../auth/ParseJSON';

const GetDailyExpenseUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + "/reports/daily-expense";
const accessToken = localStorage.getItem('access_token');

export const GetDailyExpense = async (startDate: string, endDate: string) => {
    let data = JSON.stringify({
        "startDate": startDate,
        "endDate": endDate
    });

    if (!accessToken) {
        throw new Error('No access token found');
    }

    const parseToken = ParseJSON(accessToken);

    let config = {
        method: 'post', // Change to 'post'
        maxBodyLength: Infinity,
        url: GetDailyExpenseUrl,
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${parseToken}`

        },
        data: data
    };

    const response = await axios.request(config);
    return response.data;
};