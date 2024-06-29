import React, { useState, useEffect, useCallback } from 'react';
// mapbox-gl components
import { Map, Source, Layer, Marker, GeolocateControl, FullscreenControl, NavigationControl, ScaleControl } from 'react-map-gl';
import { Feature, LineString } from 'geojson';
import 'mapbox-gl/dist/mapbox-gl.css';
// iss data context
import { useSatData, useTLEData } from '../context/satContext';
// calculation utils
import { calculateOrbit } from '../utils/TLEutils';
// icons
import { LiaSatelliteSolid } from "react-icons/lia";
// nextui components
import { Spinner } from '@nextui-org/react';
import { SatNow } from '../interfaces/sat';
import { CurrentDataTab } from './CurrentDataTab';
import { getAllSatPositions } from '../api/SAT';
import { orbitLayerPassive, orbitLayerActive } from '../const/map';
import { useUserLocation } from '../context/userLocationContext';
import { UserLocation } from './UserLocation';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export const MapView: React.FC = () => {
    const { satData } = useSatData();
    const { tleData } = useTLEData();
    const [orbitData, setOrbitData] = useState<Feature<LineString> | null>(null);
    const [satelliteData, setSatelliteData] = useState<SatNow | null>({
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
        if (satData) {
            setSatelliteData(satData);
        }
    }, [satData]);

    const [allSatData, setAllSatData] = useState<SatNow[] | null>(null);
    useEffect(() => {
        getAllSatPositions()
            .then((data) => {
                setAllSatData(data);
            })
            .catch((error) => {
                console.error('Error: ' + error);
            });
    }, []);

    useEffect(() => {
        if (allSatData) {
            console.log(allSatData);
        }
    }, [allSatData]);

    const [showData, setShowData] = useState(false);
    const handleSatelliteClick = (id: number) => {
        console.log('Satellite clicked', id);
        setShowData(true);
    };

    const [isUserLocationLoading, setIsUserLocationLoading] = useState<boolean>(true);
    const { userLocation, setUserLocation } = useUserLocation();

    /**
     * Get user location
     */
    const fetchUserLocation = useCallback(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userCoords = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    };
                    setUserLocation(userCoords);
                    setIsUserLocationLoading(false);
                },
                (error) => {
                    setIsUserLocationLoading(false);
                    if (error.code === 1) {
                        console.log("User denied geolocation");
                    }
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
            setIsUserLocationLoading(false);
        }
    }, [setUserLocation]);

    /**
     * Check user location permission and fetch user location on mount
     */
    useEffect(() => {
        if (navigator.permissions) {
            navigator.permissions.query({ name: 'geolocation' }).then((result) => {
                if (result.state === 'denied') {
                    setIsUserLocationLoading(false);
                } else if (result.state === 'granted') {
                    fetchUserLocation();
                } else {
                    fetchUserLocation();
                }
            });
        } else {
            fetchUserLocation();
        }
    }, [fetchUserLocation]);

    if (!satData || isUserLocationLoading) {
        return (
            <div className="w-full h-[100vh] flex items-center justify-center bg-black">
                <h2 className="text-2xl font-bold leading-none text-gray-500 flex items-center justify-center gap-3">
                    <Spinner color="default" />
                    Getting data
                </h2>
            </div>
        );
    }

    const { latitude, longitude } = satData;

    return (
        <div className="w-full h-[100vh]">
            {showData && (
                <div className="absolute m-0 p-4 z-10 bottom-0 right-0">
                    <CurrentDataTab />
                </div>
            )}
            <Map
                initialViewState={{
                    longitude,
                    latitude,
                    zoom: 3,
                }}
                attributionControl={false}
                mapStyle="mapbox://styles/egenusmax/clxxufklp000f01qpa6my5vuu"
                mapboxAccessToken={MAPBOX_TOKEN}
            >
                <FullscreenControl position="top-right" />
                <NavigationControl position="top-right" />
                {userLocation && <UserLocation location={userLocation} />}
                {satelliteData && (
                    <Marker
                        key={`sat-marker-${latitude}-${longitude}`}
                        latitude={latitude}
                        longitude={longitude}
                        onClick={() => handleSatelliteClick(satelliteData.id)}
                    >
                        <div className="relative left-30">
                            <div className="absolute bg-gray-800 px-3 py-1 min-w-48 text-right flex flex-col gap-1 right-9">
                                <div className="leading-none font-medium text-white">{satelliteData.name.toUpperCase()}</div>
                                <div className="leading-none font-normal text-gray-400">ID {satelliteData.id} V: {(satelliteData.velocity / 3600).toFixed(2)} km/s</div>
                            </div>
                            <div className="bg-gray-800 text-white text-2xl p-1"><LiaSatelliteSolid /></div>
                        </div>
                    </Marker>
                )}
                {(orbitData && !showData) && (
                    <Source type="geojson" data={orbitData}>
                        <Layer {...orbitLayerPassive} />
                    </Source>
                )}
                {(orbitData && showData) && (
                    <Source type="geojson" data={orbitData}>
                        <Layer {...orbitLayerActive} />
                    </Source>
                )}
            </Map>
        </div>
    );
};