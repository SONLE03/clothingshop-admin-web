import axios from 'axios';
import envConfig from '@/src/config';
import { DailyExpenseResponse } from '@/src/types';

const GetDailyExpenseUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + "/reports/daily-expense";

export const GetDailyExpense = async (startDate: string, endDate: string) => {
    const data = JSON.stringify({
        startDate,
        endDate
    });

    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: GetDailyExpenseUrl,
        headers: { 
            'Content-Type': 'application/json'
        },

        //data: data,
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
        throw error;
    }
};