﻿CREATE TABLE [dbo].[Users]
(
	[ID] INT NOT NULL IDENTITY (1,1),
	[Username] NVARCHAR(256) NOT NULL,
	[HashedPassword] NVARCHAR(2048) NOT NULL,

	CONSTRAINT PK_Users_ID PRIMARY KEY ([ID])
)
