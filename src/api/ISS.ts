import { IssNow } from "../interfaces/opennotify";
import axiosInstance from "./axiosInstance";

export async function getISSPosition(): Promise<IssNow> {
    return axiosInstance.get(`iss-now.json`)
        .then(response => response.data)
        .catch(error => {
            console.error("Error: " + error);
            throw error;
        });
}