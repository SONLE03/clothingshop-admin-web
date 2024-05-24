import axios from "axios";
import envConfig from "@/src/config";

const access_token = localStorage.getItem("access_token");

export const EditBranch = async (id: string, name: string) => {

    const EditBranchUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + `/branch/${id}`;
    try {
        const config = {
            method: "put",
            maxBodyLength: Infinity,
            url: EditBranchUrl,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}`,
            },
            data: JSON.stringify({ name }),
        };
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
