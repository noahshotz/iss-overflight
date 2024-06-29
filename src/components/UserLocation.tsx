import React from "react";
import { Marker } from 'react-map-gl';

type Location = {
    latitude: number;
    longitude: number;
};

type UserLocationProps = {
    location: Location;
};

export const UserLocation: React.FC<UserLocationProps> = ({ location }) => {
    return (
        <Marker
            latitude={location.latitude}
            longitude={location.longitude}
            onClick={e => {
                e.originalEvent.stopPropagation();
            }}
        >
            <span className="relative flex h-8 w-8">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-100"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-blue-600 m-auto"></span>
            </span>
        </Marker>
    );
};
