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
        let longitude = satellite.degreesLong(positionGd.longitude);
        const latitude = satellite.degreesLat(positionGd.latitude);

        // Wrap the longitude to handle international date line
        longitude = wrapLongitude(longitude);

        positions.push([longitude, latitude]);
    }

    // Add logic to handle the international date line
    return handleInternationalDateLine(positions);
}

export function wrapLongitude(lon: number): number {
    return ((lon + 180) % 360 + 360) % 360 - 180;
}

export function handleInternationalDateLine(positions: number[][]): number[][] {
    const fixedPositions: number[][] = [];
    let prevLon = positions[0][0];

    positions.forEach(([lon, lat]) => {
        // If there is a large jump in longitude, insert a line break
        if (Math.abs(lon - prevLon) > 180) {
            if (lon > prevLon) {
                fixedPositions.push([-180, lat]);
                fixedPositions.push([180, lat]);
            } else {
                fixedPositions.push([180, lat]);
                fixedPositions.push([-180, lat]);
            }
        }
        fixedPositions.push([lon, lat]);
        prevLon = lon;
    });
    return fixedPositions;
}
