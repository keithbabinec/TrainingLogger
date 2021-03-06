import ApiService from '../../Services/ApiService';
import AppSettingsService from '../../Services/AppSettingsService';

interface IHomeProps {
  apiService: ApiService,
  settings: AppSettingsService
};

export default IHomeProps;