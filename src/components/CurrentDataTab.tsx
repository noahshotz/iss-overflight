import React from 'react';
import { useIssData } from '../context/issContext';

export const CurrentDataTab: React.FC = () => {
    const { issData, countdown } = useIssData();
    const { latitude = "Unavailable", longitude = "Unavailable" } = issData?.iss_position || {};

    return (
        <div className="p-4 bg-gray-200 rounded-sm">
            <h2>Current data</h2>
            <p>Latitude: {latitude}</p>
            <p>Longitude: {longitude}</p>
            <small>Updating data in {countdown} seconds...</small>
        </div>
    );
};
