import { Feature, LineString } from 'geojson';

export const dateLineData: Feature<LineString> = {
    type: 'Feature',
    geometry: {
        type: 'LineString',
        coordinates: [[180, 90], [180, -90]],
    },
    properties: {}
};
export const zeroMeridian: Feature<LineString> = {
    type: 'Feature',
    geometry: {
        type: 'LineString',
        coordinates: [[0, 90], [0, -90]],
    },
    properties: {}
};

/**
 * Mapbox example code to draw a line between two points that may cross the 180th meridian
 */
export function createGeometryAcrossZeroMeridian(startcoords: number[], endcoords: number[]): Feature<LineString> {

    console.log("Coords:", startcoords, endcoords);

    const geometry = {
        'type': 'LineString',
        'coordinates': [
            startcoords,
            endcoords
        ],
    };

    // To draw a line across the 180th meridian,
    // if the longitude of the second point minus
    // the longitude of original (or previous) point is >= 180,
    // subtract 360 from the longitude of the second point.
    // If it is less than 180, add 360 to the second point.

    const startLng = geometry.coordinates[0][0];
    const endLng = geometry.coordinates[1][0];

    if (endLng - startLng >= 180) {
        geometry.coordinates[1][0] -= 360;
    } else if (endLng - startLng < 180) {
        geometry.coordinates[1][0] += 360;
    }

    return {
        type: 'Feature',
        geometry: geometry as LineString,
        properties: {},
    };
}

export function createOrbitGeometry(orbit: number[][]): Feature<LineString>[] {
    // Create a LineString GeoJSON object from the orbit data
    const geometry = {
        'type': 'LineString',
        'coordinates': orbit
    };

    let firstHalf = {
        'type': 'LineString',
        'coordinates': orbit
    };

    let secondHalf = {
        'type': 'LineString',
        'coordinates': orbit
    };

    // Find the crossing points
    let crossIndex = -1;
    for (let i = 1; i < geometry.coordinates.length; i++) {
        const startLng = geometry.coordinates[i - 1][0];
        const endLng = geometry.coordinates[i][0];

        if (Math.abs(endLng - startLng) >= 180) {
            crossIndex = i;
            break;
        }
    }

    // Apply the adjustment logic if a crossing is found
    if (crossIndex !== -1) {
        const startLng = geometry.coordinates[crossIndex - 1][0];
        const endLng = geometry.coordinates[crossIndex][0];

        if (endLng - startLng >= 180) {
            geometry.coordinates[crossIndex][0] -= 360;
        } else if (endLng - startLng < 180) {
            geometry.coordinates[crossIndex][0] += 360;
        }

        // split the array at crossIndex
        firstHalf = {
            'type': 'LineString',
            'coordinates': geometry.coordinates.slice(0, crossIndex)
        };
        secondHalf = {
            'type': 'LineString',
            'coordinates': geometry.coordinates.slice(crossIndex + 1)
        };

        // store the crossIndex coordinates in both arrays
        const crossingPoints: number[][] = [
            geometry.coordinates[crossIndex - 1],
            geometry.coordinates[crossIndex + 1],
        ];

        console.log('Crossing points:', crossingPoints.toString());

    }

    // Normalize longitudes back to the range [-180, 180]
    for (let i = 0; i < firstHalf.coordinates.length; i++) {
        while (firstHalf.coordinates[i][0] < -180) {
            firstHalf.coordinates[i][0] += 360;
        }
        while (firstHalf.coordinates[i][0] > 180) {
            firstHalf.coordinates[i][0] -= 360;
        }
    }

    return [
        {
            type: 'Feature',
            geometry: firstHalf as LineString,
            properties: {},
        },
        {
            type: 'Feature',
            geometry: secondHalf as LineString,
            properties: {},
        },
    ];
}