import React, { useState, useEffect, useCallback, ReactNode } from 'react';
import { SatDataContext } from './satContext';
import { getSatPosition } from '../api/SAT';
import { SatNow } from '../interfaces/sat';

// Define props for the provider
interface SatDataProviderProps {
    children: ReactNode;
}

export const SatDataProvider: React.FC<SatDataProviderProps> = ({ children }) => {
    const [satData, setSatData] = useState<SatNow | null>(null);
    const [countdown, setCountdown] = useState<number>(2);

    const fetchData = useCallback(async () => {
        try {
            const data = await getSatPosition();
            const parsedData: SatNow = {
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
            setSatData(parsedData);
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
        <SatDataContext.Provider value={{ satData, countdown }}>
            {children}
        </SatDataContext.Provider>
    );
};
