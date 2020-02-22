using System;

namespace TrainingLoggerSharedLibrary.Models
{
    public class DistanceActivity
    {
        public long ID { get; set; }

        public Guid UserObjectId { get; set; }

        public DateTime Date { get; set; }

        public DistanceActivityType Type { get; set; }

        public DistancePurposeType Purpose { get; set; }

        public SurfaceType Surface { get; set; }

        public string Duration { get; set; }

        public int DistanceInMeters { get; set; }

        public HrZoneType AverageIntensity { get; set; }

        public int ElevationGain { get; set; }

        public int ElevationLoss { get; set; }

        public string Notes { get; set; }
    }
}
