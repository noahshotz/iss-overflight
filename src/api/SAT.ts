import { SatNow } from "../interfaces/sat";
import { TLE } from "../interfaces/tle";
import axiosInstance from "./axiosInstance";

export async function getSatPosition(): Promise<SatNow> {
    return axiosInstance.get(`satellites/25544`)
        .then(response => response.data)
        .catch(error => {
            console.error("Error: " + error);
            throw error;
        });
}

export async function getSatTLE(): Promise<TLE> {
    return axiosInstance.get(`satellites/25544/tles`)
        .then(response => response.data)
        .catch(error => {
            console.error("Error: " + error);
            throw error;
        });
}