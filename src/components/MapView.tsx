import React, { useState, useEffect } from 'react';

// mapbox-gl components
import { Map, Source, Layer, LayerProps, Marker } from 'react-map-gl';
import { Feature, LineString } from 'geojson';
import 'mapbox-gl/dist/mapbox-gl.css';
// iss data context
import { useIssData, useTLEData } from '../context/issContext';
// calculation utils
import { calculateOrbit } from '../utils/TLEutils';
// icons
import { LiaSatelliteSolid } from "react-icons/lia";
// nextui components
import { Spinner } from '@nextui-org/react';
import { IssNow } from '../interfaces/iss';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const orbitLayer: LayerProps = {
    id: 'orbit',
    type: 'line',
    layout: {
        "line-cap": "round", // Rounded ends for the lines
        "line-join": "round", // Rounded corners for line joins
    },
    paint: {
        'line-color': '#fff',
        'line-width': 2,
    },
};

export const MapView: React.FC = () => {
    const { issData } = useIssData();
    const { tleData } = useTLEData();
    const [orbitData, setOrbitData] = useState<Feature<LineString> | null>(null);
    const [satelliteData, setSatelliteData] = useState<IssNow | null>({
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
    });

    useEffect(() => {
        if (tleData) {
            const orbit = calculateOrbit(tleData);
            setOrbitData({
                type: 'Feature',
                geometry: {
                    type: 'LineString',
                    coordinates: orbit, // Use processed coordinates
                },
                properties: {},
            });
        }
    }, [tleData]);

    useEffect(() => {
        if (issData) {
            setSatelliteData(issData);
        }

    }, [issData]);


    if (!issData) {
        return (
            <div className="w-full h-[100vh] flex items-center justify-center bg-slate-200">
                <h2 className="text-2xl font-bold leading-none text-blue-700 flex items-center justify-center gap-2">
                    <Spinner color="primary" />
                    Getting data
                </h2>
            </div>
        );
    }

    const { latitude, longitude } = issData;

    return (
        <div className="w-full h-[100vh]">
            <Map
                initialViewState={{
                    longitude,
                    latitude,
                    zoom: 5,
                }}
                attributionControl={false}
                mapStyle="mapbox://styles/egenusmax/clxxufklp000f01qpa6my5vuu"
                mapboxAccessToken={MAPBOX_TOKEN}
            >
                {satelliteData && (
                    <Marker
                        key={`sat-marker-${latitude}-${longitude}`}
                        latitude={latitude}
                        longitude={longitude}
                    >
                        <div className="relative left-30 flex flex-row gap-1 items-start">
                            
                            <div className="absolute bg-gray-800 px-3 py-1 min-w-48 text-right flex flex-col gap-1 right-10">
                                <div className="leading-none font-medium text-white">{satelliteData.name.toUpperCase()}</div>
                                <div className="leading-none font-normal text-gray-400">ID {satelliteData.id} V: {(satelliteData.velocity / 3600).toFixed(2)} km/s</div>
                            </div>
                            <div className="bg-gray-800 text-white text-2xl p-1"><LiaSatelliteSolid /></div>
                        </div>
                    </Marker>
                )}
                {orbitData && (
                    <Source type="geojson" data={orbitData}>
                        <Layer {...orbitLayer} />
                    </Source>
                )}
            </Map>
        </div>
    );
};
