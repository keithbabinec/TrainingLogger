class AppSettingsService {
    GetAadClientId(): string {
        return process.env.REACT_APP_AAD_CLIENT_ID as string;
    }
    GetAadTenantId(): string {
        return process.env.REACT_APP_AAD_TENANT_ID as string;
    }
    GetBrowserCacheLocation(): string {
        return process.env.REACT_APP_BROWSER_CACHE_LOCATION as string;
    }
    GetWebApiUri(): string {
        return process.env.REACT_APP_WEB_API_BASE_URI as string;
    }
}

export default AppSettingsService;