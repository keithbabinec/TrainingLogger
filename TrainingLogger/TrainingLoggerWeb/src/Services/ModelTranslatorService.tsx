import convert from 'convert-units';
import DistanceActivityType from '../Models/DistanceActivityType';
import DistancePurposeType from '../Models/DistancePurposeType';
import SurfaceType from '../Models/SurfaceType';
import HrZoneType from '../Models/HrZoneType';
import INewDistanceActivityState from '../Components/NewDistanceActivity/INewDistanceActivityState';
import IDistanceActivity from '../Models/IDistanceActivity';

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
}

export default ModelTranslatorService;