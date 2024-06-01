import axios from "axios";
import envConfig from "@/src/config";
import { ParseJSON } from "../auth/ParseJSON";

const accessToken = localStorage.getItem('access_token');


export const VerifyOtp = async (otp: string, email: string) => {

    const OTPurl = envConfig.NEXT_PUBLIC_API_ENDPOINT + `/users/verifyOtp/${otp}/${email}`;

    if (!accessToken) {
      throw new Error('No access token found');
    }

    const parseToken = ParseJSON(accessToken);

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: OTPurl,
      headers: {
        'Authorization': `Bearer ${parseToken}`,
      }
    };
  
    return axios.request(config);
};

