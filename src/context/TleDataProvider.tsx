import React, { useState, useEffect, useCallback, ReactNode } from 'react';
import { TLEDataContext } from './issContext';
import { getISSTLE } from '../api/ISS';
import { TLE } from '../interfaces/tle';

// Define props for the provider
interface TLEDataProviderProps {
    children: ReactNode;
}

export const TLEDataProvider: React.FC<TLEDataProviderProps> = ({ children }) => {
    const [tleData, setTLEData] = useState<TLE | null>(null);
    const [countdown, setCountdown] = useState<number>(2);

    const fetchData = useCallback(async () => {
        try {
            const data = await getISSTLE();
            setTLEData(data);
        } catch (error) {
            console.error('Error fetching TLE data:', error);
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
        <TLEDataContext.Provider value={{ tleData, countdown }}>
            {children}
        </TLEDataContext.Provider>
    );
};