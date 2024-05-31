import axios from 'axios';
import { MonthlyRevenue } from '@/src/types';
import envConfig from '@/src/config';
import { ParseJSON } from '../../auth/ParseJSON';

const GetMonthlyRevenueURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/reports/monthly-revenue';
const accessToken = localStorage.getItem('access_token');


export const GetMonthlyRevenue = async (year: number): Promise<MonthlyRevenue[]> => {
  const data = JSON.stringify({ year });

  if (!accessToken) {
    throw new Error('No access token found');
  }

  const parseToken = ParseJSON(accessToken);

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: GetMonthlyRevenueURL,
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
    throw new Error('Failed to fetch monthly revenue');
  }
};
