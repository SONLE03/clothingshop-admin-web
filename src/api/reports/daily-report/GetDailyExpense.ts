import axios from 'axios';
import envConfig from '@/src/config';
import { DailyExpenseResponse } from '@/src/types';

const GetDailyExpenseUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + "/reports/daily-expense";

export const GetDailyExpense = async (startDate: string, endDate: string) => {
    let data = JSON.stringify({
        "startDate": startDate,
        "endDate": endDate
    });

    let config = {
        method: 'post', // Change to 'post'
        maxBodyLength: Infinity,
        url: GetDailyExpenseUrl,
        headers: { 
            'Content-Type': 'application/json'
        },
        data: data
    };

    const response = await axios.request(config);
    return response.data;
};