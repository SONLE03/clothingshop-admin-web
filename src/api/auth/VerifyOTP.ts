import axios from "axios";
import envConfig from "@/src/config";


export const VerifyOtp = async (otp: string, email: string) => {

    const OTPurl = envConfig.NEXT_PUBLIC_API_ENDPOINT + `/users/verifyOtp/${otp}/${email}`;
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: OTPurl,
      headers: {}
    };
  
    return axios.request(config);
};

