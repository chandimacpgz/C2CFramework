﻿CREATE TABLE [dbo].[Users]
(
	[Id] INT NOT NULL IDENTITY(1, 1),
	[Name] NVARCHAR(2048) NOT NULL,
	[AccountNumber] INT NOT NULL,
	[Balance] FLOAT NULL,
	[Email] NVARCHAR(2048) NOT NULL,
	[CreatedDate] DATETIME NULL,
	[UpdatedDate] DATETIME NULL,
	[IsDeleted] BIT NOT NULL DEFAULT(0),
)
