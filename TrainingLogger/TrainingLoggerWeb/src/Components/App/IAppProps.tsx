import ApiService from '../../Services/ApiService';
import AppSettingsService from '../../Services/AppSettingsService';

interface IAppProps {
  user: string,
  apiService: ApiService,
  settings: AppSettingsService
};

export default IAppProps;