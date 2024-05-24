import axios from "axios";
import envConfig from "@/src/config";

const access_token = localStorage.getItem("access_token");

export const DeletePG = async (id: string) => {

    const DeleteURL = envConfig.NEXT_PUBLIC_API_ENDPOINT + `/productGender/${id}`;
    const config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: DeleteURL,
        headers: {
            "Authorization": `Bearer ${access_token}`,
        },
    };
    try {
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

