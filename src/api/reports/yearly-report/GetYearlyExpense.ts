import axios from 'axios';
import { YearlyExpense } from '@/src/types';
import envConfig from '@/src/config';

const GetYearlyExpenseURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/reports/yearly-expense';

export const GetYearlyExpense = async (startYear: number, endYear: number): Promise<YearlyExpense[]> => {
  const data = JSON.stringify({ startYear, endYear });
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: GetYearlyExpenseURL,
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
    throw new Error('Failed to fetch yearly expense');
  }
};
