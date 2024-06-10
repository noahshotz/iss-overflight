// src/context/issContext.ts
import { createContext, useContext } from 'react';
import { IssNow } from '../interfaces/opennotify';

// Define the type for the context value
interface IssDataContextType {
    issData: IssNow | null;
    countdown: number;
}

// Create context with undefined as initial value to enforce provider usage
const IssDataContext = createContext<IssDataContextType | undefined>(undefined);

// Custom hook to use the IssDataContext
export const useIssData = () => {
    const context = useContext(IssDataContext);
    if (context === undefined) {
        throw new Error('useIssData must be used within a IssDataProvider');
    }
    return context;
};

export default IssDataContext;
