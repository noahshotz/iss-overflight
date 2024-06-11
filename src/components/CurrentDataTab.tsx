import React from 'react';
import { useIssData } from '../context/issContext';

export const CurrentDataTab: React.FC = () => {
    const { issData, countdown } = useIssData();
    const { latitude, longitude } = issData || { latitude: 0, longitude: 0 };

    return (
        <div className="p-4 bg-gray-200 rounded-sm">
            <h2>Current data</h2>
            <p>Latitude: {latitude.toFixed(3)}</p>
            <p>Longitude: {longitude.toFixed(3)}</p>
            <small>Updating data in {countdown} seconds...</small>
        </div>
    );
};
