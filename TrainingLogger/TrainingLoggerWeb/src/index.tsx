import React from 'react';
import ReactDOM from 'react-dom';

// @ts-ignore
import * as AuthenticationContext from 'adal-vanilla/lib/adal'

import App from './Components/App/App';
import ApiService from './Services/ApiService'
import AppSettingsService from './Services/AppSettingsService'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

// grab ADAL settings and build the auth context.

let appSettings = new AppSettingsService();

(window as any).adalConfig = {
    clientId: appSettings.GetAadClientId(),
    tenant: appSettings.GetAadTenantId(),
    cacheLocation: appSettings.GetBrowserCacheLocation(),
    popUp: false
};
 
var authContext = new AuthenticationContext((window as any).adalConfig);
 
if (authContext.isCallback(window.location.hash)) {
    
    // handle auth redirect callback from Microsoft Identity provider.
    authContext.handleWindowCallback();
}
 
function startApplication(username: string, token: string, appSettings: AppSettingsService) {
    
    // construct the api helper.
    let apiBaseUri = appSettings.GetWebApiUri();
    let apiService = new ApiService(apiBaseUri, token);

    // start the main application.
    ReactDOM.render(<App user={username} apiService={apiService} settings={appSettings} />, document.getElementById('root'));
}

// check the cache for the authenticated user token.
// if the token isnt present or has expired then we redirect to the Microsoft Identity provider.

var user = authContext.getCachedUser();
 
if (user) {
    let clientId = (window as any).adalConfig.clientId;

    authContext.acquireToken(clientId, function (errorDesc: any, token: any, error: any) {
    if (error) {
        authContext.acquireTokenRedirect(clientId, null, null);
    }
    else {
        startApplication(user.userName, token, appSettings);
    }
});
}
else {
    authContext.login();
}