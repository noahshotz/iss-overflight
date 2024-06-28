import React from 'react';
import { useIssData } from '../context/issContext';

export const CurrentDataTab: React.FC = () => {
    const { issData, countdown } = useIssData();
    const {
        name = '',
        id = 0,
        latitude = 0,
        longitude = 0,
        altitude = 0,
        velocity = 0,
        visibility = '',
        footprint = 0,
        timestamp = 0,
        daynum = 0,
        solar_lat = 0,
        solar_lon = 0,
        units = '',
    } = issData || {
        name: '',
        id: 0,
        latitude: 0,
        longitude: 0,
        altitude: 0,
        velocity: 0,
        visibility: '',
        footprint: 0,
        timestamp: 0,
        daynum: 0,
        solar_lat: 0,
        solar_lon: 0,
        units: '',
    };

    return (
        <div className="grid grid-cols-2 gap-1 text-white text-sm">
            <div className="col-span-1 bg-[#212121] p-1 px-2 flex">
                <span>SAT DATA:</span>
            </div>
            <div className="col-span-1 bg-[#212121] p-1 px-2 flex">
                <span>VALUE:</span>
            </div>

            <div className="bg-[#212121] p-1 px-2 flex">
                <span>NAME</span>
            </div>
            <div className="bg-[#212121] p-1 px-2 flex">
                <span>{name.toUpperCase()}</span>
            </div>

            <div className="bg-[#212121] p-1 px-2 flex">
                <span>ID</span>
            </div>
            <div className="bg-[#212121] p-1 px-2 flex">
                <span>{id}</span>
            </div>

            <div className="bg-[#212121] p-1 px-2 flex">
                <span>LATITUDE</span>
            </div>
            <div className="bg-[#212121] p-1 px-2 flex">
                <span>{latitude.toFixed(4)}</span>
            </div>

            <div className="bg-[#212121] p-1 px-2 flex">
                <span>LONGITUDE</span>
            </div>
            <div className="bg-[#212121] p-1 px-2 flex">
                <span>{longitude.toFixed(4)}</span>
            </div>

            <div className="bg-[#212121] p-1 px-2 flex">
                <span>ALTITUDE</span>
            </div>
            <div className="bg-[#212121] p-1 px-2 flex">
                <span>{altitude.toFixed(0)} km</span>
            </div>

            <div className="bg-[#212121] p-1 px-2 flex">
                <span>VELOCITY</span>
            </div>
            <div className="bg-[#212121] p-1 px-2 flex">
                <span>{(velocity / 3600).toFixed(2)} km/s</span>
            </div>

            <div className="bg-[#212121] p-1 px-2 flex">
                <span>VISIBILITY</span>
            </div>
            <div className="bg-[#212121] p-1 px-2 flex">
                <span>{visibility}</span>
            </div>

            <div className="bg-[#212121] p-1 px-2 flex">
                <span>FOOTPRINT</span>
            </div>
            <div className="bg-[#212121] p-1 px-2 flex">
                <span>{footprint.toFixed(2)}</span>
            </div>

            <div className="bg-[#212121] p-1 px-2 flex">
                <span>TIMESTAMP</span>
            </div>
            <div className="bg-[#212121] p-1 px-2 flex">
                <span>{timestamp}</span>
            </div>

            <div className="bg-[#212121] p-1 px-2 flex">
                <span>DAYNUM</span>
            </div>
            <div className="bg-[#212121] p-1 px-2 flex">
                <span>{daynum.toFixed(2)}</span>
            </div>

            <div className="bg-[#212121] p-1 px-2 flex">
                <span>SOLAR LATITUDE</span>
            </div>
            <div className="bg-[#212121] p-1 px-2 flex">
                <span>{solar_lat.toFixed(3)}</span>
            </div>

            <div className="bg-[#212121] p-1 px-2 flex">
                <span>SOLAR LONGITUDE</span>
            </div>
            <div className="bg-[#212121] p-1 px-2 flex">
                <span>{solar_lon.toFixed(3)}</span>
            </div>
        </div>
    );
};
