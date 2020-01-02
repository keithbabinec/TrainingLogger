CREATE TABLE [dbo].[Activities]
(
	[ID] INT NOT NULL IDENTITY(1,1),
	[UserID] INT NOT NULL,
	[Type] INT NOT NULL,
	[Purpose] INT NOT NULL,
	[Surface] INT NOT NULL,
	[Time] BIGINT NOT NULL,
	[DistanceInMeters] INT NOT NULL,
	[AverageIntensity] INT NOT NULL,
	[ElevationGain] INT NOT NULL,
	[ElevationLoss] INT NOT NULL,
	[Notes] NVARCHAR(MAX),

	CONSTRAINT PK_Activities_ID PRIMARY KEY ([ID]),
	CONSTRAINT CHK_Activities_Type CHECK ( [Type] >= 0 AND [Type] <= 3),
	CONSTRAINT CHK_Activities_Purpose CHECK ( [Purpose] >= 0 AND [Purpose] <= 3),
	CONSTRAINT CHK_Activities_Surface CHECK ( [Surface] >= 0 AND [Surface] <= 5),
	CONSTRAINT CHK_Activities_AverageIntensity CHECK ( [AverageIntensity] >= 0 AND [AverageIntensity] <= 5)
)
