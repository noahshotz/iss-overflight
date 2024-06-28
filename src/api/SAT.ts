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

const satIDs: string[] = [
    '25544', // ISS
]

export async function getAllSatPositions(): Promise<SatNow[]> {
    // for each satID, do an axios request and append the response to an array
    // return the array
    const satPositions: SatNow[] = [];
    for (const satID of satIDs) {
        await axiosInstance.get(`satellites/${satID}`)
            .then(response => {
                satPositions.push(response.data);
            })
            .catch(error => {
                console.error("Error: " + error);
                throw error;
            });
    }
    return satPositions;
}

export async function getSatTLE(): Promise<TLE> {
    return axiosInstance.get(`satellites/25544/tles`)
        .then(response => response.data)
        .catch(error => {
            console.error("Error: " + error);
            throw error;
        });
}