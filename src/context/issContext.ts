// src/context/issContext.ts
import { createContext, useContext } from 'react';
import { IssNow } from '../interfaces/iss';
import { TLE } from '../interfaces/tle';

// Define the type for the context value
interface IssDataContextType {
    issData: IssNow | null;
    countdown: number;
}

interface TLEDataContextType {
    tleData: TLE | null;
    countdown: number;
}

// Create context with undefined as initial value to enforce provider usage
export const IssDataContext = createContext<IssDataContextType | undefined>(undefined);

export const TLEDataContext = createContext<TLEDataContextType | undefined>(undefined);

// Custom hook to use the IssDataContext
export const useIssData = () => {
    const context = useContext(IssDataContext);
    if (context === undefined) {
        throw new Error('useIssData must be used within a IssDataProvider');
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