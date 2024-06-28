/**
 * {
  "name": "iss",
  "id": 25544,
  "latitude": -5.7069352755084,
  "longitude": -51.893558591694,
  "altitude": 417.82149630313,
  "velocity": 27579.214797562,
  "visibility": "daylight",
  "footprint": 4496.3635640634,
  "timestamp": 1718140145,
  "daynum": 2460473.3813079,
  "solar_lat": 23.160953217563,
  "solar_lon": 222.69528943633,
  "units": "kilometers"
}
 */

export interface SatNow {
  name: string;
  id: number;
  latitude: number;
  longitude: number;
  altitude: number;
  velocity: number;
  visibility: string;
  footprint: number;
  timestamp: number;
  daynum: number;
  solar_lat: number;
  solar_lon: number;
  units: string;
}