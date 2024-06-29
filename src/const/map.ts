import { LayerProps } from 'react-map-gl';
export const orbitLayerPassive: LayerProps = {
    id: 'orbit',
    type: 'line',
    layout: {
        "line-cap": "round", // Rounded ends for the lines
        "line-join": "round", // Rounded corners for line joins
    },
    paint: {
        'line-color': '#29755b',
        'line-width': 2,
    },
};

export const orbitLayerActive: LayerProps = {
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