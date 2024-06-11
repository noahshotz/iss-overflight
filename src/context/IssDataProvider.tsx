import React, { useState, useEffect, useCallback, ReactNode } from 'react';
import { IssDataContext } from './issContext';
import { getISSPosition } from '../api/ISS';
import { IssNow } from '../interfaces/iss';

// Define props for the provider
interface IssDataProviderProps {
    children: ReactNode;
}

export const IssDataProvider: React.FC<IssDataProviderProps> = ({ children }) => {
    const [issData, setIssData] = useState<IssNow | null>(null);
    const [countdown, setCountdown] = useState<number>(2);

    const fetchData = useCallback(async () => {
        try {
            const data = await getISSPosition();
            const parsedData: IssNow = {
                ...data,
                latitude: data.latitude,
                longitude: data.longitude,
                altitude: data.altitude,
                velocity: data.velocity,
                visibility: data.visibility,
                footprint: data.footprint,
                timestamp: data.timestamp,
                daynum: data.daynum,
                solar_lat: data.solar_lat,
                solar_lon: data.solar_lon,
            };
            setIssData(parsedData);
        } catch (error) {
            console.error('Error fetching ISS data:', error);
        }
    }, []);

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 2000);
        return () => clearInterval(intervalId);
    }, [fetchData]);

    useEffect(() => {
        const countdownInterval = setInterval(() => {
            setCountdown(prev => (prev > 1 ? prev - 1 : 2));
        }, 1000);
        return () => clearInterval(countdownInterval);
    }, []);

    return (
        <IssDataContext.Provider value={{ issData, countdown }}>
            {children}
        </IssDataContext.Provider>
    );
};
