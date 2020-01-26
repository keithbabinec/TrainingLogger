import ApiService from '../../Services/ApiService';
import AppSettingsService from '../../Services/AppSettingsService';

interface INewActivitySubmittedProps {
  apiService: ApiService,
  settings: AppSettingsService
};

export default INewActivitySubmittedProps;