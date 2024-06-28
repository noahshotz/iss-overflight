import React from 'react';
import { useSatData } from '../context/satContext';

export const CurrentDataTab: React.FC = () => {
    const { satData } = useSatData();

    if (satData) {
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
                    <span>{satData.name.toUpperCase()}</span>
                </div>

                <div className="bg-[#212121] p-1 px-2 flex">
                    <span>ID</span>
                </div>
                <div className="bg-[#212121] p-1 px-2 flex">
                    <span>{satData.id}</span>
                </div>

                <div className="bg-[#212121] p-1 px-2 flex">
                    <span>LATITUDE</span>
                </div>
                <div className="bg-[#212121] p-1 px-2 flex">
                    <span>{satData.latitude.toFixed(4)}</span>
                </div>

                <div className="bg-[#212121] p-1 px-2 flex">
                    <span>LONGITUDE</span>
                </div>
                <div className="bg-[#212121] p-1 px-2 flex">
                    <span>{satData.longitude.toFixed(4)}</span>
                </div>

                <div className="bg-[#212121] p-1 px-2 flex">
                    <span>ALTITUDE</span>
                </div>
                <div className="bg-[#212121] p-1 px-2 flex">
                    <span>{satData.altitude.toFixed(0)} km</span>
                </div>

                <div className="bg-[#212121] p-1 px-2 flex">
                    <span>VELOCITY</span>
                </div>
                <div className="bg-[#212121] p-1 px-2 flex">
                    <span>{(satData.velocity / 3600).toFixed(2)} km/s</span>
                </div>

                <div className="bg-[#212121] p-1 px-2 flex">
                    <span>VISIBILITY</span>
                </div>
                <div className="bg-[#212121] p-1 px-2 flex">
                    <span>{satData.visibility}</span>
                </div>

                <div className="bg-[#212121] p-1 px-2 flex">
                    <span>FOOTPRINT</span>
                </div>
                <div className="bg-[#212121] p-1 px-2 flex">
                    <span>{satData.footprint.toFixed(2)}</span>
                </div>

                <div className="bg-[#212121] p-1 px-2 flex">
                    <span>TIMESTAMP</span>
                </div>
                <div className="bg-[#212121] p-1 px-2 flex">
                    <span>{satData.timestamp}</span>
                </div>

                <div className="bg-[#212121] p-1 px-2 flex">
                    <span>DAYNUM</span>
                </div>
                <div className="bg-[#212121] p-1 px-2 flex">
                    <span>{satData.daynum.toFixed(2)}</span>
                </div>

                <div className="bg-[#212121] p-1 px-2 flex">
                    <span>SOLAR LATITUDE</span>
                </div>
                <div className="bg-[#212121] p-1 px-2 flex">
                    <span>{satData.solar_lat.toFixed(3)}</span>
                </div>

                <div className="bg-[#212121] p-1 px-2 flex">
                    <span>SOLAR LONGITUDE</span>
                </div>
                <div className="bg-[#212121] p-1 px-2 flex">
                    <span>{satData.solar_lon.toFixed(3)}</span>
                </div>
            </div>
        )
    }
};