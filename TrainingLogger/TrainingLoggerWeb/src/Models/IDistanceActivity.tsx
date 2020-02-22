interface IDistanceActivity {
    ID: number;
    UserObjectId: string;
    Date: string;
    Type: number;
    Purpose: number;
    Surface: number;
    Duration: string;
    DistanceInMeters: number;
    AverageIntensity: number;
    ElevationGain: number;
    ElevationLoss: number;
    Notes: string
}

export default IDistanceActivity;