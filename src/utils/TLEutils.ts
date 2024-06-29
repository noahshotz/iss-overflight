import * as satellite from 'satellite.js';
import { TLE } from '../interfaces/tle';

export function calculateOrbit(tle: TLE, numPoints: number = 90): number[][] {
    const { line1, line2 } = tle;
    const satrec = satellite.twoline2satrec(line1, line2);
    const positions: number[][] = [];

    const timeStep = 90 / numPoints; // 90 minutes per orbit

    for (let i = 0; i < numPoints; i++) {
        const time = new Date();
        time.setSeconds(time.getSeconds() + i * timeStep * 60);

        const positionAndVelocity = satellite.propagate(satrec, time);
        const positionGd = satellite.eciToGeodetic(positionAndVelocity.position as satellite.EciVec3<number>, satellite.gstime(time));
        const longitude = satellite.degreesLong(positionGd.longitude);
        const latitude = satellite.degreesLat(positionGd.latitude);

        positions.push([longitude, latitude]);
    }

    // Adjust longitudes to handle 180th meridian crossing
    for (let i = 1; i < positions.length; i++) {
        const prevLng = positions[i - 1][0];
        let currLng = positions[i][0];

        if (Math.abs(currLng - prevLng) > 180) {
            if (currLng > prevLng) {
                currLng -= 360;
            } else {
                currLng += 360;
            }
            positions[i][0] = currLng;
        }
    }

    // Normalize longitudes back to the range [-180, 180]
    for (let i = 0; i < positions.length; i++) {
        while (positions[i][0] < -180) {
            positions[i][0] += 360;
        }
        while (positions[i][0] > 180) {
            positions[i][0] -= 360;
        }
    }

    return positions;
}