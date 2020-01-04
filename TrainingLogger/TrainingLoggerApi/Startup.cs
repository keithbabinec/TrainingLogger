using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Azure.KeyVault;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using TrainingLoggerSharedLibrary.Database;

namespace TrainingLoggerApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        private string CorsPolicyName = "MainPolicy";

        public void ConfigureServices(IServiceCollection services)
        {
            var config = new ConfigHelper(Configuration);
            services.AddSingleton(config);

            var kvClientFactory = new KeyVaultClientFactory();
            var kvClient = kvClientFactory.New();
            services.AddSingleton(kvClient);

            var dbConnectionString = kvClient.GetSecretAsync(
                config.KeyVaultUri,
                config.DatabaseConnectionStringSecretName).GetAwaiter().GetResult();

            var dbClient = new AzureSqlDatabase(dbConnectionString.Value);

            services.AddSingleton<IDatabase>(dbClient);

            services.AddAuthentication(x =>
            {
                x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x => 
            {
                x.Authority = config.Authority;
                x.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidAudience = config.ValidAudience
                };
            });

            services.AddCors(x =>
            {
                x.AddPolicy(CorsPolicyName,
                    policyBuilder =>
                    {
                        policyBuilder.WithOrigins(config.AllowedCorsOrigin).AllowAnyMethod().AllowAnyHeader();
                    });
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHsts();
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseCors(CorsPolicyName);

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
