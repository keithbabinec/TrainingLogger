import ApiService from '../../Services/ApiService';
import AppSettingsService from '../../Services/AppSettingsService';

interface INewActivityProps {
  apiService: ApiService,
  settings: AppSettingsService
};

export default INewActivityProps;