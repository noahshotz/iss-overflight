import React, { useState, useEffect } from 'react';

// mapbox-gl components
import { Map, Source, Layer, LayerProps } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// iss data
import { useIssData, useTLEData } from '../context/issContext';

import { calculateOrbit } from '../utils/TLEutils';

import { Feature, LineString, Point } from 'geojson';

// nextui components
import { Spinner } from '@nextui-org/react';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const pointLayer: LayerProps = {
    id: 'point',
    type: 'circle',
    paint: {
        'circle-radius': 7,
        'circle-color': '#007cbf',
    },
};

const orbitLayer: LayerProps = {
    id: 'orbit',
    type: 'line',
    layout: {
        "line-cap": "round", // Rounded ends for the lines
        "line-join": "round", // Rounded corners for line joins
    },
    paint: {
        'line-color': '#007cbf',
        'line-width': 2,
    },
};

export const MapView: React.FC = () => {
    const { issData } = useIssData(); // Abrufen der ISS-Daten aus dem Kontext
    const { tleData } = useTLEData(); // Abrufen der TLE-Daten aus dem Kontext
    const [pointData, setPointData] = useState<Feature<Point> | null>(null);
    const [orbitData, setOrbitData] = useState<Feature<LineString> | null>(null);

    useEffect(() => {
        if (issData) {
            const { latitude, longitude } = issData;
            setPointData({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [longitude, latitude], // GeoJSON erwartet Koordinaten als [Längengrad, Breitengrad]
                },
                properties: {}, // Muss vorhanden sein, auch wenn es leer ist
            });
        }
    }, [issData]);

    useEffect(() => {
        if (tleData) {
            const orbit = calculateOrbit(tleData);
            setOrbitData({
                type: 'Feature',
                geometry: {
                    type: 'LineString',
                    coordinates: orbit, // GeoJSON erwartet Koordinaten als [Längengrad, Breitengrad]
                },
                properties: {}, // Muss vorhanden sein, auch wenn es leer ist
            });
        }
    }, [tleData]);

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
                    zoom: 2,
                }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken={MAPBOX_TOKEN}
            >
                {pointData && (
                    <Source type="geojson" data={pointData}>
                        <Layer {...pointLayer} />
                    </Source>
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
