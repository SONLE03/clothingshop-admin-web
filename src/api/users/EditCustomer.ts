import axios from "axios";
import envConfig from "@/src/config";
import { UserProps } from "@/src/types";

const access_token = localStorage.getItem("access_token");

export const EditCustomer = async (id : string, email: string, fullName: string, phone: string, enabled: boolean, role: number) => {

    const UpdateURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + `/users/${id}`;
    try {
        const config = {
            method: "put",
            maxBodyLength: Infinity,
            url: UpdateURL,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}`,
            },
            data: JSON.stringify({ email, fullName, phone, enabled, role }),
        };
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}