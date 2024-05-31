import axios from "axios";
import envConfig from "@/src/config";
import { ParseJSON } from "../../auth/ParseJSON";

const access_token = localStorage.getItem("access_token");

export const EditBranch = async (id: string, name: string) => {

    const EditBranchUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + `/branch/${id}`;

    if (!access_token) {
        throw new Error("No access token found");
    }

    const parseToken = ParseJSON(access_token);

    try {
        const config = {
            method: "put",
            maxBodyLength: Infinity,
            url: EditBranchUrl,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${parseToken}`,
            },
            data: JSON.stringify({ name }),
        };
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
