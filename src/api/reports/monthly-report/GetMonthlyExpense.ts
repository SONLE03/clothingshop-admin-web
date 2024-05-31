import axios from 'axios';
import { MonthlyExpense } from '@/src/types';
import envConfig from '@/src/config';
import { ParseJSON } from '../../auth/ParseJSON';

const GetMonthlyExpenseURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/reports/monthly-expense';
const accessToken = localStorage.getItem('access_token');

export const GetMonthlyExpense = async (year: number): Promise<MonthlyExpense[]> => {
  const data = JSON.stringify({ year });

  if (!accessToken) {
    throw new Error('No access token found');
  }

  const parseToken = ParseJSON(accessToken);

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: GetMonthlyExpenseURL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${parseToken}`,
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
