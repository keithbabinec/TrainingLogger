import ApiService from '../../Services/ApiService';
import AppSettingsService from '../../Services/AppSettingsService';

interface INewLiftingActivityProps {
  apiService: ApiService,
  settings: AppSettingsService
};

export default INewLiftingActivityProps;