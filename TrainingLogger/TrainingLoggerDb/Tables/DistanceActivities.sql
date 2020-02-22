CREATE TABLE [dbo].[DistanceActivities]
(
	[ID] BIGINT NOT NULL IDENTITY(1,1),
	[UserObjectId] UNIQUEIDENTIFIER NOT NULL,
	[Date] DATE NOT NULL,
	[Type] INT NOT NULL,
	[Purpose] INT NOT NULL,
	[Surface] INT NOT NULL,
	[Duration] BIGINT NOT NULL,
	[DistanceInMeters] INT NOT NULL,
	[AverageIntensity] INT NOT NULL,
	[ElevationGain] INT NOT NULL,
	[ElevationLoss] INT NOT NULL,
	[Notes] NVARCHAR(MAX),

	CONSTRAINT PK_DistanceActivities_ID PRIMARY KEY ( [ID] ),
	CONSTRAINT CHK_DistanceActivities_Type CHECK ( [Type] >= 0 AND [Type] <= 3),
	CONSTRAINT CHK_DistanceActivities_Purpose CHECK ( [Purpose] >= 0 AND [Purpose] <= 3),
	CONSTRAINT CHK_DistanceActivities_Surface CHECK ( [Surface] >= 0 AND [Surface] <= 5),
	CONSTRAINT CHK_DistanceActivities_AverageIntensity CHECK ( [AverageIntensity] >= 0 AND [AverageIntensity] <= 5)
)
