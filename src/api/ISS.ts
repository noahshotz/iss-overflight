import { IssNow } from "../interfaces/iss";
import { TLE } from "../interfaces/tle";
import axiosInstance from "./axiosInstance";

export async function getISSPosition(): Promise<IssNow> {
    return axiosInstance.get(`satellites/25544`)
        .then(response => response.data)
        .catch(error => {
            console.error("Error: " + error);
            throw error;
        });
}

export async function getISSTLE(): Promise<TLE> {
    return axiosInstance.get(`satellites/25544/tles`)
        .then(response => response.data)
        .catch(error => {
            console.error("Error: " + error);
            throw error;
        });
}