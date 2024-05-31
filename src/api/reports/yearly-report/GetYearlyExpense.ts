import axios from 'axios';
import { YearlyExpense } from '@/src/types';
import envConfig from '@/src/config';
import { ParseJSON } from '../../auth/ParseJSON';

const GetYearlyExpenseURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/reports/yearly-expense';
const accessToken = localStorage.getItem('access_token');

export const GetYearlyExpense = async (startYear: number, endYear: number): Promise<YearlyExpense[]> => {
  const data = JSON.stringify({ startYear, endYear });

  if (!accessToken) {
    throw new Error('No access token found');
  }

  const parseToken = ParseJSON(accessToken);

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: GetYearlyExpenseURL,
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
    throw new Error('Failed to fetch yearly expense');
  }
};
