﻿using System;
using System.Threading.Tasks;
using TrainingLoggerSharedLibrary.Models;

namespace TrainingLoggerSharedLibrary.Database
{
    public interface IDatabase
    {
        Task AddDistanceActivityAsync(DistanceActivity activity);

        Task AddLiftingActivityAsync(LiftingActivity activity);

        Task<Activities> GetActivitiesByUserAsync(Guid userObjectId);

        Task RemoveLiftingActivityAsync(long activityId, Guid userId);
        
        Task RemoveDistanceActivityAsync(long activityId, Guid userId);
    }
}
