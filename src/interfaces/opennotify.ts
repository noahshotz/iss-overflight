export interface IssNow {
    message: string;
    timestamp: number;
    iss_position: {
        latitude: number;
        longitude: number;
    }
}