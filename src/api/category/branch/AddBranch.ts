import envConfig from "@/src/config";
import axios from "axios";
import { Branch } from "@/src/types";
import { ParseJSON } from "../../auth/ParseJSON";

const AddBranchUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + "/branch";
const accessToken = localStorage.getItem("access_token");

export const AddBranch = async (branchName: string) => {
    
    if (!accessToken) {
        throw new Error("No access token found");
    }
    
    const parseToken = ParseJSON(accessToken);

    try {
        const config = {
            method: "post",
            maxBodyLength: Infinity,
            url: AddBranchUrl,
            headers: {
                "Authorization": `Bearer ${parseToken}`,
                "Content-Type": "application/json",
            },
            data: JSON.stringify({ name: branchName }),
        };
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Add branch failed");
    }
    
    
};
