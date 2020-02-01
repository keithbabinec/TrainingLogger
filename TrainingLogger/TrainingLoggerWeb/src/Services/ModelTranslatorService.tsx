import convert from 'convert-units';
import ActivityType from '../Models/ActivityType';
import PurposeType from '../Models/PurposeType';
import SurfaceType from '../Models/SurfaceType';
import HrZoneType from '../Models/HrZoneType';
import INewActivityState from '../Components/NewActivity/INewActivityState';
import IActivity from '../Models/IActivity';

class ModelTranslatorService {
    INewActivityStateToIActivity(value: INewActivityState): IActivity {
        let newActivity: IActivity = {
            'ID': 0,
            'UserObjectId': '00000000-0000-0000-0000-000000000000',
            'Date': value.dateSelectionField,
            'Type': ActivityType[value.activitySelectField as keyof typeof ActivityType],
            'Purpose': PurposeType[value.purposeSelectField as keyof typeof PurposeType],
            'Surface': SurfaceType[value.surfaceSelectField as keyof typeof SurfaceType],
            'Duration': value.durationSelection,
            'DistanceInMeters': Math.round(convert(Number(value.distanceSelection)).from('mi').to('m')),
            'AverageIntensity': HrZoneType[value.averageIntensityField as keyof typeof HrZoneType],
            'ElevationGain': value.elevationGainSelection,
            'ElevationLoss': value.elevationLossSelection,
            'Notes': value.notesSelectionField
        };

        return newActivity;
    }
}

export default ModelTranslatorService;