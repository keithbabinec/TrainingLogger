import ApiService from '../../Services/ApiService';
import AppSettingsService from '../../Services/AppSettingsService';

interface IReportingProps {
  apiService: ApiService,
  settings: AppSettingsService
};

export default IReportingProps;