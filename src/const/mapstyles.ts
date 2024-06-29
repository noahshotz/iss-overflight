import { LayerProps } from 'react-map-gl';
export const orbitLayerPassive1: LayerProps = {
    id: 'orbit1',
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

export const orbitLayerPassive2: LayerProps = {
    id: 'orbit2',
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
    id: 'orbit1active',
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

export const dateLineIndicator: LayerProps = {
    id: 'dateline',
    type: 'line',
    layout: {
        "line-cap": "round", // Rounded ends for the lines
        "line-join": "round", // Rounded corners for line joins
    },
    paint: {
        'line-color': '#423fsc',
        'line-width': 2,
    },
};

export const zeroMeridianIndicator: LayerProps = {
    id: 'zeromeridian',
    type: 'line',
    layout: {
        "line-cap": "round", // Rounded ends for the lines
        "line-join": "round", // Rounded corners for line joins
    },
    paint: {
        'line-color': '#423fsc',
        'line-width': 2,
    },
};

export const crossDateLineIndicator: LayerProps = {
    id: 'crossdateline',
    type: 'line',
    layout: {
        "line-cap": "round", // Rounded ends for the lines
        "line-join": "round", // Rounded corners for line joins
    },
    paint: {
        'line-color': '#cfeb34',
        'line-width': 2,
    },
};