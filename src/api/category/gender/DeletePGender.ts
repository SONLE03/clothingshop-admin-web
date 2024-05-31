import axios from "axios";
import envConfig from "@/src/config";
import { ParseJSON } from "../../auth/ParseJSON";

const access_token = localStorage.getItem("access_token");

export const DeletePG = async (id: string) => {

    if (!access_token) {
        throw new Error("No access token found");
    }

    const parseToken = ParseJSON(access_token);

    const DeleteURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + `/productGender/${id}`;
    const config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: DeleteURL,
        headers: {
            "Authorization": `Bearer ${parseToken}`,
        },
    };
    try {
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

