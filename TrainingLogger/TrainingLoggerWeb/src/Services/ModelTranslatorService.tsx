import convert from 'convert-units';
import EnumService from './EnumService';
import INewActivityState from '../Components/NewActivity/INewActivityState';
import IActivity from '../Models/IActivity';

class ModelTranslatorService {
    INewActivityStateToIActivity(value: INewActivityState): IActivity {

        let enums = new EnumService();

        let newActivity: IActivity = {
            'ID': 0,
            'UserObjectId': '00000000-0000-0000-0000-000000000000',
            'Date': value.dateSelectionField,
            'Type': enums.ConvertActivityToInt(value.activitySelectField),
            'Purpose': enums.ConvertPurposeToInt(value.purposeSelectField),
            'Surface': enums.ConvertSurfaceToInt(value.surfaceSelectField),
            'Duration': value.durationSelection,
            'DistanceInMeters': Math.round(convert(parseInt(value.distanceSelection)).from('mi').to('m')),
            'AverageIntensity': enums.ConvertIntensityToInt(value.averageIntensityField),
            'ElevationGain': value.elevationGainSelection,
            'ElevationLoss': value.elevationLossSelection,
            'Notes': value.notesSelectionField
        };

        return newActivity;
    }
}

export default ModelTranslatorService;