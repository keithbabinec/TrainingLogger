using System;

namespace TrainingLoggerSharedLibrary.Models
{
    public class LiftingActivity
    {
        public long ID { get; set; }

        public Guid UserObjectId { get; set; }

        public DateTime Date { get; set; }

        public LiftingActivityType Type { get; set; }

        public LiftingPurposeType Purpose { get; set; }

        public LiftingFocusArea FocusArea { get; set; }

        public string Duration { get; set; }

        public HrZoneType AverageIntensity { get; set; }

        public string Notes { get; set; }
    }
}
