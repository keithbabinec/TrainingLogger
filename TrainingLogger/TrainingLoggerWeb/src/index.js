import React from 'react';
import ReactDOM from 'react-dom';
import * as AuthenticationContext from 'adal-vanilla/lib/adal'
import App from './App';
import AppSettingsService from './Services/AppSettingsService'

// grab ADAL settings and build the auth context.

let appSettings = new AppSettingsService();

window.adalConfig = {
    clientId: appSettings.GetAadClientId(),
    tenant: appSettings.GetAadTenantId(),
    cacheLocation: appSettings.GetBrowserCacheLocation(),
    popUp: false
};
 
var authContext = new AuthenticationContext(window.adalConfig);
 
if (authContext.isCallback(window.location.hash)) {
    
    // handle auth redirect callback from Microsoft Identity provider.
    authContext.handleWindowCallback();
}
 
function startApplication(username, token) {
    
    // start the main application.
    ReactDOM.render(<App user={username} bearerToken={token} />, document.getElementById('root'));
}

// check the cache for the authenticated user token.
// if the token isnt present or has expired then we redirect to the Microsoft Identity provider.

var user = authContext.getCachedUser();
 
if (user) {
    let clientId = window.adalConfig.clientId;

    authContext.acquireToken(clientId, function (errorDesc, token, error) {
    if (error) {
        authContext.acquireTokenRedirect(clientId, null, null);
    }
    else {
        startApplication(user.userName, token);
    }
});
}
else {
    authContext.login();
}