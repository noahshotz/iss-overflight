import React, { useState, useEffect, useCallback, ReactNode } from 'react';
import IssDataContext from './issContext';
import { getISSPosition } from '../api/ISS';
import { IssNow } from '../interfaces/opennotify';

// Define props for the provider
interface IssDataProviderProps {
    children: ReactNode;
}

export const IssDataProvider: React.FC<IssDataProviderProps> = ({ children }) => {
    const [issData, setIssData] = useState<IssNow | null>(null);
    const [countdown, setCountdown] = useState<number>(6);

    const fetchData = useCallback(async () => {
        try {
            const data = await getISSPosition();
            const parsedData: IssNow = {
                ...data,
                iss_position: {
                    latitude: data.iss_position.latitude,
                    longitude: data.iss_position.longitude,
                },
            };
            setIssData(parsedData);
        } catch (error) {
            console.error('Error fetching ISS data:', error);
        }
    }, []);

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 6000);
        return () => clearInterval(intervalId);
    }, [fetchData]);

    useEffect(() => {
        const countdownInterval = setInterval(() => {
            setCountdown(prev => (prev > 1 ? prev - 1 : 6));
        }, 1000);
        return () => clearInterval(countdownInterval);
    }, []);

    return (
        <IssDataContext.Provider value={{ issData, countdown }}>
            {children}
        </IssDataContext.Provider>
    );
};
