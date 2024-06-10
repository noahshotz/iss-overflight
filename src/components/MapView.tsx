// src/components/MapWithCircle.tsx
import React, { useState, useEffect } from 'react';
import { Map, Source, Layer, LayerProps } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useIssData } from '../context/issContext';
import { Point } from 'geojson';
import { Spinner } from '@nextui-org/react';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZWdlbnVzbWF4IiwiYSI6ImNsdm9maWs2YjBsZDIyaXAxczl1dnBjZDkifQ.5tifuxKwqOemhknU8QEKuA';

const pointLayer: LayerProps = {
    id: 'point',
    type: 'circle',
    paint: {
        'circle-radius': 10,
        'circle-color': '#007cbf',
    },
};

export const MapView: React.FC = () => {
    const { issData } = useIssData(); // Get ISS data from context
    const [pointData, setPointData] = useState<Point | null>(null);

    useEffect(() => {
        if (issData) {
            const { latitude, longitude } = issData.iss_position;
            setPointData({
                type: 'Point',
                coordinates: [longitude, latitude], // GeoJSON expects coordinates as [longitude, latitude]
            });
        }
    }, [issData]);

    if (!issData) {
        return (
            <div className="w-full h-[100vh] flex items-center justify-center bg-slate-200">
                <h2 className="text-2xl font-bold leading-none text-blue-700 flex items-center justify-center gap-2"><Spinner color="primary"/>Getting data</h2>
            </div>
        );
    }

    const { latitude, longitude } = issData.iss_position;

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
            </Map>
        </div>
    );
};
