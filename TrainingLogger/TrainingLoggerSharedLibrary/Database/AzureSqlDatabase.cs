using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using TrainingLoggerSharedLibrary.Exceptions;
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

        public async Task<Activities> GetActivitiesByUserAsync(Guid userObjectId)
        {
            if (userObjectId == Guid.Empty)
            {
                throw new ModelValidationException(nameof(userObjectId) + " must be provided.");
            }

            using (SqlConnection sqlcon = new SqlConnection(DatabaseConnectionString))
            {
                await sqlcon.OpenAsync().ConfigureAwait(false);

                var results = new Activities();
                results.DistanceActivities = new List<DistanceActivity>();
                results.LiftingActivities = new List<LiftingActivity>();

                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = sqlcon;
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.CommandText = "dbo.GetDistanceActivitiesByUser";

                    cmd.Parameters.AddWithValue("@UserObjectId", userObjectId);

                    using (var rdr = await cmd.ExecuteReaderAsync().ConfigureAwait(false))
                    {
                        if (rdr.HasRows)
                        {
                            while (await rdr.ReadAsync().ConfigureAwait(false))
                            {
                                results.DistanceActivities.Add(new DistanceActivity()
                                {
                                    ID = rdr.GetInt64(0),
                                    UserObjectId = rdr.GetGuid(1),
                                    Date = rdr.GetDateTime(2),
                                    Type = (DistanceActivityType)rdr.GetInt32(3),
                                    Purpose = (DistancePurposeType)rdr.GetInt32(4),
                                    Surface = (SurfaceType)rdr.GetInt32(5),
                                    Duration = TimeSpan.FromTicks(rdr.GetInt64(6)).ToString(),
                                    DistanceInMeters = rdr.GetInt32(7),
                                    AverageIntensity = (HrZoneType)rdr.GetInt32(8),
                                    ElevationGain = rdr.GetInt32(9),
                                    ElevationLoss = rdr.GetInt32(10),
                                    Notes = rdr.GetString(11)
                                });
                            }
                        }
                    }
                }

                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = sqlcon;
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.CommandText = "dbo.GetLiftingActivitiesByUser";

                    cmd.Parameters.AddWithValue("@UserObjectId", userObjectId);

                    using (var rdr = await cmd.ExecuteReaderAsync().ConfigureAwait(false))
                    {
                        if (rdr.HasRows)
                        {
                            while (await rdr.ReadAsync().ConfigureAwait(false))
                            {
                                results.LiftingActivities.Add(new LiftingActivity()
                                {
                                    ID = rdr.GetInt64(0),
                                    UserObjectId = rdr.GetGuid(1),
                                    Date = rdr.GetDateTime(2),
                                    Type = (LiftingActivityType)rdr.GetInt32(3),
                                    Purpose = (LiftingPurposeType)rdr.GetInt32(4),
                                    FocusArea = (LiftingFocusArea)rdr.GetInt32(5),
                                    Duration = TimeSpan.FromTicks(rdr.GetInt64(6)).ToString(),
                                    AverageIntensity = (HrZoneType)rdr.GetInt32(7),
                                    Notes = rdr.GetString(8)
                                });
                            }
                        }
                    }
                }

                return results;
            }
        }

        public async Task AddLiftingActivityAsync(LiftingActivity activity)
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
            if (string.IsNullOrWhiteSpace(activity.Duration))
            {
                throw new ModelValidationException(nameof(activity.Duration) + " must be provided.");
            }

            // convert the timespan type (system.text.json doesn't support it yet)

            var validTimespan = TimeSpan.TryParse(activity.Duration, out TimeSpan parsedTs);

            if (!validTimespan)
            {
                throw new ModelValidationException(nameof(activity.Duration) + " must be provided.");
            }

            using (SqlConnection sqlcon = new SqlConnection(DatabaseConnectionString))
            {
                await sqlcon.OpenAsync().ConfigureAwait(false);

                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = sqlcon;
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.CommandText = "dbo.AddLiftingActivity";

                    cmd.Parameters.AddWithValue("@UserObjectId", activity.UserObjectId);
                    cmd.Parameters.AddWithValue("@Date", activity.Date);
                    cmd.Parameters.AddWithValue("@Type", activity.Type);
                    cmd.Parameters.AddWithValue("@Purpose", activity.Purpose);
                    cmd.Parameters.AddWithValue("@FocusArea", activity.FocusArea);
                    cmd.Parameters.AddWithValue("@Duration", parsedTs.Ticks);
                    cmd.Parameters.AddWithValue("@AverageIntensity", activity.AverageIntensity);

                    if (activity.Notes != null)
                    {
                        cmd.Parameters.AddWithValue("@Notes", activity.Notes);
                    }

                    await cmd.ExecuteNonQueryAsync().ConfigureAwait(false);
                }
            }
        }

        public async Task AddDistanceActivityAsync(DistanceActivity activity)
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
            if (string.IsNullOrWhiteSpace(activity.Duration))
            {
                throw new ModelValidationException(nameof(activity.Duration) + " must be provided.");
            }
            if (activity.DistanceInMeters == int.MinValue)
            {
                throw new ModelValidationException(nameof(activity.DistanceInMeters) + " must be provided.");
            }

            // convert the timespan type (system.text.json doesn't support it yet)

            var validTimespan = TimeSpan.TryParse(activity.Duration, out TimeSpan parsedTs);

            if (!validTimespan)
            {
                throw new ModelValidationException(nameof(activity.Duration) + " must be provided.");
            }

            using (SqlConnection sqlcon = new SqlConnection(DatabaseConnectionString))
            {
                await sqlcon.OpenAsync().ConfigureAwait(false);

                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = sqlcon;
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.CommandText = "dbo.AddDistanceActivity";

                    cmd.Parameters.AddWithValue("@UserObjectId", activity.UserObjectId);
                    cmd.Parameters.AddWithValue("@Date", activity.Date);
                    cmd.Parameters.AddWithValue("@Type", activity.Type);
                    cmd.Parameters.AddWithValue("@Purpose", activity.Purpose);
                    cmd.Parameters.AddWithValue("@Surface", activity.Surface);
                    cmd.Parameters.AddWithValue("@Duration", parsedTs.Ticks);
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

        public async Task RemoveLiftingActivityAsync(long activityId, Guid userId)
        {
            // model validation

            if (activityId <= 0)
            {
                throw new ModelValidationException(nameof(activityId) + " must be provided.");
            }
            if (userId == Guid.Empty)
            {
                throw new ModelValidationException(nameof(userId) + " must be provided.");
            }

            using (SqlConnection sqlcon = new SqlConnection(DatabaseConnectionString))
            {
                await sqlcon.OpenAsync().ConfigureAwait(false);

                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = sqlcon;
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.CommandText = "dbo.RemoveLiftingActivity";

                    cmd.Parameters.AddWithValue("@UserObjectId", userId);
                    cmd.Parameters.AddWithValue("@ActivityId", activityId);

                    await cmd.ExecuteNonQueryAsync().ConfigureAwait(false);
                }
            }
        }

        public async Task RemoveDistanceActivityAsync(long activityId, Guid userId)
        {
            // model validation

            if (activityId <= 0)
            {
                throw new ModelValidationException(nameof(activityId) + " must be provided.");
            }
            if (userId == Guid.Empty)
            {
                throw new ModelValidationException(nameof(userId) + " must be provided.");
            }

            using (SqlConnection sqlcon = new SqlConnection(DatabaseConnectionString))
            {
                await sqlcon.OpenAsync().ConfigureAwait(false);

                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = sqlcon;
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.CommandText = "dbo.RemoveDistanceActivity";

                    cmd.Parameters.AddWithValue("@UserObjectId", userId);
                    cmd.Parameters.AddWithValue("@ActivityId", activityId);

                    await cmd.ExecuteNonQueryAsync().ConfigureAwait(false);
                }
            }
        }
    }
}
