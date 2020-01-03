using System;
using System.Data.SqlClient;
using System.Threading.Tasks;
using TrainingLoggerSharedLibrary.Models;

namespace TrainingLoggerSharedLibrary.Database
{
    public class AzureSqlDatabase : IDatabase
    {
        public AzureSqlDatabase(string databaseConnectionString)
        {
            if (string.IsNullOrWhiteSpace(databaseConnectionString))
            {
                throw new ArgumentException(nameof(databaseConnectionString) + " must be provided.");
            }

            DatabaseConnectionString = databaseConnectionString;
        }

        private readonly string DatabaseConnectionString;

        public async Task AddActivityAsync(Activity activity)
        {
            // model validation

            if (activity == null)
            {
                throw new ModelValidationException(nameof(activity) + " must be provided.");
            }
            if (activity.UserObjectId == Guid.Empty)
            {
                throw new ModelValidationException(nameof(activity.UserObjectId) + " must be provided.");
            }
            if (activity.Date == DateTime.MinValue)
            {
                throw new ModelValidationException(nameof(activity.Date) + " must be provided.");
            }
            if (activity.Duration == TimeSpan.MinValue)
            {
                throw new ModelValidationException(nameof(activity.Duration) + " must be provided.");
            }
            if (activity.DistanceInMeters == int.MinValue)
            {
                throw new ModelValidationException(nameof(activity.DistanceInMeters) + " must be provided.");
            }

            using (SqlConnection sqlcon = new SqlConnection(DatabaseConnectionString))
            {
                await sqlcon.OpenAsync().ConfigureAwait(false);

                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = sqlcon;
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.CommandText = "dbo.AddActivity";

                    cmd.Parameters.AddWithValue("@UserObjectId", activity.UserObjectId);
                    cmd.Parameters.AddWithValue("@Date", activity.Date);
                    cmd.Parameters.AddWithValue("@Type", activity.Type);
                    cmd.Parameters.AddWithValue("@Purpose", activity.Purpose);
                    cmd.Parameters.AddWithValue("@Surface", activity.Surface);
                    cmd.Parameters.AddWithValue("@Duration", activity.Duration.Ticks);
                    cmd.Parameters.AddWithValue("@DistanceInMeters", activity.DistanceInMeters);
                    cmd.Parameters.AddWithValue("@AverageIntensity", activity.AverageIntensity);
                    cmd.Parameters.AddWithValue("@ElevationGain", activity.ElevationGain);
                    cmd.Parameters.AddWithValue("@ElevationLoss", activity.ElevationLoss);

                    if (activity.Notes != null)
                    {
                        cmd.Parameters.AddWithValue("@Notes", activity.Notes);
                    }

                    await cmd.ExecuteNonQueryAsync().ConfigureAwait(false);
                }
            }
        }
    }
}
