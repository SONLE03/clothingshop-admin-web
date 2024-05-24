import envConfig from "@/src/config";
import axios from "axios";
import { Branch } from "@/src/types";

const AddBranchUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + "/branch";
const accessToken = localStorage.getItem("access_token");

export const AddBranch = async (branchName: string) => {
    try {
        const config = {
            method: "post",
            maxBodyLength: Infinity,
            url: AddBranchUrl,
            headers: {
                "Authorization": `Bearer ${accessToken}`,
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
