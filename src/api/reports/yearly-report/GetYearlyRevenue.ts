import axios from 'axios';
import { YearlyRevenue } from '@/src/types';
import envConfig from '@/src/config';
import { ParseJSON } from '../../auth/ParseJSON';

const GetYearlyRevenueURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/reports/yearly-revenue';
const accessToken = localStorage.getItem('access_token');

export const GetYearlyRevenue = async (startYear: number, endYear: number): Promise<YearlyRevenue[]> => {
  const data = JSON.stringify({ startYear, endYear });

  if (!accessToken) {
    throw new Error('No access token found');
  }

  const parseToken = ParseJSON(accessToken);

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: GetYearlyRevenueURL,
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
    throw new Error('Failed to fetch yearly revenue');
  }
};
