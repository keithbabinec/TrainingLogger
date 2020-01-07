class AppSettingsService {
    GetAadClientId() {
        return process.env.REACT_APP_AAD_CLIENT_ID;
    }
    GetAadTenantId() {
        return process.env.REACT_APP_AAD_TENANT_ID;
    }
    GetBrowserCacheLocation() {
        return process.env.REACT_APP_BROWSER_CACHE_LOCATION;
    }
}

export default AppSettingsService;