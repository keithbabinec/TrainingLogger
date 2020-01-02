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
	CONSTRAINT FK_Activities_UserID FOREIGN KEY ([UserID]) REFERENCES [dbo].[Users] ([ID])
)
