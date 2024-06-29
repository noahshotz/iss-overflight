import React, { createContext, useState, useContext, ReactNode } from 'react';

type Location = {
    latitude: number;
    longitude: number;
} | null;

interface UserLocationContextType {
    userLocation: Location;
    setUserLocation: React.Dispatch<React.SetStateAction<Location>>;
}

const UserLocationContext = createContext<UserLocationContextType | undefined>(undefined);

export const UserLocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userLocation, setUserLocation] = useState<Location>(null);

    return (
        <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
            {children}
        </UserLocationContext.Provider>
    );
};

export const useUserLocation = () => {
    const context = useContext(UserLocationContext);
    if (context === undefined) {
        throw new Error('useUserLocation must be used within a UserLocationProvider');
    }
    return context;
};
