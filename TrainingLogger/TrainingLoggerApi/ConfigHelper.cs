using Microsoft.Extensions.Configuration;

namespace TrainingLoggerApi
{
    public class ConfigHelper
    {
        private IConfiguration Configuration;

        public ConfigHelper(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public string Authority
        {
            get
            {
                return Configuration["Authority"];
            }
        }

        public string ValidAudience
        {
            get
            {
                return Configuration["ValidAudience"];
            }
        }

        public string AllowedCorsOrigin
        {
            get
            {
                return Configuration["AllowedCorsOrigin"];
            }
        }

        public string KeyVaultUri
        {
            get
            {
                return Configuration["KeyVaultUri"];
            }
        }

        public string DatabaseConnectionStringSecretName
        {
            get
            {
                return Configuration["DatabaseConnectionStringSecretName"];
            }
        }
    }
}
