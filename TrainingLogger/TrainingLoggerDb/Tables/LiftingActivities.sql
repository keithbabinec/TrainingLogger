CREATE TABLE [dbo].[LiftingActivities]
(
	[ID] BIGINT NOT NULL IDENTITY(1,1),
	[UserObjectId] UNIQUEIDENTIFIER NOT NULL,
	[Date] DATE NOT NULL,
	[Type] INT NOT NULL,
	[Purpose] INT NOT NULL,
	[FocusArea] INT NOT NULL,
	[Duration] BIGINT NOT NULL,
	[AverageIntensity] INT NOT NULL,
	[Notes] NVARCHAR(MAX),

	CONSTRAINT PK_LiftingActivities_ID PRIMARY KEY ( [ID] ),
	CONSTRAINT CHK_LiftingActivities_Type CHECK ( [Type] >= 0 AND [Type] <= 3),
	CONSTRAINT CHK_LiftingActivities_Purpose CHECK ( [Purpose] >= 0 AND [Purpose] <= 3),
	CONSTRAINT CHK_LiftingActivities_FocusArea CHECK ( [FocusArea] >= 0 AND [FocusArea] <= 9),
	CONSTRAINT CHK_LiftingActivities_AverageIntensity CHECK ( [AverageIntensity] >= 0 AND [AverageIntensity] <= 5)
)
