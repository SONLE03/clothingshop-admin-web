import envConfig from "@/src/config";
import axios from "axios";


const AddBranchUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + "/productGender";
const accessToken = localStorage.getItem("access_token");

export const AddPG = async (PGName: string) => {
    try {
        const config = {
            method: "post",
            maxBodyLength: Infinity,
            url: AddBranchUrl,
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            data: JSON.stringify({ name: PGName }),
        };
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Add PG failed");
    }
    
    
};
