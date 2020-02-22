using System.Collections.Generic;

namespace TrainingLoggerSharedLibrary.Models
{
    public class Activities
    {
        public List<DistanceActivity> DistanceActivities { get; set; }

        public List<LiftingActivity> LiftingActivities { get; set; }
    }
}
