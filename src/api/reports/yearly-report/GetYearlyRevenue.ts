import axios from 'axios';
import { YearlyRevenue } from '@/src/types';
import envConfig from '@/src/config';

const GetYearlyRevenueURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/reports/yearly-revenue';

export const GetYearlyRevenue = async (startYear: number, endYear: number): Promise<YearlyRevenue[]> => {
  const data = JSON.stringify({ startYear, endYear });
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: GetYearlyRevenueURL,
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
    throw new Error('Failed to fetch yearly revenue');
  }
};
