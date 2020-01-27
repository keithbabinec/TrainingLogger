class EnumService {
    ConvertActivityToInt(value: string): number {
        switch(value) {
            case "Run": {
                return 0;
            }
            case "Hike": {
                return 1;
            }
            case "Cycle": {
                return 2;
            }
            default: {
                throw Error('Unexpected enum value: ' + value);
            }
        }
    }
    ConvertPurposeToInt(value: string): number {
        switch(value) {
            case "Training": {
                return 0;
            }
            case "Race": {
                return 1;
            }
            case "Leasure": {
                return 2;
            }
            default: {
                throw Error('Unexpected enum value: ' + value);
            }
        }
    }
    ConvertSurfaceToInt(value: string): number {
        switch(value) {
            case "Road": {
                return 0;
            }
            case "Trail": {
                return 1;
            }
            case "Track": {
                return 3;
            }
            case "Treadmill": {
                return 4;
            }
            case "Stepper": {
                return 5;
            }
            default: {
                throw Error('Unexpected enum value: ' + value);
            }
        }
    }
    ConvertIntensityToInt(value: string): number {
        switch(value) {
            case "Zone1": {
                return 0;
            }
            case "Zone2": {
                return 1;
            }
            case "Zone3": {
                return 2;
            }
            case "Zone4": {
                return 3;
            }
            case "Zone5": {
                return 4;
            }
            default: {
                throw Error('Unexpected enum value: ' + value);
            }
        }
    }
}

export default EnumService;