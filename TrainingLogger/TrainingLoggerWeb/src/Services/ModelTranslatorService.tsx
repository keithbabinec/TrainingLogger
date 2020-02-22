import convert from 'convert-units';
import DistanceActivityType from '../Models/DistanceActivityType';
import DistancePurposeType from '../Models/DistancePurposeType';
import LiftingActivityType from '../Models/LiftingActivityType';
import LiftingPurposeType from '../Models/LiftingPurposeType';
import LiftingFocusArea from '../Models/LiftingFocusArea';
import SurfaceType from '../Models/SurfaceType';
import HrZoneType from '../Models/HrZoneType';
import INewDistanceActivityState from '../Components/NewDistanceActivity/INewDistanceActivityState';
import INewLiftingActivityState from '../Components/NewLiftingActivity/INewLiftingActivityState';
import IDistanceActivity from '../Models/IDistanceActivity';
import ILiftingActivity from '../Models/ILiftingActivity';

class ModelTranslatorService {
    INewDistanceActivityStateToIDistanceActivity(value: INewDistanceActivityState): IDistanceActivity {
        let newActivity: IDistanceActivity = {
            'ID': 0,
            'UserObjectId': '00000000-0000-0000-0000-000000000000',
            'Date': value.dateSelectionField,
            'Type': DistanceActivityType[value.activitySelectField as keyof typeof DistanceActivityType],
            'Purpose': DistancePurposeType[value.purposeSelectField as keyof typeof DistancePurposeType],
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
    INewLiftingActivityStateToILiftingActivity(value: INewLiftingActivityState): ILiftingActivity {
        let newActivity: ILiftingActivity = {
            'ID': 0,
            'UserObjectId': '00000000-0000-0000-0000-000000000000',
            'Date': value.dateSelectionField,
            'Type': LiftingActivityType[value.activitySelectField as keyof typeof LiftingActivityType],
            'Purpose': LiftingPurposeType[value.purposeSelectField as keyof typeof LiftingPurposeType],
            'FocusArea': LiftingFocusArea[value.focusSelectField as keyof typeof LiftingFocusArea],
            'Duration': value.durationSelection,
            'AverageIntensity': HrZoneType[value.averageIntensityField as keyof typeof HrZoneType],
            'Notes': value.notesSelectionField
        };

        return newActivity;
    }
}

export default ModelTranslatorService;