interface INewActivityState {
    dateSelectionField: string,
    activitySelectField: string,
    purposeSelectField: string,
    surfaceSelectField: string,
    durationSelection: string,
    distanceSelection: number,
    averageIntensityField: string,
    elevationGainSelection: number,
    elevationLossSelection: number,
    notesSelectionField: string,
    submissionCompleted: boolean,
    submissionInProgress: boolean
};

export default INewActivityState;