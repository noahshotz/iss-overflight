/**
 * {
    "requested_timestamp": 1364084064,
    "tle_timestamp": 1363892433,
    "id": "25544",
    "name": "iss",
    "header": "ISS (ZARYA)",
    "line1": "1 25544U 98067A   13080.79204657  .00024647  00000-0  40606-3 0  4540",
    "line2": "2 25544  51.6478 182.2316 0011718  59.7125  80.2831 15.52100765821132"
}
 */

export interface TLE {
    requested_timestamp: number;
    tle_timestamp: number;
    id: string;
    name: string;
    header: string;
    line1: string;
    line2: string;
}