// src/context/issContext.ts
import { createContext, useContext } from 'react';
import { SatNow } from '../interfaces/sat';
import { TLE } from '../interfaces/tle';

// Define the type for the context value
interface SatDataContextType {
    satData: SatNow | null;
    countdown: number;
}

interface TLEDataContextType {
    tleData: TLE | null;
    countdown: number;
}

// Create context with undefined as initial value to enforce provider usage
export const SatDataContext = createContext<SatDataContextType | undefined>(undefined);

export const TLEDataContext = createContext<TLEDataContextType | undefined>(undefined);

// Custom hook to use the SatDataContext
export const useSatData = () => {
    const context = useContext(SatDataContext);
    if (context === undefined) {
        throw new Error('useSatData must be used within a IssDataProvider');
    }
    return context;
};

export const useTLEData = () => {
    const context = useContext(TLEDataContext);
    if (context === undefined) {
        throw new Error('useTLEData must be used within a TLEDataProvider');
    }
    return context;
};