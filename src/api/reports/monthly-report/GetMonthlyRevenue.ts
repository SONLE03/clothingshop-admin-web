import axios from 'axios';
import { MonthlyRevenue } from '@/src/types';
import envConfig from '@/src/config';

const GetMonthlyRevenueURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/reports/monthly-revenue';

export const GetMonthlyRevenue = async (year: number): Promise<MonthlyRevenue[]> => {
  const data = JSON.stringify({ year });
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: GetMonthlyRevenueURL,
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
    throw new Error('Failed to fetch monthly revenue');
  }
};
