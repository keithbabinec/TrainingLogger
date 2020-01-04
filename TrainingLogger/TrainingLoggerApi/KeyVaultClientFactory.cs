using Microsoft.Azure.KeyVault;
using Microsoft.Azure.Services.AppAuthentication;

namespace TrainingLoggerApi
{
    public class KeyVaultClientFactory
    {
        public IKeyVaultClient New()
        {
            var tokenProvider = new AzureServiceTokenProvider();
            
            var kvClient = new KeyVaultClient(
                new KeyVaultClient.AuthenticationCallback(tokenProvider.KeyVaultTokenCallback)
            );

            return kvClient;
        }
    }
}
