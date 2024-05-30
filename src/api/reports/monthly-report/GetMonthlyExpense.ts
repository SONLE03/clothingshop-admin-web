import axios from 'axios';
import { MonthlyExpense } from '@/src/types';
import envConfig from '@/src/config';

const GetMonthlyExpenseURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/reports/monthly-expense';

export const GetMonthlyExpense = async (year: number): Promise<MonthlyExpense[]> => {
  const data = JSON.stringify({ year });
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: GetMonthlyExpenseURL,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch monthly expense');
  }
};
