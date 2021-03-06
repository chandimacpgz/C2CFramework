﻿CREATE TABLE [dbo].[Banks]
(
	[Id] INT NOT NULL IDENTITY(100000, 1),
	[Name] NVARCHAR(2048) NOT NULL,
	[Email] NVARCHAR(2048) NOT NULL,
	[CreatedDate] DATETIME NULL,
	[UpdatedDate] DATETIME NULL,
	[IsDeleted] BIT NOT NULL DEFAULT(0),
	CONSTRAINT PK_Banks_ID PRIMARY KEY ([Id])
)
